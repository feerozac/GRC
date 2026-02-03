# Evonix — Technical Architecture

**Version:** 1.0  
**Date:** 2026-01-29  
**Author:** Winston (Architect)  
**Status:** Draft for Review

---

## 1. Architecture Principles

Before diving into components, here's what guides every decision:

| Principle | Rationale |
|-----------|-----------|
| **Boring technology for core** | PostgreSQL, Redis, S3 — proven at scale, well-understood failure modes |
| **Agent-first, not AI-bolted-on** | Agent orchestration is the core, not an add-on feature |
| **Explainability is data** | Every AI decision produces structured audit data, not just logs |
| **Human-in-the-loop is a first-class citizen** | Approval workflows are core infrastructure, not afterthought |
| **Multi-tenant from day one** | Isolation, data residency, and tenant-specific config baked in |
| **API-first** | Every capability exposed via API before UI — enables integrations |

---

## 2. High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────────────────────────┐
│                                    EVONIX PLATFORM                                  │
├─────────────────────────────────────────────────────────────────────────────────────┤
│                                                                                     │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │                           PRESENTATION LAYER                                 │   │
│  ├─────────────────────────────────────────────────────────────────────────────┤   │
│  │  Web App (React/Next.js)  │  Mobile (React Native)  │  API Consumers        │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
│                                        │                                            │
│                                        ▼                                            │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │                              API GATEWAY                                     │   │
│  ├─────────────────────────────────────────────────────────────────────────────┤   │
│  │  Authentication (OAuth2/OIDC)  │  Rate Limiting  │  Request Routing         │   │
│  │  Tenant Resolution  │  API Versioning  │  Request/Response Logging          │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
│                                        │                                            │
│         ┌──────────────────────────────┼──────────────────────────────┐            │
│         ▼                              ▼                              ▼            │
│  ┌─────────────────┐   ┌───────────────────────────┐   ┌─────────────────────┐    │
│  │   CORE DOMAIN   │   │      AGENT PLATFORM       │   │   INTEGRATION HUB   │    │
│  │    SERVICES     │   │                           │   │                     │    │
│  ├─────────────────┤   ├───────────────────────────┤   ├─────────────────────┤    │
│  │ • Risk Service  │   │ • Agent Orchestrator      │   │ • Regulatory Feeds  │    │
│  │ • Control Svc   │   │ • Policy Research Agent   │   │ • Document Ingestion│    │
│  │ • Issue Service │   │ • Gap Analysis Agent      │   │ • SSO/SCIM          │    │
│  │ • Evidence Svc  │   │ • Narrative Agent         │   │ • SIEM Export       │    │
│  │ • Policy Service│   │ • 1L/2L/3L Persona Agents │   │ • GRC Tool Import   │    │
│  │ • KCI/KRI/KPI   │   │ • Confidence Scoring      │   │                     │    │
│  │ • Framework Svc │   │ • Explainability Engine   │   │                     │    │
│  └────────┬────────┘   └─────────────┬─────────────┘   └──────────┬──────────┘    │
│           │                          │                            │               │
│           └──────────────────────────┼────────────────────────────┘               │
│                                      ▼                                            │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │                           WORKFLOW ENGINE                                    │   │
│  ├─────────────────────────────────────────────────────────────────────────────┤   │
│  │  HITL Approval Workflows  │  Routing Rules  │  Escalation  │  SLA Tracking  │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
│                                      │                                            │
│                                      ▼                                            │
│  ┌─────────────────────────────────────────────────────────────────────────────┐   │
│  │                            DATA LAYER                                        │   │
│  ├─────────────────────────────────────────────────────────────────────────────┤   │
│  │                                                                              │   │
│  │  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │   │
│  │  │  PostgreSQL  │  │    Redis     │  │  S3 / Blob   │  │ Vector Store │     │   │
│  │  │  (Primary)   │  │   (Cache)    │  │  (Documents) │  │  (Embeddings)│     │   │
│  │  └──────────────┘  └──────────────┘  └──────────────┘  └──────────────┘     │   │
│  │                                                                              │   │
│  │  ┌──────────────────────────────────────────────────────────────────────┐   │   │
│  │  │                    IMMUTABLE AUDIT LEDGER                            │   │   │
│  │  │  (Append-only, cryptographic chaining, optional blockchain anchor)   │   │   │
│  │  └──────────────────────────────────────────────────────────────────────┘   │   │
│  │                                                                              │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                     │
└─────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Component Breakdown

### 3.1 Presentation Layer

| Component | Technology | Rationale |
|-----------|------------|-----------|
| **Web Application** | Next.js 14 (React) | SSR for SEO, App Router, excellent DX |
| **State Management** | TanStack Query + Zustand | Server state + client state separation |
| **UI Components** | shadcn/ui + Tailwind | Accessible, customizable, dark theme ready |
| **Real-time Updates** | WebSocket (Socket.io) | Agent status, approval notifications |

### 3.2 API Gateway

| Capability | Implementation | Notes |
|------------|----------------|-------|
| **Authentication** | Auth0 / Clerk / Keycloak | OAuth2 + OIDC, enterprise SSO support |
| **Authorization** | RBAC with 3LOD scoping | 1L/2L/3L permissions enforced at gateway |
| **Rate Limiting** | Token bucket per tenant | Prevent runaway API costs |
| **Tenant Resolution** | Subdomain or header-based | `acme.evonix.app` or `X-Tenant-ID` |
| **API Versioning** | URL path (`/v1/`, `/v2/`) | Breaking changes isolated |

### 3.3 Core Domain Services

Each service is a bounded context with its own data ownership:

| Service | Responsibility | Key Entities |
|---------|----------------|--------------|
| **Risk Service** | Risk register, scoring, ownership | Risk, RiskAssessment, RiskOwner |
| **Control Service** | Control library, framework mappings | Control, ControlMapping, Framework |
| **Issue Service** | Findings, remediation, tracking | Issue, Action, Remediation |
| **Evidence Service** | Document storage, tagging, retrieval | Evidence, EvidenceTag, EvidenceLink |
| **Policy Service** | Policy lifecycle, versions, approvals | Policy, PolicyVersion, PolicyApproval |
| **KCI/KRI/KPI Service** | Indicators, thresholds, dashboards | Indicator, IndicatorValue, Alert |
| **Framework Service** | Framework library, version tracking | Framework, FrameworkVersion, ControlRequirement |

**Inter-service communication:** Async events (Kafka/SQS) for loose coupling, sync REST for queries.

### 3.4 Agent Platform

This is the differentiating core of Evonix.

```
┌─────────────────────────────────────────────────────────────────────────┐
│                         AGENT PLATFORM                                  │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                         │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    AGENT ORCHESTRATOR                            │   │
│  │  • Task queue management                                         │   │
│  │  • Agent selection and routing                                   │   │
│  │  • Confidence threshold enforcement                              │   │
│  │  • HITL checkpoint triggering                                    │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                              │                                          │
│         ┌────────────────────┼────────────────────┐                    │
│         ▼                    ▼                    ▼                    │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐              │
│  │ 1L Ops Agent│     │ 2L Risk     │     │ 3L Audit    │              │
│  │             │     │ Agent       │     │ Agent       │              │
│  │ • Evidence  │     │ • Gap       │     │ • Control   │              │
│  │   collection│     │   analysis  │     │   testing   │              │
│  │ • Control   │     │ • Challenge │     │ • Assurance │              │
│  │   execution │     │   workflow  │     │   opinion   │              │
│  └─────────────┘     └─────────────┘     └─────────────┘              │
│         │                    │                    │                    │
│         └────────────────────┼────────────────────┘                    │
│                              ▼                                          │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                    SPECIALIZED AGENTS                            │   │
│  ├─────────────────────────────────────────────────────────────────┤   │
│  │  Policy Research Agent  │  Narrative Agent  │  Regulatory Agent  │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                              │                                          │
│                              ▼                                          │
│  ┌─────────────────────────────────────────────────────────────────┐   │
│  │                   EXPLAINABILITY ENGINE                          │   │
│  │  • Source tracking (document → page → paragraph)                 │   │
│  │  • Confidence scoring (0-100% with calibration)                  │   │
│  │  • Reasoning chain capture                                       │   │
│  │  • Audit trail generation                                        │   │
│  └─────────────────────────────────────────────────────────────────┘   │
│                                                                         │
└─────────────────────────────────────────────────────────────────────────┘
```

**Agent Technology Stack:**

| Component | Technology | Rationale |
|-----------|------------|-----------|
| **LLM Provider** | AWS Bedrock (Claude) / Azure OpenAI | Enterprise SLAs, data residency options |
| **Agent Framework** | LangChain / LlamaIndex | Tool calling, RAG, chain composition |
| **Vector Store** | Pinecone / pgvector | Framework embeddings, document search |
| **Task Queue** | Celery + Redis / AWS SQS | Async agent execution, retry logic |

### 3.5 Workflow Engine

Handles all human-in-the-loop (HITL) processes:

| Capability | Implementation |
|------------|----------------|
| **Workflow Definition** | YAML-based workflow DSL |
| **State Machine** | XState / Temporal.io |
| **Approval Routing** | Rules engine (confidence → role mapping) |
| **Escalation** | Time-based + threshold-based |
| **SLA Tracking** | Configurable per workflow type |
| **Notifications** | Email, Slack, in-app |

**Example: Policy Approval Workflow**

```yaml
workflow: policy-approval
states:
  - draft
  - pending_review
  - approved
  - rejected
  - published

transitions:
  - from: draft
    to: pending_review
    trigger: submit_for_review
    condition: confidence >= 0.60
    
  - from: pending_review
    to: approved
    trigger: approve
    required_role: 
      - 1L_POLICY_OWNER (if confidence >= 0.80)
      - 2L_RISK_MANAGER (if confidence < 0.80)
    
  - from: approved
    to: published
    trigger: publish
    action: update_policy_portal

escalation:
  - state: pending_review
    timeout: 72h
    action: notify_manager
  - state: pending_review
    timeout: 120h
    action: escalate_to_2L_head
```

### 3.6 Data Layer

#### Primary Database (PostgreSQL)

**Schema Design Principles:**
- Multi-tenant with `tenant_id` on every table
- Soft deletes with `deleted_at` timestamp
- Audit columns: `created_at`, `updated_at`, `created_by`, `updated_by`
- JSONB for flexible metadata

**Key Tables:**

```sql
-- Core GRC Entities
CREATE TABLE risks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id),
    title TEXT NOT NULL,
    description TEXT,
    likelihood INTEGER CHECK (likelihood BETWEEN 1 AND 5),
    impact INTEGER CHECK (impact BETWEEN 1 AND 5),
    risk_score DECIMAL GENERATED ALWAYS AS (likelihood * impact) STORED,
    owner_id UUID REFERENCES users(id),
    status TEXT DEFAULT 'open',
    metadata JSONB DEFAULT '{}',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    deleted_at TIMESTAMPTZ
);

-- Framework Knowledge Base
CREATE TABLE frameworks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    code TEXT UNIQUE NOT NULL, -- e.g., 'NIST-800-53-R5'
    name TEXT NOT NULL,
    version TEXT NOT NULL,
    effective_date DATE,
    metadata JSONB DEFAULT '{}',
    embedding VECTOR(1536) -- for semantic search
);

CREATE TABLE framework_requirements (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    framework_id UUID NOT NULL REFERENCES frameworks(id),
    requirement_id TEXT NOT NULL, -- e.g., 'AC-2'
    title TEXT NOT NULL,
    description TEXT,
    control_domain TEXT,
    embedding VECTOR(1536)
);

-- Cross-framework mapping
CREATE TABLE requirement_mappings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    source_requirement_id UUID REFERENCES framework_requirements(id),
    target_requirement_id UUID REFERENCES framework_requirements(id),
    mapping_type TEXT, -- 'equivalent', 'partial', 'related'
    confidence DECIMAL CHECK (confidence BETWEEN 0 AND 1),
    UNIQUE (source_requirement_id, target_requirement_id)
);

-- Policy Lifecycle
CREATE TABLE policies (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES tenants(id),
    title TEXT NOT NULL,
    current_version_id UUID,
    status TEXT DEFAULT 'draft',
    next_review_date DATE,
    owner_id UUID REFERENCES users(id)
);

CREATE TABLE policy_versions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    policy_id UUID NOT NULL REFERENCES policies(id),
    version_number INTEGER NOT NULL,
    content TEXT NOT NULL, -- Markdown
    content_hash TEXT NOT NULL, -- SHA-256
    change_summary TEXT,
    ai_generated BOOLEAN DEFAULT FALSE,
    ai_confidence DECIMAL,
    created_by UUID REFERENCES users(id),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE (policy_id, version_number)
);

-- Immutable Audit Ledger
CREATE TABLE audit_events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    event_type TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID NOT NULL,
    actor_id UUID, -- NULL for AI actions
    actor_type TEXT, -- 'user', 'agent', 'system'
    agent_id TEXT, -- e.g., 'policy-research-agent-v2.1'
    model_version TEXT,
    action TEXT NOT NULL,
    details JSONB NOT NULL,
    confidence_score DECIMAL,
    sources_cited JSONB,
    reasoning_chain JSONB,
    input_hash TEXT,
    output_hash TEXT,
    previous_event_hash TEXT, -- cryptographic chaining
    event_hash TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Index for audit trail queries
CREATE INDEX idx_audit_events_entity ON audit_events(tenant_id, entity_type, entity_id);
CREATE INDEX idx_audit_events_actor ON audit_events(tenant_id, actor_id);
CREATE INDEX idx_audit_events_time ON audit_events(tenant_id, created_at DESC);
```

#### Caching (Redis)

| Use Case | TTL | Key Pattern |
|----------|-----|-------------|
| Session data | 24h | `session:{session_id}` |
| Framework requirements | 7d | `framework:{code}:requirements` |
| User permissions | 15m | `user:{id}:permissions` |
| Rate limiting | 1m | `ratelimit:{tenant}:{endpoint}` |
| Agent task status | 1h | `agent:task:{task_id}` |

#### Document Storage (S3 / Azure Blob)

| Bucket | Contents | Retention |
|--------|----------|-----------|
| `evonix-documents` | Uploaded evidence, policies, reports | 7 years |
| `evonix-regulatory` | Regulatory feed snapshots | 10 years |
| `evonix-exports` | Generated reports, audit exports | 90 days |

#### Vector Store (Pinecone / pgvector)

| Index | Contents | Dimensions |
|-------|----------|------------|
| `frameworks` | Framework requirement embeddings | 1536 |
| `policies` | Policy document embeddings | 1536 |
| `evidence` | Evidence document embeddings | 1536 |

---

## 4. Integration Architecture

### 4.1 Regulatory Feeds

```
┌─────────────────────────────────────────────────────────────────┐
│                    REGULATORY FEED PIPELINE                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐     ┌─────────────┐     ┌─────────────┐       │
│  │  HKMA Feed  │     │  MAS Feed   │     │  NIST Feed  │       │
│  │  (scraper)  │     │  (API)      │     │  (RSS/API)  │       │
│  └──────┬──────┘     └──────┬──────┘     └──────┬──────┘       │
│         │                   │                   │               │
│         └───────────────────┼───────────────────┘               │
│                             ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              INGESTION SERVICE                           │   │
│  │  • Document parsing (PDF, HTML, Word)                    │   │
│  │  • Change detection (diff against previous)              │   │
│  │  • Metadata extraction (date, type, jurisdiction)        │   │
│  │  • Embedding generation                                  │   │
│  └─────────────────────────────────────────────────────────┘   │
│                             │                                   │
│                             ▼                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              REGULATORY ALERT SERVICE                    │   │
│  │  • Relevance scoring per tenant                          │   │
│  │  • Gap analysis triggering                               │   │
│  │  • Notification dispatch                                 │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 4.2 Enterprise Integrations

| Integration | Protocol | Use Case |
|-------------|----------|----------|
| **SSO** | SAML 2.0 / OIDC | Enterprise identity providers |
| **SCIM** | REST | User provisioning/deprovisioning |
| **SIEM** | Syslog / REST | Security event export |
| **ServiceNow** | REST API | Incident/change ticket sync |
| **Jira** | REST API | Issue tracking sync |
| **SharePoint** | Graph API | Evidence import |
| **Slack/Teams** | Webhooks | Notifications |

---

## 5. Security Architecture

### 5.1 Defense in Depth

| Layer | Controls |
|-------|----------|
| **Network** | VPC isolation, WAF, DDoS protection |
| **Transport** | TLS 1.3 everywhere, certificate pinning for mobile |
| **Application** | Input validation, output encoding, CSRF protection |
| **Authentication** | MFA required, session timeout, suspicious login detection |
| **Authorization** | RBAC with 3LOD scoping, least privilege |
| **Data** | AES-256 at rest, field-level encryption for PII |
| **Audit** | Immutable logs, cryptographic chaining |

### 5.2 Data Residency

Multi-region deployment for regulatory compliance:

| Region | Primary Use | Data Residency |
|--------|-------------|----------------|
| AWS ap-east-1 (Hong Kong) | HKMA-regulated customers | Hong Kong |
| AWS ap-southeast-1 (Singapore) | MAS-regulated customers | Singapore |
| AWS eu-west-1 (Ireland) | EU customers | EU (GDPR) |
| AWS us-east-1 (Virginia) | US customers | United States |

---

## 6. Scalability & Performance

### 6.1 Scaling Strategy

| Component | Scaling Approach | Target |
|-----------|------------------|--------|
| **Web/API** | Horizontal (auto-scale) | p99 < 200ms |
| **Agents** | Queue-based (workers) | 1000 concurrent tasks |
| **Database** | Read replicas + connection pooling | 10K concurrent connections |
| **Vector Search** | Managed service (Pinecone) | < 100ms query |

### 6.2 Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| API p95 latency | < 200ms | Dashboard list/query |
| API p99 latency | < 500ms | Dashboard list/query |
| Agent task completion | < 60s | Narrative generation |
| Gap analysis | < 5 min | 200 requirements |
| Policy draft | < 2 min | Single policy revision |
| Regulatory alert | < 4 hours | Feed → notification |

---

## 7. Deployment Architecture

### 7.1 Infrastructure

```
┌─────────────────────────────────────────────────────────────────┐
│                     KUBERNETES CLUSTER                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  Ingress    │  │  Cert       │  │  External   │             │
│  │  Controller │  │  Manager    │  │  DNS        │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    APPLICATION PODS                      │   │
│  │  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐          │   │
│  │  │ API  │ │ Web  │ │Agent │ │Worker│ │Cron  │          │   │
│  │  │ (x3) │ │ (x2) │ │ (x5) │ │ (x3) │ │ (x1) │          │   │
│  │  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘          │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │                    MANAGED SERVICES                      │   │
│  │  ┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐   │   │
│  │  │ RDS      │ │ ElastiCache│ │ S3       │ │ SQS      │   │   │
│  │  │ (Postgres)│ │ (Redis)  │ │          │ │          │   │   │
│  │  └──────────┘ └──────────┘ └──────────┘ └──────────┘   │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 7.2 CI/CD Pipeline

| Stage | Tools | Actions |
|-------|-------|---------|
| **Build** | GitHub Actions | Lint, test, build containers |
| **Security** | Snyk, Trivy | Dependency scan, container scan |
| **Deploy (Dev)** | ArgoCD | Auto-deploy on merge to `develop` |
| **Deploy (Staging)** | ArgoCD | Manual trigger, E2E tests |
| **Deploy (Prod)** | ArgoCD | Manual approval, canary rollout |

---

## 8. Technology Stack Summary

| Layer | Technology | Rationale |
|-------|------------|-----------|
| **Frontend** | Next.js 14, React, Tailwind, shadcn/ui | Modern, fast, accessible |
| **API** | Node.js (Fastify) or Python (FastAPI) | Fast, async, good DX |
| **Agent Framework** | LangChain + LlamaIndex | Mature, well-documented |
| **LLM** | AWS Bedrock (Claude) | Enterprise SLAs, APAC availability |
| **Database** | PostgreSQL 16 | Reliable, JSONB, pgvector |
| **Cache** | Redis 7 | Fast, reliable, pub/sub |
| **Queue** | AWS SQS / Redis Streams | Simple, reliable |
| **Search** | Pinecone / pgvector | Vector similarity |
| **Storage** | AWS S3 | Durable, cheap, versioned |
| **Container** | Kubernetes (EKS) | Scalable, portable |
| **CI/CD** | GitHub Actions + ArgoCD | GitOps, reliable |
| **Monitoring** | Datadog / Grafana | Observability |

---

## 9. Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| **LLM provider outage** | Agent tasks fail | Multi-provider fallback (Bedrock → Azure → Anthropic direct) |
| **Vector store performance** | Slow search | pgvector as fallback, caching |
| **Regulatory feed unavailable** | Stale data | Local cache, manual upload option |
| **Tenant data leak** | Critical | Row-level security, tenant isolation tests |
| **Agent hallucination** | Bad recommendations | Confidence thresholds, HITL gates |

---

## 10. Phase 1 MVP Scope

For initial launch, focus on:

| In Scope | Out of Scope (Phase 2+) |
|----------|------------------------|
| Risk, Control, Issue, Evidence CRUD | Adversarial testing agents |
| Single LLM provider (Bedrock) | Multi-provider fallback |
| HKMA + MAS regulatory feeds | Global regulatory feeds |
| Basic approval workflows | Complex escalation chains |
| PostgreSQL + pgvector | Dedicated vector DB |
| Single region (HK or SG) | Multi-region deployment |
| Web app only | Mobile app |

---

## 11. Next Steps

1. **Validate with PM** — Confirm MVP scope aligns with PRD priorities
2. **API Design** — Define OpenAPI spec for core services
3. **Data Model Review** — Finalize schema with domain experts
4. **Agent Prototyping** — Spike on Policy Research Agent
5. **Infrastructure Setup** — Terraform for base infrastructure

---

*Architecture is a hypothesis. Ship, measure, iterate.*

— Winston
