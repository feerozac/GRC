# AI Security — Evonix Next Gen GRC

> Secure deployment and operation of AI assistants and agentic systems: philosophy, boundaries, governance, and failure behavior.

**Source:** This section integrates principles and patterns from the [agentic-cyber-use-cases](https://github.com/feerozac/GRC) reference architecture (OpenCLAW-style: coworker model, threat-model-first, survivable failure).

**Related:** [Explainability](EXPLAINABILITY.md) · [Agentic Cyber Defence](AGENTIC-CYBER-DEFENCE.md)

---

## Purpose and scope

This document describes how to deploy and operate AI assistants (GRC agents, cyber defence agents, policy agents) in a way that is **secure, auditable, predictable, and recoverable**. The emphasis is not on maximizing capability but on ensuring that whatever the system does happens within well-defined constraints.

**In scope:** Design philosophy, identity and authority separation, deployment and network boundaries, memory and auditability, backup and recovery, update control, external integrations and API governance, tooling and skill governance, budgeting and telemetry, alerts and failure behavior, downtime and end-of-life, human judgment and operator requirements, threat model, and replication guidance.

**Out of scope:** New AI models, training techniques, or alignment theory; vendor endorsement; universal or enterprise-scale prescription. The reference is grounded in a single accountable operator; adapt for multi-operator or organizational use.

---

## Design philosophy: coworker, not plugin

Most AI assistants are deployed as either a **plugin** (embedded in the human’s identity and permissions) or a **service** (opaque, third-party). Both create avoidable risk: plugins inherit excessive authority; services hide state and decisions.

We adopt a **coworker** model:

- The assistant has **its own identity** (accounts, credentials, sessions). It never acts as the human.
- **Authority is explicitly delegated**, never shared. Every action is reviewable and reversible.
- **Memory is externalized** and human-readable (see [Explainability](EXPLAINABILITY.md)).
- **Failure modes are designed upfront** — detectable, bounded, survivable — not discovered in production.

**Separation of identity, authority, and execution:** These three layers are kept distinct. The assistant holds its own identity; authority is granted through explicit, revocable mechanisms; execution is constrained by infrastructure, tooling, and review. Compromise or error in one layer does not automatically propagate to the others.

**Constraint as enabler:** Clear boundaries reduce cognitive load, improve predictability, and make delegation safer. By limiting what the assistant can do unilaterally, we make it safer to let it do more overall.

---

## North Star and non-goals

**Design priority (strict order):**

1. **Security** — Minimize harm, blast radius, and irreversibility.
2. **Stability** — Predictability, debuggability, failure containment.
3. **Performance** — Reduce friction and wasted effort.
4. **Intelligence** — Usefulness within the above constraints.

When tradeoffs arise, the higher-priority constraint wins. An improvement that enhances intelligence while degrading security is rejected.

**Explicit non-goals:**

- **High availability** — If the assistant is unreachable, work pauses. No automatic failover; no secondary instance assumes authority.
- **Unattended autonomy** — Long-running, unsupervised execution is avoided. Silence is correct when there is nothing to do within current delegation.
- **Trust accumulation** — Past correctness does not grant future authority. Delegation remains conditional and revocable.
- **Silent recovery** — Recovery requires human awareness and intent. No self-healing that re-establishes authority without review.

---

## Threat model summary

**Threats the architecture is designed to mitigate:**

| Threat | Mitigations |
|--------|-------------|
| **Silent authority escalation** | Identity separation, tool/skill gating, human-in-the-loop approvals, capability mismatch detection, alert-driven state transitions. |
| **Runaway automation** | Hard API spend caps, research-loop detection, automatic pause/stop, absence-of-supervision shutdown, physical dependency on powered hardware. |
| **Credential/identity compromise** | Strict identity separation, assistant-owned accounts only, no human credential delegation, inactivity-based account deletion, revocation workflows. |
| **Supply chain/update abuse** | Fixed update sources, assistant prepares / human approves every update, diff-based justification, monitoring of update mechanism, halt on unauthorized change. |
| **Tool/skill poisoning** | Four-phase skill analysis (pre-ingestion, multi-perspective review, capability mismatch, human approval gate); periodic tool census; removal as routine lifecycle. |
| **Orphaned/zombie automation** | Fail-closed network, control-channel dependency, auto-escalation from paused to stopped, account auto-deletion via inactivity, physical shutdown as ultimate kill-switch. |

**Threats explicitly out of scope:** Physical coercion/hardware seizure; compromise of external providers (messaging, APIs); malicious human operator (system makes misuse visible and attributable, does not override operator); nation-state or APT-level adversaries.

**Accepted tradeoffs:** Availability vs control (downtime over autonomy); convenience vs safety (explicit approvals over seamless flow); capability vs confinement (assistant can do more than it is allowed); trust vs verifiability (inspection over alignment assumptions).

---

## Deployment and physical boundaries

- **Execution boundary:** Dedicated VM (or equivalent) as sole execution surface. Isolates assistant from host; enables snapshotting, rollback, and clear incident containment.
- **On-premises preference:** Physical hardware under operator control reduces remote persistence and third-party control-plane risk. Tradeoff: availability for sovereignty.
- **No remote persistence by default:** No background replicas, cloud fallbacks, or long-lived service accounts designed to survive operator disappearance. If the system stops, it stops cleanly.
- **Recovery:** Restoring from snapshot or backup does **not** restore authority or active sessions. Credentials and delegation must be re-established consciously.

---

## Network isolation and access

- **Default-deny:** No inbound services by default. No open ports, no permanent listening services for human access. Reachability is the exception.
- **Asymmetric connectivity:** Outbound access under strict constraints; external systems cannot initiate connections inward. Control flows outward only.
- **Single control channel:** One mediated channel for operator interaction (e.g. messaging). No group chats; single human interlocutor to minimize prompt-injection and origin ambiguity.
- **Administrative access:** Temporary, manually initiated only (e.g. time-limited SSH). No standing admin path. No browser-exposed control surface by default.
- **Failure behavior:** On connectivity loss, the assistant pauses and waits. No retries past defined thresholds, no alternative paths without explicit approval.

---

## Identity and account separation

- **No shared identity:** Assistant has dedicated accounts (email, calendar, GitHub, APIs). Never uses human credentials or sessions.
- **Strong auth:** Passkeys where supported; otherwise MFA. No weak or reusable secrets. Backup codes offline and never accessible to the assistant.
- **Session isolation:** Sessions are disposable; revocation does not require coordination. Restore does not resurrect prior sessions.
- **No credential forwarding:** Assistant never stores human credentials or proxies auth for the human. For actions requiring human authority (sign-off, merge, payment), assistant prepares and human executes.
- **Blast radius:** Each assistant account is scoped so compromise of one does not grant lateral access. Lifecycle and revocation are documented and rehearsed.

---

## Memory, auditability, and explainability

- **Externalized memory:** Durable memory is not inside the model. It lives in human-readable, version-controlled artifacts (e.g. Markdown vault in Git). Rationale, decisions, and rejected options are captured; credentials and secrets never appear.
- **Version control as audit trail:** All changes are timestamped and attributable. Diffs show how understanding evolved. Memory is a verifiable record, not just a narrative.
- **Continuous documentation:** Documentation is incremental and event-driven, not only at milestones. Rationale captured at the time is reliable; rationale reconstructed later is narrative.

**Evonix integration:** See [Explainability](EXPLAINABILITY.md) for DecisionLog, AuditTrailEntry, Challenge, 6-layer framework, and regulator-ready reports. All agent outputs (GRC and cyber) supply rationale, confidence, and sources; human approval is required for material actions.

---

## Backup and recovery

- **Backups preserve understanding, not execution state.** Excluded: runtime processes, active sessions, credentials, secrets, live auth state. Included: documentation vault, sanitized configuration, work artifacts, decision history.
- **Recovery is deliberate and manual.** Steps: provision clean environment, reinstall assistant, restore docs/config from backup, reissue credentials via standard process, validate before resuming. No automatic restore of execution state.
- **Incident-triggered recovery:** Revoke credentials for the previous instance first; reassess network; verify backup integrity; then restore. Recovery never bypasses incident response.

---

## Update and change control

- **Change as risk surface:** Every update can introduce behavioral drift, expanded authority, or new dependencies. Updates are not assumed beneficial; they are evaluated before acceptance.
- **Monitor, do not self-apply:** Assistant may monitor for updates and surface them; it cannot apply any update autonomously. Human approves each change; silence is treated as denial.
- **Fixed update sources:** No redirects, no self-modification of update logic. Discrepancy between expected and actual source is a security event.
- **Single-use, time-bound approval:** Each approval applies only to the specific update declared. No standing approval for future updates.
- **Unauthorized change detection:** Unauthorized code changes, update attempts outside normal process, or modifications to the update mechanism trigger credential revocation and investigation.

---

## External integrations and API governance

- **Small, explicit allowlist:** Only approved external APIs. No implicit trust; each integration is purpose-specific, revocable, and observable.
- **Credential ownership:** API credentials belong to assistant-owned accounts, scoped to minimum required permissions. Never use human-owned keys.
- **Spending limits as security controls:** Hard monthly caps. Exhaustion stops API access until operator intervenes. Limits bound both compromise and runaway/research-loop behavior.
- **No autonomous key management:** Assistant cannot create new keys, rotate credentials, or request expanded permissions. All credential changes require human action.
- **Usage monitoring and alerts:** Near-real-time tracking; tiered alerts (informational, warning, critical). Thresholds are static unless operator changes them.
- **Failure behavior:** On provider outage, revocation, or budget exhaustion, report and wait. No undeclared fallbacks, no indefinite retries.

---

## Tooling and skill governance

- **Default-deny:** No skills enabled by default. Each skill is individually approved and scoped to a purpose. Unused skills are removed.
- **Skills as threat surfaces:** Every skill is executable code. Static analysis and, where useful, AI-assisted adversarial review before approval. Risk classification: Safe / Conditional / High Risk / Rejected.
- **No self-installation:** Assistant cannot install, modify, or bypass review for skills. All lifecycle actions require human authorization.
- **Drift and re-evaluation:** When a skill’s version, permissions, or dependencies change, re-evaluation is triggered. No permanent grandfathering.

**Skill security analysis pipeline (four phases):**

1. **Pre-ingestion analysis** — Text-based; detect obvious risk, ambiguity, policy violation; no execution.
2. **Multi-perspective risk review** — Security, authority, failure-mode, and drift perspectives; preserve disagreements.
3. **Capability mismatch detection** — Compare skill’s implied actions to granted identities, tools, network, and credentials; reject if authority expansion is required.
4. **Human-in-the-loop approval** — Automation stops; operator approves, rejects, or requests changes. Silence = rejection.

---

## API budgeting and telemetry

- **Cost as behavioral signal:** Usage patterns reveal whether the assistant is in scope or drifting. Hard financial limits are a guaranteed stop condition.
- **Hard spend caps:** Enforced at provider where possible. Assistant cannot raise limits or create replacement keys. Exhaustion = immediate loss of API access until operator intervenes.
- **Research-loop detection:** Flag high query volume with low artifact output, repeated near-identical calls, or lack of stopping condition. On detection: pause API calls, summarize progress, ask operator to continue/redirect/terminate.
- **Interpretation, not optimization:** Cost is a diagnostic. High cost is not inherently bad; cost without convergence is. Budgeting triggers dialogue with the operator.

---

## Alerts and failure behavior

- **Alerts as state transitions:** Alerts change what the assistant is allowed to do. They are not informational only; behavior is constrained immediately, then operator decides next step.
- **Four operational states:**
  - **Normal** — All assumptions hold; full capability within policy.
  - **Degraded** — Early warning (e.g. elevated API use, boundary friction). More caution, more logging, more frequent notification.
  - **Paused** — Uncertainty over threshold (e.g. suspected research loop, capability mismatch). Non-essential actions halt; no auto-recovery.
  - **Stopped** — Severe or unambiguous risk (unauthorized change, credential compromise, kill-switch). All execution stops; credentials revoked where possible; restart requires deliberate human action.
- **Fail-closed:** When uncertain, default to inaction. No bypassing alerts, no indefinite retries, no reinterpreting conditions to allow continuation.
- **Human acknowledgment:** Critical alerts require explicit acknowledgment before forward progress. Silence is not acknowledgment. Escalation paths are predefined (e.g. repeated warnings → pause; unacknowledged pause → stop).
- **Documentation:** Every alert event is recorded (trigger, state transition, assistant response, operator decision). See [Explainability](EXPLAINABILITY.md) and [Agentic Cyber Defence](AGENTIC-CYBER-DEFENCE.md) for Evonix audit trail.

---

## Downtime and end-of-life

- **Absence of control ⇒ absence of action:** If supervision is unavailable, authority is treated as collapsed. No new tasks; pause at safe checkpoints; no rerouting to alternate channels.
- **Account auto-deletion:** Inactivity-based deletion for assistant-owned accounts where supported. Orphaned identities expire; no long-lived dormant authority.
- **Physical shutdown as ultimate kill-switch:** Power off stops execution and network; no cloud fallback or replica. Operation depends on electricity, hardware, and human intent.
- **Planned retirement:** Accounts deleted, credentials revoked, documentation archived. Knowledge preserved; authority is not. Retirement is a first-class operation.

---

## Human judgment and operator requirements

- **Humans as judges today:** Human operator is treated as the current least-dangerous authority for evaluating consequences, accepting accountability, and halting when needed. This is an empirical, temporal assumption — not permanent human supremacy.
- **Judgment as role, not identity:** What matters is that judgment is explicit, accountable, and reviewable. If a better evaluator emerges, the architecture should accommodate it via explicit, documented change — not by eroding approval requirements.
- **Mitigating evaluator failure:** Explicit decision points, written rationale for irreversible actions, documented rejected alternatives, and time separation between detection and approval where possible. Significant human judgments are logged and reviewable.
- **Misuse resistance:** Constraint removal is explicit and audited. No single “trust me from now on” switch. Friction on high-risk actions so misuse requires deliberate effort.

**Operator assumptions (this architecture does not compensate for operator failure):**

- Operator understands basic security and identity hygiene.
- Operator can review proposed actions (e.g. PRs, diffs, docs) and deny by default.
- Operator accepts that delegation is conditional and revocable and will intervene, pause, or terminate when trust degrades.

If the operator does not meet these, the system should not be used. The architecture does not train operators or override human judgment to enforce safety.

---

## Anti-patterns to avoid

| Anti-pattern | Why it’s rejected |
|--------------|-------------------|
| **Plugin inheritance** | Assistant using human identity/credentials collapses accountability and creates silent escalation. |
| **Opaque memory** | Durable memory inside the assistant is not auditable; operator cannot verify reasoning. |
| **Authority by convenience** | “Just this once” broad access becomes the new baseline. |
| **Safety through compensation** | System compensating for operator ignorance inverts authority; assistant becomes guardian over principal. |
| **Autonomy theater** | Bypassing review, documentation, or approval is uncontrolled risk, not capability. |

**Failure as a design feature:** Failure is assumed. The goal is for it to be detectable, bounded, survivable, and unable to escalate silently. Adding automatic retries without visibility, background replicas, or auto-approval of “low-risk” actions erodes these properties.

---

## Recursive improvement and North Star constraints

- **Improvement by description, not mutation:** The assistant may analyze, document, and propose changes in text. Implementation is a separate, explicitly authorized phase. No self-modification of model, core code, or architecture without human approval.
- **Documentation as output:** Improvement cycles produce documentation (e.g. proposals, risk analysis). Code changes follow the same governance as any other change.
- **Constraint hierarchy (strict):** Security → Stability → Performance → Intelligence. Proposals that violate a higher priority are rejected.
- **Questioning constraints:** The assistant may question whether a constraint still fits or propose refinements. It cannot weaken constraints or change priority order without human agreement.
- **No closed loops:** Observe → propose → approve → implement are distinct phases. Human intervention is required between proposal and approval. Replaceability is required; no lock-in to a single instance.

---

## Replication and minimal viable secure setup

**Portable:** Coworker model; identity/authority/execution separation; fail-closed behavior; human approval for irreversible actions; documentation as safety control; PRs as approval gates; skill analysis pipeline; alert-driven state transitions; hard API caps; explicit update approval.

**Context-dependent:** Deployment environment (VM/container/cloud), identity providers, human oversight model (single vs multiple operators, shifts, org governance).

**Minimal viable secure setup:** Dedicated execution environment (VM/container); separate assistant identity and accounts; no shared credentials; one explicit control channel; Git-based documentation for memory and audit; hard API spend caps on all external integrations.

**Common replication mistakes:** Reverting to plugin model (shared creds, direct writes, bypassing review); over-automating safeguards (auto-approve after timeout); chasing completeness; ignoring end-of-life (no plan for inactivity or shutdown).

---

## Capability within constraints

Capability comes from **preparation, legibility, and disciplined handoff**, not from autonomy. Examples that fit this model:

- **Email/messaging:** Assistant processes only explicitly forwarded items; drafts responses; operator sends, edits, or discards. Assistant never sends as the operator.
- **Calendar:** Assistant uses its own calendar identity to propose events; operator accepts/declines from their calendar. No direct modification of operator’s calendar.
- **Code/collaboration:** Work in forks or isolated repos; commits and PRs with clear rationale; operator reviews and merges. No direct write to human-owned repos.
- **Research/analysis:** Scoped research, citations, uncertainty documented; operator owns the final decision. Assistant prepares; human decides.
- **Incident response:** Assistant detects anomalies, proposes containment, documents impact. Operator executes revocation, shutdown, or other consequential actions. See [Agentic Cyber Defence](AGENTIC-CYBER-DEFENCE.md) for Evonix cyber agents and HITL.

Revocation (access, accounts, shutdown) is normal collaboration hygiene, not an emergency-only measure.

---

## How this ties to Evonix

| Evonix area | AI Security alignment |
|-------------|------------------------|
| **Explainability** | DecisionLog, AuditTrailEntry, Challenge, 6-layer framework, and regulator-ready reports implement externalized, auditable rationale and human approval gates. |
| **Agentic Cyber Defence** | Cyber agents (Detection, Response, Orchestration, Threat Intel) use dedicated identity, rationale per action, confidence, and HITL for critical response actions; alerts and failures feed audit trail. |
| **GRC workflow** | 1L/2L/3L agents operate as coworkers: explicit delegation, reviewable outputs, no shared human credentials; policy and control approvals are human-gated. |
| **Reports & Narratives** | Explainability Report and Audit Trail Pack export the kind of human-readable, versionable record this section calls for. |

---

## References (source use-case documents)

Integrated from the agentic-cyber-use-cases reference:

- 00 Introduction and scope · 00b Positioning and anti-patterns  
- 01 Design philosophy (coworker not plugin)  
- 02 Deployment and physical boundaries · 03 Network isolation and access · 04 Identity and account separation  
- 05 GitHub collaboration model  
- 06 Memory and auditability · 07 Backup and recovery · 08 Update and change control  
- 09 External integrations and API governance · 10 Tooling and skill governance  
- 11 Recursive improvement and North Star constraints · 12 Skill security analysis pipeline  
- 13 API budgeting and telemetry · 14 Alerts and failure behavior · 15 Downtime and end-of-life  
- 16 Human judgment assumptions · 16b Operator requirements and failure modes  
- 17 Threat model summary · 18 Replication guide · 19 Conclusion and reflections · 20 Capability examples within constraints  

---

*Part of Evonix Next Gen GRC. Use with [Explainability](EXPLAINABILITY.md) and [Agentic Cyber Defence](AGENTIC-CYBER-DEFENCE.md) for a complete picture of secure, auditable agentic systems.*
