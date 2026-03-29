# Evonix GRC — Deployment Playbook

> Captures every deployment gotcha, environment requirement, and operational procedure discovered during Railway + Netlify deployment. Use this as the single source of truth for deploying, debugging, and extending the platform.

---

## Architecture Overview

```
┌─────────────────────┐       ┌──────────────────────┐
│   Netlify (CDN)     │       │   Railway (PaaS)     │
│                     │       │                      │
│  prototype.html     │──────▶│  Next.js + Payload   │
│  config.v2.js       │ CORS  │  (main app service)  │
│  netlify.toml       │       │                      │
└─────────────────────┘       │  PostgreSQL          │
                              │  Redis               │
                              │  MinIO (S3)          │
                              │  Zerox Parser (opt.) │
                              └──────────────────────┘
```

| Component | URL | Purpose |
|-----------|-----|---------|
| Netlify Frontend | `evonix-demo.netlify.app` | Static prototype UI |
| Railway App | `evonix-app-production.up.railway.app` | API + Payload CMS |
| Railway Zerox | (internal service) | PDF → text via vision LLM (optional) |

---

## 1. Environment Variables

### Railway — Main App Service

| Variable | Example | Notes |
|----------|---------|-------|
| `DATABASE_URL` | `postgresql://...` | Railway-managed PostgreSQL |
| `REDIS_URL` | `redis://...` | Railway-managed Redis |
| `MINIO_URL` | `http://minio:9000` | MinIO container endpoint |
| `MINIO_ACCESS_KEY` | `minioadmin` | |
| `MINIO_SECRET_KEY` | `minioadmin` | |
| `ZEROX_SERVICE_URL` | `http://zerox:3000` | Internal URL for Zerox container |
| `DEEPSEEK_API_KEY` | `sk-...` | Primary LLM for extraction |
| `QWEN_API_KEY` | `sk-...` | Used by Zerox for vision OCR |
| `CORS_ALLOWED_ORIGINS` | `https://evonix-demo.netlify.app` | Comma-separated origins |
| `LANGFUSE_SECRET_KEY` | `sk-lf-...` | LLM observability |
| `LANGFUSE_PUBLIC_KEY` | `pk-lf-...` | |
| `LANGFUSE_HOST` | `https://cloud.langfuse.com` | |
| `PAYLOAD_SECRET` | (random 32+ chars) | Payload CMS secret |

### Railway — Zerox Service

| Variable | Example | Notes |
|----------|---------|-------|
| `MODEL` | `openai/qwen-vl-plus` | Vision model for OCR. See "Zerox Vision Model" section below |
| `OPENAI_API_KEY` | `sk-...` | Key for the vision model provider |
| `OPENAI_API_BASE` | `https://dashscope.aliyuncs.com/compatible-mode/v1` | If using Qwen via OpenAI-compatible API |

### Netlify

| Variable | Where | Notes |
|----------|-------|-------|
| `EVONIX_API_BASE` | `config.v2.js` (build-time substitution) | Set to Railway URL or empty for proxy |

---

## 2. Known Gotchas & Fixes

### 2.1 CORS — Headers Must Be on EVERY Response, Not Just OPTIONS

**Symptom:** Browser console shows CORS error. `curl` to OPTIONS returns correct headers, but actual POST/GET fails.

**Root cause:** Next.js `headers()` in `next.config.mjs` only applies to pages/static routes. Custom API route handlers (files in `app/api/`) must explicitly add CORS headers to every `Response.json()` call.

**Fix pattern:**
```typescript
import { handlePreflight, corsHeaders } from '@/lib/cors'

export const OPTIONS = handlePreflight

export const POST = async (req: Request) => {
  const headers = corsHeaders(req)
  try {
    // ... logic ...
    return Response.json({ data }, { headers })
  } catch (error) {
    return Response.json({ error: message }, { status: 500, headers })
  }
}
```

**Every custom API route must follow this pattern.** The `corsHeaders()` helper reads `CORS_ALLOWED_ORIGINS` and returns the appropriate `Access-Control-Allow-*` headers.

---

### 2.2 Netlify Proxy — Body Size Limit (~6 MB)

**Symptom:** Large PDF uploads fail with "Failed to fetch" when routed through a Netlify proxy redirect.

**Root cause:** Netlify's proxy/redirect rules have a ~6 MB request body limit.

**Decision:** Abandoned Netlify proxy in favour of direct cross-origin calls from the browser to Railway. CORS is handled by Railway's API routes (see 2.1). The Netlify proxy rules remain in `netlify.toml` but are not used for the primary API flow.

---

### 2.3 Browser Caching of Config Files

**Symptom:** After updating `config.js`, the browser still uses the old `EVONIX_API_BASE` value.

**Root cause:** `netlify.toml` had `Cache-Control: public, max-age=31536000, immutable` for `*.js` files.

**Fixes applied:**
1. Renamed `config.js` → `config.v2.js` to bust existing caches
2. Reduced `Cache-Control` for JS files to `max-age=300` (5 minutes) in `netlify.toml`
3. Updated all `<script src>` references in `prototype.html`

**Prevention:** Never use immutable cache headers for configuration files that may change between deploys.

---

### 2.4 Zerox Vision Model — LiteLLM Validation

**Symptom:** Zerox returns `500: The provided model is not a vision model. (Extra Info: {'model': 'openai/qwen-vl-plus'})`

**Root cause:** LiteLLM's `supports_vision()` function doesn't recognize `openai/qwen-vl-plus` as a vision model, even though it is one. This check runs at model initialization before any parsing starts.

**Current workaround:** The main app's ingest tasks (`ingest-board-circular.ts`, `ingest-annual-report.ts`) catch Zerox failures and fall back to local PDF text extraction via `unpdf`. Zerox is optional — only needed for scanned/image PDFs.

**To properly fix Zerox:**
- Change the `MODEL` env var to a model LiteLLM recognizes (e.g., `gpt-4o-mini` with OpenAI key)
- Or modify `zerox-service/py_zerox/pyzerox/models/modellitellm.py` to skip/loosen the vision validation
- Or update LiteLLM in the Zerox service to a version that recognizes the Qwen vision models

---

### 2.5 PDF Parsing in Node.js — DOMMatrix & Browser APIs

**Symptom:** `DOMMatrix is not defined` when using PDF libraries on Railway.

**Root cause:** Both `pdf-parse` v2 and `unpdf` use Mozilla's `pdfjs-dist` internally, which references browser-only APIs like `DOMMatrix`. These don't exist in Node.js.

**Fix:** A minimal `DOMMatrix` polyfill is applied at runtime before importing `unpdf`:

```typescript
// platform/src/server/services/pdf-parser/local.ts
if (typeof globalThis.DOMMatrix === 'undefined') {
  (globalThis as any).DOMMatrix = class DOMMatrix {
    // Minimal stub — only identity-matrix operations occur during text extraction
    m11 = 1; m12 = 0; /* ... */ a = 1; b = 0; c = 0; d = 1; e = 0; f = 0
    inverse() { return new DOMMatrix() }
    multiply() { return new DOMMatrix() }
    // ... other no-op methods
  }
}
```

**Also required:** `unpdf` must be listed in `serverExternalPackages` in `next.config.mjs` to prevent Next.js from bundling it (which causes additional issues).

---

### 2.6 Payload Polymorphic Relationship — ID Extraction

**Symptom:** Queries using polymorphic relationship IDs return wrong or all documents.

**Root cause:** Payload's polymorphic relationships are stored as `{ relationTo: 'collection', value: <id> }`. When Payload populates these, `value` becomes a full object `{ id: 1, title: '...', ... }` instead of a raw number. Code that does `sourceDoc.value` gets an object, not an ID.

**Fix pattern:**
```typescript
const sourceDoc = run.sourceDocument
let docId: number | string | undefined
if (sourceDoc && typeof sourceDoc === 'object') {
  const val = sourceDoc.value
  docId = val && typeof val === 'object' ? val.id : val
} else {
  docId = sourceDoc
}
```

---

### 2.7 Payload Polymorphic Fields — Numeric IDs Required

**Symptom:** `POST /api/policy-agent/run` returns "The following field is invalid: Source Document"

**Root cause:** Frontend sends `docId` as a string (e.g., `"1"`). Payload's polymorphic relationship fields require numeric IDs.

**Fix:** Coerce in the frontend before sending:
```javascript
body: JSON.stringify({
  docId: isNaN(Number(grcDocId)) ? grcDocId : Number(grcDocId),
  collectionSlug: grcCollectionSlug
})
```

---

### 2.8 Next.js serverExternalPackages

**Symptom:** Server crashes on Railway with import errors or missing browser APIs from a newly added npm package.

**Root cause:** Next.js bundles server-side code by default. Packages with native deps, WASM, or browser API polyfills often break when bundled.

**Fix:** Add the package to `serverExternalPackages` in `next.config.mjs`:
```javascript
const nextConfig = {
  output: 'standalone',
  serverExternalPackages: ['unpdf'],
  // ...
}
```

---

### 2.9 parsedText Field Size — No maxLength for Large Documents

**Symptom:** `Extraction Workflow Failed: The following field is invalid: Parsed Text`

**Root cause:** The `parsedText` field in `AnnualReports` and `BoardCirculars` collections had `maxLength: 1000000` (1M chars). Large documents (e.g., HSBC annual report: 372 pages, 1.87M chars) exceed this limit.

**Fix:** Removed `maxLength` from the `parsedText` textarea field. PostgreSQL `text` columns have no practical size limit (up to 1 GB). The downstream `truncateDocumentText()` function handles trimming for LLM context windows.

---

## 3. Deployment Procedures

### 3.1 Deploy Backend (Railway)

Railway auto-deploys from the `main` branch on GitHub. After `git push`:

1. Railway detects the push and starts a build (~2–4 min)
2. Docker image is built using `platform/Dockerfile`
3. New container replaces the old one (zero-downtime if healthy)
4. Verify: `curl https://evonix-app-production.up.railway.app/api/grc-results?runId=test` should return `404` JSON (not HTML 500)

**If the deploy breaks the server:**
- All API routes return HTML `500: Internal Server Error`
- Check the build ID in the `__NEXT_DATA__` JSON — if unchanged, Railway is still deploying
- Common causes: new dependency with native/browser deps (see 2.5, 2.8)
- Railway will keep serving the broken build until a fix is pushed

### 3.2 Deploy Frontend (Netlify)

```bash
cd netlify-demo
netlify deploy --prod
```

- Build command (from `netlify.toml`): substitutes `__EVONIX_API_BASE__` in `config.v2.js`
- Verify: open `https://evonix-demo.netlify.app/prototype` in incognito

### 3.3 Deploy Zerox Service (Railway)

The Zerox service is a separate Docker container (`platform/zerox-service/Dockerfile`). It may require a manual redeploy trigger on Railway if code changes are only in the `zerox-service/` subdirectory.

**Current status:** Zerox is non-critical — the main app falls back to `unpdf` for text extraction when Zerox is unavailable.

---

## 4. Database Operations

### Run Migrations

```bash
cd platform
pnpm payload migrate
```

Migrations are auto-run on Payload startup if `PAYLOAD_MIGRATE_ON_INIT=true`.

### Seed Demo Data

The seed script at `platform/src/server/db/seeds/onInit.ts` runs on first boot when the database is empty. It creates:
- Framework reference data (COBIT, COSO, NIST, ISO27001, HKMA, PCI-DSS)
- A sample board circular with pre-populated `parsedText`

---

## 5. Troubleshooting Checklist

| Symptom | Check |
|---------|-------|
| "Failed to fetch" on upload | Is Railway up? Check `curl` to any API endpoint |
| Upload works but pipeline fails | Check audit trail error. Zerox model? DOMMatrix? |
| Same results for different documents | Check `grc-results` docId extraction. Check LLM cache (Redis) |
| "API unavailable" on pipeline trigger | CORS headers missing from POST response body (see 2.1) |
| HTML 500 from all routes | New dependency crashed the server (see 2.5, 2.8) |
| Stale frontend after deploy | Clear browser cache or use incognito. Check `config.v2.js` version |
| Pipeline shows "Completed" but "Failed" | Frontend status polling sees `completed` from run record before error propagates. Known UI quirk. |

---

## 6. LLM Cache Considerations

The Redis LLM cache is keyed on `taskName + hash(userPrompt) + hash(systemPrompt)`. This means:

- **Same document text → same cached result** (expected)
- **Different documents with same text → same cached result** (by design)
- **To force re-extraction:** flush the Redis cache or modify the prompt

The Zerox parse cache is keyed on SHA-256 of the file bytes. Different files always get different parses.

---

*Last updated: 2026-03-29*
