import OpenAI, { APIConnectionTimeoutError } from 'openai'
import { z, ZodType } from 'zod'
import { zodResponseFormat } from 'openai/helpers/zod'
import { langfuse } from '@/server/llm/observability/langfuse'
import { RedisCache } from '@/server/services/cache/redis'
import { generateHash } from '@/server/lib/utils'

const ParamsSchema = z.object({
  name: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  userPrompt: z.string(),
  schema: z.instanceof(ZodType).optional(),
  temperature: z.number().default(0.8).optional(),
  systemPrompt: z.string(),
  generationId: z.string(),
  modelName: z.string().optional(),
})

export const MessagesSchema = z.array(
  z.discriminatedUnion('role', [
    z.object({
      role: z.literal('system'),
      content: z.string(),
    }),
    z.object({
      role: z.literal('user'),
      content: z.string(),
    }),
    z.object({
      role: z.literal('assistant'),
      content: z.string().optional(),
      function_call: z
        .object({
          name: z.string(),
          arguments: z.string(),
        })
        .optional(),
    }),
  ])
)

export type Messages = z.infer<typeof MessagesSchema>

type LlmProvider = 'deepseek' | 'qwen' | 'openai'

function resolveProvider(modelName: string): { provider: LlmProvider; client: OpenAI } {
  if (modelName.startsWith('deepseek')) {
    return {
      provider: 'deepseek',
      client: new OpenAI({
        apiKey: process.env.DEEPSEEK_API_KEY,
        baseURL: process.env.DEEPSEEK_BASE_URL || 'https://api.deepseek.com',
        timeout: 180_000,
      }),
    }
  }
  if (modelName.startsWith('qwen')) {
    return {
      provider: 'qwen',
      client: new OpenAI({
        apiKey: process.env.QWEN_API_KEY,
        baseURL: process.env.QWEN_BASE_URL || 'https://dashscope-intl.aliyuncs.com/compatible-mode/v1',
        timeout: 180_000,
      }),
    }
  }
  return {
    provider: 'openai',
    client: new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
      timeout: 180_000,
    }),
  }
}

function isReasoningModel(modelName: string): boolean {
  return (
    modelName.includes('deepseek-reasoner') ||
    modelName.includes('o3-mini') ||
    modelName.includes('o4-mini')
  )
}

function buildJsonSchemaInstructions(schema: ZodType, name: string): string {
  const formatted = zodResponseFormat(schema, name)
  const jsonSchema = formatted.json_schema.schema
  return `\n\nRespond ONLY with valid JSON matching this schema:\n${JSON.stringify(jsonSchema, null, 2)}`
}

function extractJsonFromText(text: string): string {
  const fenced = text.match(/```(?:json)?\s*\n?([\s\S]*?)```/)
  if (fenced) return fenced[1].trim()
  const braceMatch = text.match(/\{[\s\S]*\}/)
  if (braceMatch) return braceMatch[0]
  return text.trim()
}

export async function sendGeneralLlmRequest(params: z.infer<typeof ParamsSchema>): Promise<any> {
  const { name, userPrompt, schema, temperature, systemPrompt, generationId } = ParamsSchema.parse(params)
  let { modelName } = ParamsSchema.parse(params)

  const cache = new RedisCache()

  const cacheKey = `${name}:${generateHash(userPrompt)}:${generateHash(systemPrompt)}`
  if (process.env.NODE_ENV === 'development') {
    console.log('cacheKey', cacheKey)
  }

  const cached = await cache.get(cache.mappings.generalLlm(cacheKey))
  if (cached) {
    return cached
  }

  const trace = langfuse.trace({ id: generationId })

  modelName = modelName ?? process.env.DEFAULT_MODEL ?? 'deepseek-chat'

  const { provider, client } = resolveProvider(modelName)
  const reasoning = isReasoningModel(modelName)

  let effectiveSystemPrompt = systemPrompt
  if (schema && provider !== 'openai') {
    effectiveSystemPrompt += buildJsonSchemaInstructions(schema, name)
  }

  const messages = [
    { role: 'system', content: effectiveSystemPrompt },
    { role: 'user', content: userPrompt },
  ] as Messages

  const generation = trace.generation({
    name,
    input: { messages },
    model: modelName,
    metadata: { provider },
  })

  let retries = 0
  const maxRetries = 3
  let delay = 1000

  while (true) {
    try {
      let content: any
      let usage: OpenAI.CompletionUsage | undefined

      if (provider === 'openai' && schema) {
        const responseSchema = zodResponseFormat(schema, name)
        const response = await client.beta.chat.completions.parse({
          model: modelName,
          messages,
          response_format: responseSchema,
          ...(reasoning
            ? { max_completion_tokens: 50000 }
            : { max_tokens: 16000, temperature }),
        })
        content = response.choices[0].message.parsed as unknown as object
        usage = response.usage ?? undefined
      } else {
        const response = await client.chat.completions.create({
          model: modelName,
          messages,
          ...(schema && !reasoning ? { response_format: { type: 'json_object' as const } } : {}),
          ...(reasoning
            ? { max_completion_tokens: 50000 }
            : { max_tokens: 16000, temperature }),
        })

        const rawContent = response.choices[0].message.content ?? ''
        usage = response.usage ?? undefined

        if (schema) {
          const jsonStr = extractJsonFromText(rawContent)
          content = schema.parse(JSON.parse(jsonStr))
        } else {
          content = rawContent
        }
      }

      generation.end({
        output: content,
        usage: usage
          ? {
              input: usage.prompt_tokens,
              output: usage.completion_tokens,
              total: usage.total_tokens,
              unit: 'TOKENS' as const,
            }
          : undefined,
      })

      await cache.set(cache.mappings.generalLlm(cacheKey), content, 60 * 60 * 24 * 7)

      return content
    } catch (error) {
      const isTimeoutError = error instanceof APIConnectionTimeoutError

      if (isTimeoutError && retries < maxRetries) {
        console.warn(`Timeout error encountered. Retrying in ${delay / 1000} seconds... (Attempt ${retries + 1}/${maxRetries})`, { name, generationId })
        await new Promise(resolve => setTimeout(resolve, delay))
        retries++
        delay *= 2
      } else {
        generation.end({
          output: { error: error instanceof Error ? error.message : String(error) },
        })
        console.error(`Request failed for ${name} after ${retries} retries or due to a non-timeout error:`, error)
        throw error
      }
    }
  }
}
