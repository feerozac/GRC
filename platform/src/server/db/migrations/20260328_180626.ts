import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "frameworks_controls" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"control_id" varchar NOT NULL,
  	"control_name" varchar NOT NULL,
  	"domain" varchar,
  	"process" varchar,
  	"description" varchar,
  	"keywords" jsonb
  );
  
  CREATE TABLE "frameworks" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"code" varchar NOT NULL,
  	"version" varchar,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "board_circulars" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"organization" varchar,
  	"publish_date" timestamp(3) with time zone,
  	"document_type" varchar DEFAULT 'board_minutes',
  	"s3_key" varchar,
  	"s3_url" varchar,
  	"parsed_text" varchar,
  	"extraction_status" varchar DEFAULT 'pending',
  	"error_message" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "annual_reports" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"organization" varchar,
  	"reporting_year" numeric,
  	"publish_date" timestamp(3) with time zone,
  	"s3_key" varchar,
  	"s3_url" varchar,
  	"parsed_text" varchar,
  	"extraction_status" varchar DEFAULT 'pending',
  	"error_message" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "governance_objectives_framework_mappings" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"framework_id" integer,
  	"control_id" varchar,
  	"control_name" varchar,
  	"similarity_score" numeric,
  	"confidence" varchar,
  	"matched_keywords" jsonb,
  	"rationale" varchar
  );
  
  CREATE TABLE "governance_objectives" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"objective_id" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"source_document_type" varchar NOT NULL,
  	"source_section" varchar,
  	"source_section_type" varchar,
  	"extraction_confidence" varchar,
  	"keywords" jsonb,
  	"review_status" varchar DEFAULT 'pending',
  	"review_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "governance_objectives_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"board_circulars_id" integer,
  	"annual_reports_id" integer
  );
  
  CREATE TABLE "control_objectives_framework_references" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"framework_id" integer,
  	"control_id" varchar,
  	"control_name" varchar
  );
  
  CREATE TABLE "control_objectives" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"control_id" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"governance_objective_id" integer NOT NULL,
  	"category" varchar,
  	"owner" varchar,
  	"frequency" varchar,
  	"extraction_confidence" varchar,
  	"review_status" varchar DEFAULT 'pending',
  	"review_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "risk_appetite_statements_framework_mappings" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"framework_id" integer,
  	"control_id" varchar,
  	"rationale" varchar
  );
  
  CREATE TABLE "risk_appetite_statements" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"statement_id" varchar NOT NULL,
  	"statement" varchar NOT NULL,
  	"risk_category" varchar,
  	"appetite_level" varchar,
  	"tolerance_threshold" varchar,
  	"source_document_type" varchar,
  	"source_section" varchar,
  	"extraction_confidence" varchar,
  	"review_status" varchar DEFAULT 'pending',
  	"review_notes" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "risk_appetite_statements_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"board_circulars_id" integer,
  	"annual_reports_id" integer,
  	"governance_objectives_id" integer
  );
  
  CREATE TABLE "decision_logs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"trace_id" varchar NOT NULL,
  	"action" varchar NOT NULL,
  	"entity_type" varchar NOT NULL,
  	"entity_id" varchar NOT NULL,
  	"agent_type" varchar,
  	"input" jsonb,
  	"output" jsonb,
  	"reasoning" varchar,
  	"confidence" numeric,
  	"model_used" varchar,
  	"token_usage_input" numeric,
  	"token_usage_output" numeric,
  	"token_usage_total" numeric,
  	"timestamp" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "audit_trail_entries" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"trace_id" varchar NOT NULL,
  	"event_type" varchar NOT NULL,
  	"entity_type" varchar NOT NULL,
  	"entity_id" varchar NOT NULL,
  	"actor_type" varchar,
  	"actor_user_id" integer,
  	"actor_agent_name" varchar,
  	"details" jsonb,
  	"source_trace_source_document_collection" varchar,
  	"source_trace_source_document_id" varchar,
  	"source_trace_source_section" varchar,
  	"source_trace_source_text" varchar,
  	"timestamp" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "policy_agent_runs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"status" varchar DEFAULT 'created' NOT NULL,
  	"current_step" varchar DEFAULT 'not_started',
  	"step_results" jsonb,
  	"error_message" varchar,
  	"started_at" timestamp(3) with time zone,
  	"completed_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "policy_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"run_id" integer NOT NULL,
  	"category" varchar DEFAULT 'board_document' NOT NULL,
  	"file_type" varchar,
  	"s3_key" varchar,
  	"s3_url" varchar,
  	"hash" varchar,
  	"parsed_text" varchar,
  	"ingest_status" varchar DEFAULT 'pending',
  	"error_message" varchar,
  	"page_count" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "policy_gap_analyses_frameworks_affected" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"framework_name" varchar NOT NULL,
  	"section_ref" varchar NOT NULL
  );
  
  CREATE TABLE "policy_gap_analyses" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"gap_id" varchar NOT NULL,
  	"policy_name" varchar NOT NULL,
  	"gap_description" varchar NOT NULL,
  	"priority" varchar NOT NULL,
  	"action" varchar NOT NULL,
  	"confidence" numeric,
  	"reasoning" varchar,
  	"source_run" varchar,
  	"source_document_type" varchar,
  	"status" varchar DEFAULT 'identified',
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "policy_gap_analyses_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"board_circulars_id" integer,
  	"annual_reports_id" integer
  );
  
  CREATE TABLE "policy_drafts_sections_citations" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"framework_name" varchar NOT NULL,
  	"section_ref" varchar NOT NULL,
  	"description" varchar
  );
  
  CREATE TABLE "policy_drafts_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"type" varchar NOT NULL,
  	"section_number" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"content" varchar NOT NULL,
  	"previous_content" varchar,
  	"confidence" numeric
  );
  
  CREATE TABLE "policy_drafts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"draft_id" varchar NOT NULL,
  	"policy_name" varchar NOT NULL,
  	"version" varchar NOT NULL,
  	"overall_confidence" numeric,
  	"human_draft_required" boolean DEFAULT false,
  	"human_draft_reason" varchar,
  	"rationale_why_needed" jsonb,
  	"rationale_frameworks_mandating" jsonb,
  	"rationale_related_artifact_impact" jsonb,
  	"source_gap_id" integer,
  	"source_run" varchar,
  	"status" varchar DEFAULT 'draft',
  	"approved_by" varchar,
  	"approved_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pipeline_runs_steps" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"label" varchar NOT NULL,
  	"status" varchar DEFAULT 'pending' NOT NULL,
  	"started_at" timestamp(3) with time zone,
  	"completed_at" timestamp(3) with time zone,
  	"output" jsonb,
  	"error" varchar
  );
  
  CREATE TABLE "pipeline_runs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"run_id" varchar NOT NULL,
  	"collection_slug" varchar NOT NULL,
  	"trace_id" varchar NOT NULL,
  	"status" varchar DEFAULT 'pending' NOT NULL,
  	"current_step" varchar,
  	"started_at" timestamp(3) with time zone,
  	"completed_at" timestamp(3) with time zone,
  	"elapsed_ms" numeric,
  	"error" varchar,
  	"results_objectives_created" numeric DEFAULT 0,
  	"results_statements_created" numeric DEFAULT 0,
  	"results_controls_created" numeric DEFAULT 0,
  	"results_framework_mappings" numeric DEFAULT 0,
  	"results_gaps_identified" numeric DEFAULT 0,
  	"results_drafts_created" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "pipeline_runs_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"board_circulars_id" integer,
  	"annual_reports_id" integer
  );
  
  CREATE TABLE "challenges" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"challenge_id" varchar NOT NULL,
  	"policy_draft_id" integer NOT NULL,
  	"challenged_by" varchar NOT NULL,
  	"rationale" varchar NOT NULL,
  	"status" varchar DEFAULT 'open',
  	"resolution" varchar,
  	"resolved_at" timestamp(3) with time zone,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_payload_jobs_fk";
  
  DROP INDEX "payload_locked_documents_rels_payload_jobs_id_idx";
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "frameworks_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "board_circulars_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "annual_reports_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "governance_objectives_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "control_objectives_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "risk_appetite_statements_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "decision_logs_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "audit_trail_entries_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "policy_agent_runs_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "policy_documents_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "policy_gap_analyses_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "policy_drafts_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "pipeline_runs_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "challenges_id" integer;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "frameworks_controls" ADD CONSTRAINT "frameworks_controls_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."frameworks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "governance_objectives_framework_mappings" ADD CONSTRAINT "governance_objectives_framework_mappings_framework_id_frameworks_id_fk" FOREIGN KEY ("framework_id") REFERENCES "public"."frameworks"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "governance_objectives_framework_mappings" ADD CONSTRAINT "governance_objectives_framework_mappings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."governance_objectives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "governance_objectives_rels" ADD CONSTRAINT "governance_objectives_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."governance_objectives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "governance_objectives_rels" ADD CONSTRAINT "governance_objectives_rels_board_circulars_fk" FOREIGN KEY ("board_circulars_id") REFERENCES "public"."board_circulars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "governance_objectives_rels" ADD CONSTRAINT "governance_objectives_rels_annual_reports_fk" FOREIGN KEY ("annual_reports_id") REFERENCES "public"."annual_reports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "control_objectives_framework_references" ADD CONSTRAINT "control_objectives_framework_references_framework_id_frameworks_id_fk" FOREIGN KEY ("framework_id") REFERENCES "public"."frameworks"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "control_objectives_framework_references" ADD CONSTRAINT "control_objectives_framework_references_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."control_objectives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "control_objectives" ADD CONSTRAINT "control_objectives_governance_objective_id_governance_objectives_id_fk" FOREIGN KEY ("governance_objective_id") REFERENCES "public"."governance_objectives"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "risk_appetite_statements_framework_mappings" ADD CONSTRAINT "risk_appetite_statements_framework_mappings_framework_id_frameworks_id_fk" FOREIGN KEY ("framework_id") REFERENCES "public"."frameworks"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "risk_appetite_statements_framework_mappings" ADD CONSTRAINT "risk_appetite_statements_framework_mappings_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."risk_appetite_statements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "risk_appetite_statements_rels" ADD CONSTRAINT "risk_appetite_statements_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."risk_appetite_statements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "risk_appetite_statements_rels" ADD CONSTRAINT "risk_appetite_statements_rels_board_circulars_fk" FOREIGN KEY ("board_circulars_id") REFERENCES "public"."board_circulars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "risk_appetite_statements_rels" ADD CONSTRAINT "risk_appetite_statements_rels_annual_reports_fk" FOREIGN KEY ("annual_reports_id") REFERENCES "public"."annual_reports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "risk_appetite_statements_rels" ADD CONSTRAINT "risk_appetite_statements_rels_governance_objectives_fk" FOREIGN KEY ("governance_objectives_id") REFERENCES "public"."governance_objectives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "audit_trail_entries" ADD CONSTRAINT "audit_trail_entries_actor_user_id_users_id_fk" FOREIGN KEY ("actor_user_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "policy_documents" ADD CONSTRAINT "policy_documents_run_id_policy_agent_runs_id_fk" FOREIGN KEY ("run_id") REFERENCES "public"."policy_agent_runs"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "policy_gap_analyses_frameworks_affected" ADD CONSTRAINT "policy_gap_analyses_frameworks_affected_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."policy_gap_analyses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "policy_gap_analyses_rels" ADD CONSTRAINT "policy_gap_analyses_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."policy_gap_analyses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "policy_gap_analyses_rels" ADD CONSTRAINT "policy_gap_analyses_rels_board_circulars_fk" FOREIGN KEY ("board_circulars_id") REFERENCES "public"."board_circulars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "policy_gap_analyses_rels" ADD CONSTRAINT "policy_gap_analyses_rels_annual_reports_fk" FOREIGN KEY ("annual_reports_id") REFERENCES "public"."annual_reports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "policy_drafts_sections_citations" ADD CONSTRAINT "policy_drafts_sections_citations_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."policy_drafts_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "policy_drafts_sections" ADD CONSTRAINT "policy_drafts_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."policy_drafts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "policy_drafts" ADD CONSTRAINT "policy_drafts_source_gap_id_policy_gap_analyses_id_fk" FOREIGN KEY ("source_gap_id") REFERENCES "public"."policy_gap_analyses"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pipeline_runs_steps" ADD CONSTRAINT "pipeline_runs_steps_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pipeline_runs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pipeline_runs_rels" ADD CONSTRAINT "pipeline_runs_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."pipeline_runs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pipeline_runs_rels" ADD CONSTRAINT "pipeline_runs_rels_board_circulars_fk" FOREIGN KEY ("board_circulars_id") REFERENCES "public"."board_circulars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pipeline_runs_rels" ADD CONSTRAINT "pipeline_runs_rels_annual_reports_fk" FOREIGN KEY ("annual_reports_id") REFERENCES "public"."annual_reports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "challenges" ADD CONSTRAINT "challenges_policy_draft_id_policy_drafts_id_fk" FOREIGN KEY ("policy_draft_id") REFERENCES "public"."policy_drafts"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "frameworks_controls_order_idx" ON "frameworks_controls" USING btree ("_order");
  CREATE INDEX "frameworks_controls_parent_id_idx" ON "frameworks_controls" USING btree ("_parent_id");
  CREATE INDEX "frameworks_name_idx" ON "frameworks" USING btree ("name");
  CREATE INDEX "frameworks_code_idx" ON "frameworks" USING btree ("code");
  CREATE INDEX "frameworks_updated_at_idx" ON "frameworks" USING btree ("updated_at");
  CREATE INDEX "frameworks_created_at_idx" ON "frameworks" USING btree ("created_at");
  CREATE INDEX "board_circulars_title_idx" ON "board_circulars" USING btree ("title");
  CREATE INDEX "board_circulars_updated_at_idx" ON "board_circulars" USING btree ("updated_at");
  CREATE INDEX "board_circulars_created_at_idx" ON "board_circulars" USING btree ("created_at");
  CREATE INDEX "annual_reports_title_idx" ON "annual_reports" USING btree ("title");
  CREATE INDEX "annual_reports_updated_at_idx" ON "annual_reports" USING btree ("updated_at");
  CREATE INDEX "annual_reports_created_at_idx" ON "annual_reports" USING btree ("created_at");
  CREATE INDEX "governance_objectives_framework_mappings_order_idx" ON "governance_objectives_framework_mappings" USING btree ("_order");
  CREATE INDEX "governance_objectives_framework_mappings_parent_id_idx" ON "governance_objectives_framework_mappings" USING btree ("_parent_id");
  CREATE INDEX "governance_objectives_framework_mappings_framework_idx" ON "governance_objectives_framework_mappings" USING btree ("framework_id");
  CREATE UNIQUE INDEX "governance_objectives_objective_id_idx" ON "governance_objectives" USING btree ("objective_id");
  CREATE INDEX "governance_objectives_updated_at_idx" ON "governance_objectives" USING btree ("updated_at");
  CREATE INDEX "governance_objectives_created_at_idx" ON "governance_objectives" USING btree ("created_at");
  CREATE INDEX "governance_objectives_rels_order_idx" ON "governance_objectives_rels" USING btree ("order");
  CREATE INDEX "governance_objectives_rels_parent_idx" ON "governance_objectives_rels" USING btree ("parent_id");
  CREATE INDEX "governance_objectives_rels_path_idx" ON "governance_objectives_rels" USING btree ("path");
  CREATE INDEX "governance_objectives_rels_board_circulars_id_idx" ON "governance_objectives_rels" USING btree ("board_circulars_id");
  CREATE INDEX "governance_objectives_rels_annual_reports_id_idx" ON "governance_objectives_rels" USING btree ("annual_reports_id");
  CREATE INDEX "control_objectives_framework_references_order_idx" ON "control_objectives_framework_references" USING btree ("_order");
  CREATE INDEX "control_objectives_framework_references_parent_id_idx" ON "control_objectives_framework_references" USING btree ("_parent_id");
  CREATE INDEX "control_objectives_framework_references_framework_idx" ON "control_objectives_framework_references" USING btree ("framework_id");
  CREATE UNIQUE INDEX "control_objectives_control_id_idx" ON "control_objectives" USING btree ("control_id");
  CREATE INDEX "control_objectives_governance_objective_idx" ON "control_objectives" USING btree ("governance_objective_id");
  CREATE INDEX "control_objectives_updated_at_idx" ON "control_objectives" USING btree ("updated_at");
  CREATE INDEX "control_objectives_created_at_idx" ON "control_objectives" USING btree ("created_at");
  CREATE INDEX "risk_appetite_statements_framework_mappings_order_idx" ON "risk_appetite_statements_framework_mappings" USING btree ("_order");
  CREATE INDEX "risk_appetite_statements_framework_mappings_parent_id_idx" ON "risk_appetite_statements_framework_mappings" USING btree ("_parent_id");
  CREATE INDEX "risk_appetite_statements_framework_mappings_framework_idx" ON "risk_appetite_statements_framework_mappings" USING btree ("framework_id");
  CREATE UNIQUE INDEX "risk_appetite_statements_statement_id_idx" ON "risk_appetite_statements" USING btree ("statement_id");
  CREATE INDEX "risk_appetite_statements_updated_at_idx" ON "risk_appetite_statements" USING btree ("updated_at");
  CREATE INDEX "risk_appetite_statements_created_at_idx" ON "risk_appetite_statements" USING btree ("created_at");
  CREATE INDEX "risk_appetite_statements_rels_order_idx" ON "risk_appetite_statements_rels" USING btree ("order");
  CREATE INDEX "risk_appetite_statements_rels_parent_idx" ON "risk_appetite_statements_rels" USING btree ("parent_id");
  CREATE INDEX "risk_appetite_statements_rels_path_idx" ON "risk_appetite_statements_rels" USING btree ("path");
  CREATE INDEX "risk_appetite_statements_rels_board_circulars_id_idx" ON "risk_appetite_statements_rels" USING btree ("board_circulars_id");
  CREATE INDEX "risk_appetite_statements_rels_annual_reports_id_idx" ON "risk_appetite_statements_rels" USING btree ("annual_reports_id");
  CREATE INDEX "risk_appetite_statements_rels_governance_objectives_id_idx" ON "risk_appetite_statements_rels" USING btree ("governance_objectives_id");
  CREATE INDEX "decision_logs_trace_id_idx" ON "decision_logs" USING btree ("trace_id");
  CREATE INDEX "decision_logs_updated_at_idx" ON "decision_logs" USING btree ("updated_at");
  CREATE INDEX "decision_logs_created_at_idx" ON "decision_logs" USING btree ("created_at");
  CREATE INDEX "audit_trail_entries_trace_id_idx" ON "audit_trail_entries" USING btree ("trace_id");
  CREATE INDEX "audit_trail_entries_actor_actor_user_idx" ON "audit_trail_entries" USING btree ("actor_user_id");
  CREATE INDEX "audit_trail_entries_timestamp_idx" ON "audit_trail_entries" USING btree ("timestamp");
  CREATE INDEX "audit_trail_entries_updated_at_idx" ON "audit_trail_entries" USING btree ("updated_at");
  CREATE INDEX "audit_trail_entries_created_at_idx" ON "audit_trail_entries" USING btree ("created_at");
  CREATE INDEX "policy_agent_runs_updated_at_idx" ON "policy_agent_runs" USING btree ("updated_at");
  CREATE INDEX "policy_agent_runs_created_at_idx" ON "policy_agent_runs" USING btree ("created_at");
  CREATE INDEX "policy_documents_title_idx" ON "policy_documents" USING btree ("title");
  CREATE INDEX "policy_documents_run_idx" ON "policy_documents" USING btree ("run_id");
  CREATE INDEX "policy_documents_updated_at_idx" ON "policy_documents" USING btree ("updated_at");
  CREATE INDEX "policy_documents_created_at_idx" ON "policy_documents" USING btree ("created_at");
  CREATE INDEX "policy_gap_analyses_frameworks_affected_order_idx" ON "policy_gap_analyses_frameworks_affected" USING btree ("_order");
  CREATE INDEX "policy_gap_analyses_frameworks_affected_parent_id_idx" ON "policy_gap_analyses_frameworks_affected" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "policy_gap_analyses_gap_id_idx" ON "policy_gap_analyses" USING btree ("gap_id");
  CREATE INDEX "policy_gap_analyses_source_run_idx" ON "policy_gap_analyses" USING btree ("source_run");
  CREATE INDEX "policy_gap_analyses_updated_at_idx" ON "policy_gap_analyses" USING btree ("updated_at");
  CREATE INDEX "policy_gap_analyses_created_at_idx" ON "policy_gap_analyses" USING btree ("created_at");
  CREATE INDEX "policy_gap_analyses_rels_order_idx" ON "policy_gap_analyses_rels" USING btree ("order");
  CREATE INDEX "policy_gap_analyses_rels_parent_idx" ON "policy_gap_analyses_rels" USING btree ("parent_id");
  CREATE INDEX "policy_gap_analyses_rels_path_idx" ON "policy_gap_analyses_rels" USING btree ("path");
  CREATE INDEX "policy_gap_analyses_rels_board_circulars_id_idx" ON "policy_gap_analyses_rels" USING btree ("board_circulars_id");
  CREATE INDEX "policy_gap_analyses_rels_annual_reports_id_idx" ON "policy_gap_analyses_rels" USING btree ("annual_reports_id");
  CREATE INDEX "policy_drafts_sections_citations_order_idx" ON "policy_drafts_sections_citations" USING btree ("_order");
  CREATE INDEX "policy_drafts_sections_citations_parent_id_idx" ON "policy_drafts_sections_citations" USING btree ("_parent_id");
  CREATE INDEX "policy_drafts_sections_order_idx" ON "policy_drafts_sections" USING btree ("_order");
  CREATE INDEX "policy_drafts_sections_parent_id_idx" ON "policy_drafts_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "policy_drafts_draft_id_idx" ON "policy_drafts" USING btree ("draft_id");
  CREATE INDEX "policy_drafts_source_gap_idx" ON "policy_drafts" USING btree ("source_gap_id");
  CREATE INDEX "policy_drafts_source_run_idx" ON "policy_drafts" USING btree ("source_run");
  CREATE INDEX "policy_drafts_updated_at_idx" ON "policy_drafts" USING btree ("updated_at");
  CREATE INDEX "policy_drafts_created_at_idx" ON "policy_drafts" USING btree ("created_at");
  CREATE INDEX "pipeline_runs_steps_order_idx" ON "pipeline_runs_steps" USING btree ("_order");
  CREATE INDEX "pipeline_runs_steps_parent_id_idx" ON "pipeline_runs_steps" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pipeline_runs_run_id_idx" ON "pipeline_runs" USING btree ("run_id");
  CREATE INDEX "pipeline_runs_trace_id_idx" ON "pipeline_runs" USING btree ("trace_id");
  CREATE INDEX "pipeline_runs_updated_at_idx" ON "pipeline_runs" USING btree ("updated_at");
  CREATE INDEX "pipeline_runs_created_at_idx" ON "pipeline_runs" USING btree ("created_at");
  CREATE INDEX "pipeline_runs_rels_order_idx" ON "pipeline_runs_rels" USING btree ("order");
  CREATE INDEX "pipeline_runs_rels_parent_idx" ON "pipeline_runs_rels" USING btree ("parent_id");
  CREATE INDEX "pipeline_runs_rels_path_idx" ON "pipeline_runs_rels" USING btree ("path");
  CREATE INDEX "pipeline_runs_rels_board_circulars_id_idx" ON "pipeline_runs_rels" USING btree ("board_circulars_id");
  CREATE INDEX "pipeline_runs_rels_annual_reports_id_idx" ON "pipeline_runs_rels" USING btree ("annual_reports_id");
  CREATE UNIQUE INDEX "challenges_challenge_id_idx" ON "challenges" USING btree ("challenge_id");
  CREATE INDEX "challenges_policy_draft_idx" ON "challenges" USING btree ("policy_draft_id");
  CREATE INDEX "challenges_updated_at_idx" ON "challenges" USING btree ("updated_at");
  CREATE INDEX "challenges_created_at_idx" ON "challenges" USING btree ("created_at");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_frameworks_fk" FOREIGN KEY ("frameworks_id") REFERENCES "public"."frameworks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_board_circulars_fk" FOREIGN KEY ("board_circulars_id") REFERENCES "public"."board_circulars"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_annual_reports_fk" FOREIGN KEY ("annual_reports_id") REFERENCES "public"."annual_reports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_governance_objectives_fk" FOREIGN KEY ("governance_objectives_id") REFERENCES "public"."governance_objectives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_control_objectives_fk" FOREIGN KEY ("control_objectives_id") REFERENCES "public"."control_objectives"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_risk_appetite_statements_fk" FOREIGN KEY ("risk_appetite_statements_id") REFERENCES "public"."risk_appetite_statements"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_decision_logs_fk" FOREIGN KEY ("decision_logs_id") REFERENCES "public"."decision_logs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_audit_trail_entries_fk" FOREIGN KEY ("audit_trail_entries_id") REFERENCES "public"."audit_trail_entries"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_policy_agent_runs_fk" FOREIGN KEY ("policy_agent_runs_id") REFERENCES "public"."policy_agent_runs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_policy_documents_fk" FOREIGN KEY ("policy_documents_id") REFERENCES "public"."policy_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_policy_gap_analyses_fk" FOREIGN KEY ("policy_gap_analyses_id") REFERENCES "public"."policy_gap_analyses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_policy_drafts_fk" FOREIGN KEY ("policy_drafts_id") REFERENCES "public"."policy_drafts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_pipeline_runs_fk" FOREIGN KEY ("pipeline_runs_id") REFERENCES "public"."pipeline_runs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_challenges_fk" FOREIGN KEY ("challenges_id") REFERENCES "public"."challenges"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_frameworks_id_idx" ON "payload_locked_documents_rels" USING btree ("frameworks_id");
  CREATE INDEX "payload_locked_documents_rels_board_circulars_id_idx" ON "payload_locked_documents_rels" USING btree ("board_circulars_id");
  CREATE INDEX "payload_locked_documents_rels_annual_reports_id_idx" ON "payload_locked_documents_rels" USING btree ("annual_reports_id");
  CREATE INDEX "payload_locked_documents_rels_governance_objectives_id_idx" ON "payload_locked_documents_rels" USING btree ("governance_objectives_id");
  CREATE INDEX "payload_locked_documents_rels_control_objectives_id_idx" ON "payload_locked_documents_rels" USING btree ("control_objectives_id");
  CREATE INDEX "payload_locked_documents_rels_risk_appetite_statements_i_idx" ON "payload_locked_documents_rels" USING btree ("risk_appetite_statements_id");
  CREATE INDEX "payload_locked_documents_rels_decision_logs_id_idx" ON "payload_locked_documents_rels" USING btree ("decision_logs_id");
  CREATE INDEX "payload_locked_documents_rels_audit_trail_entries_id_idx" ON "payload_locked_documents_rels" USING btree ("audit_trail_entries_id");
  CREATE INDEX "payload_locked_documents_rels_policy_agent_runs_id_idx" ON "payload_locked_documents_rels" USING btree ("policy_agent_runs_id");
  CREATE INDEX "payload_locked_documents_rels_policy_documents_id_idx" ON "payload_locked_documents_rels" USING btree ("policy_documents_id");
  CREATE INDEX "payload_locked_documents_rels_policy_gap_analyses_id_idx" ON "payload_locked_documents_rels" USING btree ("policy_gap_analyses_id");
  CREATE INDEX "payload_locked_documents_rels_policy_drafts_id_idx" ON "payload_locked_documents_rels" USING btree ("policy_drafts_id");
  CREATE INDEX "payload_locked_documents_rels_pipeline_runs_id_idx" ON "payload_locked_documents_rels" USING btree ("pipeline_runs_id");
  CREATE INDEX "payload_locked_documents_rels_challenges_id_idx" ON "payload_locked_documents_rels" USING btree ("challenges_id");
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "payload_jobs_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "users_sessions" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "frameworks_controls" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "frameworks" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "board_circulars" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "annual_reports" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "governance_objectives_framework_mappings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "governance_objectives" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "governance_objectives_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "control_objectives_framework_references" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "control_objectives" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "risk_appetite_statements_framework_mappings" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "risk_appetite_statements" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "risk_appetite_statements_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "decision_logs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "audit_trail_entries" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "policy_agent_runs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "policy_documents" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "policy_gap_analyses_frameworks_affected" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "policy_gap_analyses" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "policy_gap_analyses_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "policy_drafts_sections_citations" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "policy_drafts_sections" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "policy_drafts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pipeline_runs_steps" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pipeline_runs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pipeline_runs_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "challenges" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "payload_kv" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "frameworks_controls" CASCADE;
  DROP TABLE "frameworks" CASCADE;
  DROP TABLE "board_circulars" CASCADE;
  DROP TABLE "annual_reports" CASCADE;
  DROP TABLE "governance_objectives_framework_mappings" CASCADE;
  DROP TABLE "governance_objectives" CASCADE;
  DROP TABLE "governance_objectives_rels" CASCADE;
  DROP TABLE "control_objectives_framework_references" CASCADE;
  DROP TABLE "control_objectives" CASCADE;
  DROP TABLE "risk_appetite_statements_framework_mappings" CASCADE;
  DROP TABLE "risk_appetite_statements" CASCADE;
  DROP TABLE "risk_appetite_statements_rels" CASCADE;
  DROP TABLE "decision_logs" CASCADE;
  DROP TABLE "audit_trail_entries" CASCADE;
  DROP TABLE "policy_agent_runs" CASCADE;
  DROP TABLE "policy_documents" CASCADE;
  DROP TABLE "policy_gap_analyses_frameworks_affected" CASCADE;
  DROP TABLE "policy_gap_analyses" CASCADE;
  DROP TABLE "policy_gap_analyses_rels" CASCADE;
  DROP TABLE "policy_drafts_sections_citations" CASCADE;
  DROP TABLE "policy_drafts_sections" CASCADE;
  DROP TABLE "policy_drafts" CASCADE;
  DROP TABLE "pipeline_runs_steps" CASCADE;
  DROP TABLE "pipeline_runs" CASCADE;
  DROP TABLE "pipeline_runs_rels" CASCADE;
  DROP TABLE "challenges" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_frameworks_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_board_circulars_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_annual_reports_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_governance_objectives_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_control_objectives_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_risk_appetite_statements_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_decision_logs_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_audit_trail_entries_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_policy_agent_runs_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_policy_documents_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_policy_gap_analyses_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_policy_drafts_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_pipeline_runs_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_challenges_fk";
  
  DROP INDEX "payload_locked_documents_rels_frameworks_id_idx";
  DROP INDEX "payload_locked_documents_rels_board_circulars_id_idx";
  DROP INDEX "payload_locked_documents_rels_annual_reports_id_idx";
  DROP INDEX "payload_locked_documents_rels_governance_objectives_id_idx";
  DROP INDEX "payload_locked_documents_rels_control_objectives_id_idx";
  DROP INDEX "payload_locked_documents_rels_risk_appetite_statements_i_idx";
  DROP INDEX "payload_locked_documents_rels_decision_logs_id_idx";
  DROP INDEX "payload_locked_documents_rels_audit_trail_entries_id_idx";
  DROP INDEX "payload_locked_documents_rels_policy_agent_runs_id_idx";
  DROP INDEX "payload_locked_documents_rels_policy_documents_id_idx";
  DROP INDEX "payload_locked_documents_rels_policy_gap_analyses_id_idx";
  DROP INDEX "payload_locked_documents_rels_policy_drafts_id_idx";
  DROP INDEX "payload_locked_documents_rels_pipeline_runs_id_idx";
  DROP INDEX "payload_locked_documents_rels_challenges_id_idx";
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "payload_jobs_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_payload_jobs_fk" FOREIGN KEY ("payload_jobs_id") REFERENCES "public"."payload_jobs"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_payload_jobs_id_idx" ON "payload_locked_documents_rels" USING btree ("payload_jobs_id");
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "frameworks_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "board_circulars_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "annual_reports_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "governance_objectives_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "control_objectives_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "risk_appetite_statements_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "decision_logs_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "audit_trail_entries_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "policy_agent_runs_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "policy_documents_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "policy_gap_analyses_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "policy_drafts_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "pipeline_runs_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "challenges_id";`)
}
