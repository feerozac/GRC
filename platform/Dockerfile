# From https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

FROM node:22.11.0-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json pnpm-lock.yaml* ./
# Update corepack before using it
RUN npm install -g corepack@latest && \
    corepack enable pnpm && \
    pnpm i


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY package.json .
COPY pnpm-lock.yaml .
COPY next.config.mjs .
COPY tsconfig.json .
COPY postcss.config.js .
COPY tailwind.config.js .
COPY public public
COPY src src

# .env is used for local Docker builds; on Railway env vars are injected as build args.
# The glob ensures the COPY succeeds even when .env is absent (.env.example always matches).
COPY .env* ./

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm install -g corepack@latest && \
    corepack enable pnpm && \
    pnpm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
 ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

RUN mkdir temp
RUN chown nextjs:nodejs temp

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
ENV HOSTNAME="0.0.0.0"
CMD ["node", "server.js"]
