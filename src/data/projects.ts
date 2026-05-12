import { Project, ProjectCategory } from '../types';

// Demo assets live under public/videos and public/posters and are referenced
// by Vite as root-relative paths, e.g. demoUrl: '/videos/<id>.mp4',
// posterUrl: '/posters/<id>.jpg'. Vite rewrites them for the configured base
// path at build time.

export const projects: Project[] = [
  {
    id: 'tech-diagnostics',
    category: 'Frontend',
    title: 'Tech Diagnostics',
    tag: 'Dashboard',
    oneLiner: 'AI-powered analytics platform for engineering leadership.',
    github: 'https://github.com/weaspire/tech-diagnostics',
    description: 'Engineering leaders used to stitch together Jira filters and status decks. Tech Diagnostics replaces that. It syncs Jira nightly, reconstructs bug SLA timing, and surfaces sprint velocity and quality score.',
    keyFeatures: [
      'Jira sync engine: Pulls every ticket and changelog entry nightly; reconstructs bug SLA timing from raw status history.',
      'Sprint metrics: Velocity, story-point delivery, and capacity — per squad and quarter.',
      'Bug analytics: Open bug counts, SLA breach trend, root-cause classification, and quality score.',
      'Data monitors: Scheduled SQL queries against production databases; alerts post to Slack with 1-click resolve.',
      'AI weekly reports: Pulls structured engineering data and writes an analyst-grade brief auto-delivered to leadership.',
      'Configurable targets: Quarter-by-quarter SLA, capacity, and quality targets set in admin.'
    ],
    demoUrl: '',
    year: '2024',
    readme: `
# Tech Diagnostics

Team Performance Analytics Dashboard - A monorepo containing a Laravel API backend and Quasar (Vue.js) frontend.

## Architecture
- **Backend:** Laravel API
- **Frontend:** Quasar SPA (Vue.js)
- **Data:** MySQL / PostgreSQL
    `
  },
  {
    id: 'support-ticket-reviewer',
    category: 'Automation',
    title: 'Support Ticket Reviewer',
    tag: 'Agent',
    oneLiner: 'Policy-driven agent for customer support reviews.',
    description: 'Customer support tickets used to wait while a senior agent manually figured out which team owns it, how urgent it is, and whether the description was clear enough to act on. This agent runs that first pass. It reads the ticket, fetches six policy documents from Confluence, checks the customer against a high-value client list, and pulls in any linked Slack thread for context.',
    keyFeatures: [
      'Live policy lookup: Pulls six routing and priority policies from Confluence on every run — they live as wiki pages anyone in ops can edit, not as code.',
      'Client awareness: Looks up the customer against an embedded high-value roster and adjusts priority before the AI runs.',
      'Slack context: When the ticket links to a Slack thread, reads it and folds the conversation into its analysis.',
      'AI-proposed updates: Asks Claude Sonnet to propose values for six ticket fields based on everything gathered.',
      'Human approval: Posts the proposal as a Jira comment for a human to accept or reject — never edits a ticket on its own.',
      'Self-correcting feedback loop: Engineers tag the agent (@Chip) with corrections; the agent stores them and uses them as examples in future triages.'
    ],
    demoUrl: '',
    year: '2024',
    readme: `
# Support Ticket Reviewer Agent

An n8n workflow that reviews CX support tickets in Jira and proposes
field updates for a human agent to accept or reject. Runs ~10 tickets
a day in production at Aspire.

## How it triggers

A CX L2 agent opens a CARE ticket in Jira and clicks **L2 Agent Review**
from the action menu. A Jira Automation rule POSTs to the n8n webhook
with the ticket key.

## What it does

1. **Fetches the ticket** from the Jira API, including all custom fields
   (KYB, Product Area, Useful Links, etc.).
2. **Validates** that Summary and Description are both present. If not,
   posts a comment listing the missing fields and stops.
3. **Pulls context** from six sources, all live:
   - PL1: Tribe & Squad Routing (Confluence)
   - PL2: Data Clarity Policy (Confluence)
   - PL3: Category & Sub-category Rules (Confluence)
   - PL4: Client Escalation Policy (Confluence)
   - PL5: Product Area List (Google Sheet)
   - PL7: CARE Prioritisation Policy (Confluence)
4. **Resolves the client segment** deterministically against an embedded
   1,695-entry high-value client roster (Q2 2026). High-value clients
   get a P1 priority override baked into the AI prompt before the call.
5. **Optionally enriches with Slack** — scans the ticket for a Slack
   thread URL and, if found, fetches the thread via the Aspiro bot and
   passes it to the AI as additional context.
6. **Calls Claude Sonnet 4** via OpenRouter to propose updates to six
   fields: Related Tribe, Sub-category, Client Escalation, Product
   Area, Priority, and Description Quality (plus optional description
   rewrite if Slack context added net-new info).
7. **Writes a resume URL** to a custom field on the ticket so Jira
   Automation can later POST \`accept\` or \`reject\` to resume the workflow.
8. **Posts a pre-approval comment** showing client segment, priority
   with confidence and reason, and per-field justifications.
9. **Pauses for up to 72h** waiting on the L2 agent's decision.

## On accept

Updates eight fields in a single Jira PUT:

- Related Tribe (customfield_10497)
- Sub-category (customfield_14115)
- Client Escalation (customfield_14638)
- Product Area (customfield_10209)
- Client Type HV/NA (customfield_12178)
- Priority Justification (customfield_10216)
- AI Review Status → 🟢 Accepted (customfield_20147)
- Jira priority (P0–P3)
- Description (only if a Slack-driven rewrite is present)

Then posts a confirmation comment showing each before→after.

## On reject

Sets AI Review Status → 🔴 Rejected, posts a rejection comment.
No fields updated. The L2 agent handles the ticket manually.

## The feedback loop

A reviewer can tag the bot's Jira account (\`@Chip\`) on a reviewed
ticket with a correction — for example, ""wrong tribe, this should
have routed to Cards"" or ""priority should be P1, this client is HV"".

A webhook handler routes \`comment_created\` events that mention
\`@Chip\` to a capture service. A Haiku parser extracts the correction
into a structured form (which field, what the right answer should have
been), persists it to a \`review_corrections\` table idempotently, and
posts an acknowledgement back on the ticket.

On the next run, a runtime helper pulls relevant corrections and
injects them into the prompt as few-shot examples. The agent absorbs
human judgment as runtime context — no code edits, no prompt redeploy.
Drift in policy pages or the high-value roster shows up as override
rate climbing; the corrections become the immediate fix.

## Stack

- n8n (workflow runtime, hosted)
- Jira Cloud (source of truth for tickets and trigger rules)
- Confluence (policy documents, fetched at runtime)
- Google Sheets (Product Area list)
- Slack (Aspiro bot, for thread context)
- OpenRouter → Anthropic Claude Sonnet 4

## Why it's structured this way

Every routing rule, classification rule, and priority rule lives in
Confluence as an editable page. The workflow fetches them on every
run. When ops or a CX lead changes a rule, the agent picks it up on
the next ticket — no deploy, no engineering ticket. Agent behavior
stays as a living document, owned by the people closest to the work.
    `
  },
  {
    id: 'bug-triaging-agent',
    category: 'Automation',
    title: 'Bug Triaging Agent',
    tag: 'Agent',
    oneLiner: 'Self-improving agent who triages and helps resolve bugs.',
    github: 'https://github.com/weaspire/titans',
    description: 'Every new bug used to sit untouched until an engineer picked it up — figuring out which team owns it, how serious it is, whether it\'s a duplicate, and sometimes skimming the codebase for a root-cause hint. This agent runs that first pass.',
    keyFeatures: [
      'Triage classification: Picks the team that owns the bug, scores how well it\'s described, and assigns a priority.',
      'Validity check: Determines whether the ticket is a real bug worth working — flags duplicates and "not a bug" cases.',
      'Root cause hypothesis: Downloads the relevant codebase and proposes where the bug probably lives, with suspected files.',
      'Graceful degradation: If root-cause analysis fails, the comment still ships with everything else — partial triage beats none.'
    ],
    demoUrl: '',
    year: '2024',
    readme: `
# Bug Triaging Agent (Triage Titan)

A titan on the Titans platform that triages every new bug filed in the PRD
Jira project. Triggered by a \`jira:issue_created\` webhook, runs in under
five minutes, posts a structured Jira comment plus field updates so the
engineer who opens the ticket finds it already triaged.

Built to replace the manual first pass: reading descriptions, deciding
which team owns the bug, judging whether it's actually a bug, hunting
for duplicates, and skimming the relevant repo for a root-cause hint.
Engineers were doing this in weekly triage meetings; the goal is to
make those meetings unnecessary.

## How the flow works

The pipeline is strictly linear — four shards, no branching:

1. **Hygiene** — fetches the ticket from Jira along with linked tickets
   and a JQL-shortlist of similar recent PRD bugs. One LLM call returns
   product area, priority (P0–P3), and a description-quality score.
2. **Validity** — judges whether the ticket is worth triaging further.
   Up to three LLM calls: dedup against Hygiene's shortlist, ""not a bug""
   detection against a seeded library of historical patterns (75-confidence
   floor), and a resolution recommendation if \`is_not_a_bug=true\`.
3. **RCA** — maps the product area to a GitHub repo, shallow-clones it,
   builds a guided file shortlist (40KB cap), and runs one LLM call to
   propose a root-cause hypothesis with suspected files and a fix
   direction. Soft-fails: if no repo matches or the clone fails, RCA
   returns DONE with \`rca_status='skipped'\` and Comment renders
   ""RCA unavailable"" instead of a hypothesis.
4. **Comment** — pure code, zero AI. Renders two Jira panels (field
   updates + analysis), posts the comment, writes six custom fields,
   applies the \`potential-duplicate\` label and issuelinks if Validity
   flagged a dupe, and transitions Bug PIC Review → Ready for Development.

Each shard reads from a per-run blackboard, calls infra (\`ctx.ai\`,
credentials, \`complete()\`), writes its declared output, and hands off.
All Jira side effects live in the Comment shard — one place to look
when debugging output.

## Idempotency

Two layers of defense:

- The webhook handler refuses to dispatch a second run for the same
  \`issue_key\` within 15 minutes — catches Jira's own retry storms.
- Before posting, the Comment shard fetches recent comments and looks
  for the panel marker (\`{panel:title=Triage Bot — Triage Results}\`)
  authored by the bot in the last 24h. If found, it returns the
  existing \`comment_id\` and skips both the comment POST and all field
  writes. After 24h, a re-trigger is treated as an intentional
  operator retry and produces a fresh comment.

## What's seeded vs fetched

- **Seeded** (in \`platform_config\`, manually re-seeded when it drifts):
  product-area list, repo map, priority policy, ""Not a Bug"" historical
  patterns. No runtime fetches.
- **Fetched** at runtime: the ticket itself, linked tickets, similar
  candidates via JQL, the matched GitHub repo (shallow clone), and
  any reviewer corrections from prior runs.

## Stack

- Titans platform (this repo) — orchestrator, shards, blackboard
- Jira Cloud — source of truth and trigger
- GitHub — shallow clone for RCA
- OpenRouter → Anthropic Claude (Sonnet for reasoning shards, Haiku
  for the feedback parser)
- Postgres — \`triage_corrections\`, \`platform_config\`, blackboard, runs
    `
  },
  {
    id: 'agent-factory',
    category: 'Automation',
    title: 'Agent Factory',
    tag: 'Agent',
    oneLiner: 'Contract-driven harness for building AI agents.',
    github: 'https://github.com/weaspire/titans',
    description: 'Most AI agents fail in soft ways — they wander off task, lose context, retry silently, or quietly degrade as the world changes. This platform turns "is the agent any good?" into checks that pass or fail.',
    keyFeatures: [
      'Guided build flow: A Claude Code skill (Forge) walks the operator across eight phases, from raw idea to deployed agent.',
      'Activation gate: An agent can\'t go live until every worker has passed a dry run, credentials are in place, and the design has been signed off.',
      'Quality guarantees: Eleven explicit rules — five for the build, six for runtime — that turn agent quality into pass/fail checks.',
      'Structured execution: Every worker returns a clear status (done / needs context / blocked); the system validates it before the next runs.',
      'Single console: Agents, credentials, connectors, and run history all live in one place.',
      'Living harness: Platform rules live as files the build skill reads each time, so the skill never goes stale.'
    ],
    demoUrl: '',
    year: '2024',
    readme: `
# Agent Factory (Titans Platform)

A platform for building, running, and observing production AI agents.
Internally, agents are called titans; the workers inside a titan are
called shards. The platform's job is to turn agent quality from a
qualitative aspiration into a set of measurable gates that every
titan must pass before it ships and every shard must pass on every run.

The build experience is driven by the **forge skill** — a Claude Code
skill that reads platform rules live from harness files at invocation
time and walks the operator through eight phases from raw vision to
deployed titan.

## The two guarantee sets

**Five Build Guarantees** govern how a titan is constructed:

1. Always Moving — something is visibly happening at every phase
2. Always Honest — no fake progress; green ticks only when verified
3. Always Recoverable — every failure has Retry / Skip / Modify
4. Always Interruptible — operator can steer at any moment
5. Always Transparent — raw output, token counts, and timing on demand

**Six Execution Guarantees** govern how a titan runs:

1. Always Structured — every shard returns a status envelope
2. Always Validated — mechanical review after every shard
3. Always Retried — \`NEEDS_CONTEXT\` and review failures auto-retry
4. Always Recorded — full lifecycle in the journal
5. Always Curated — each shard sees only what it needs
6. Always Escalated — \`BLOCKED\` shards escalate, never silently ignored

## The shard contract

Every shard implements the same Python signature:

\`\`\`python
def run(input_data: dict, credentials: dict) -> dict:
    return {"status": "DONE" | "NEEDS_CONTEXT" | "BLOCKED", "output": {...}, ...}
\`\`\`

Shards are isolated workers — no shared module state, no direct calls
to other shards. They read from and write to a per-run blackboard
that the orchestrator curates per shard so context stays small.

## The activation gate

Before a titan is allowed to go from build status to active, the
backend enforces:

- All shards have passed dry-run and auth-check tests
  (\`shard.config.test_result.passed = true\`)
- All required connectors have credentials in the DB
- Plan is non-empty

Any check failing blocks activation. There is no override.
    `
  },
  {
    id: 'voice-of-customer',
    category: 'Automation',
    title: 'Voice of Customer',
    tag: 'Agent',
    oneLiner: 'Multi-source agent for synthesising our Voice of Customer.',
    description: 'The Voice of Customer agent is a three-stage n8n pipeline. It normalises sources into a unified staging schema and applies four Confluence-hosted policies to cluster duplicate feedback.',
    keyFeatures: [
      'Multi-source ingestion: Pulls feedback from HubSpot, Intercom, NPS, and more.',
      'Unified staging schema: Normalises every source into a single 30-field sheet.',
      'AI clustering: Rows describing the same root issue land as one Jira ticket.',
      'Impact monetisation: Each ticket carries a Primary metric impact (e.g., Card TPV).',
      'Configurable rulebook: Four Confluence policy pages drive every decision.',
      'Audit trail: Every Jira ticket links back to the staging rows that produced it.'
    ],
    demoUrl: '',
    year: '2024',
    readme: `
# Voice of Customer

An AI-powered pipeline that consolidates customer feedback from seven sources into one Jira workflow.
    `
  },
  {
    id: 'product-suggestions-router',
    category: 'Automation',
    title: 'Product Suggestions Router',
    tag: 'Agent',
    oneLiner: 'Auto-routing agent for customer product feedback.',
    description: 'Hourly, it reads new rows, fetches the live product team routing matrix from Confluence, and asks Claude to parse the customer\'s submission into structured fields and classify which of fifteen product teams owns it.',
    keyFeatures: [
      'Field structuring: Asks Claude Sonnet to rewrite the customer\'s free-text into clean Improvement / Pain Point / Workaround prose.',
      'Team classification: Picks the team that owns the suggestion based on the live matrix — fifteen product domains to choose from.',
      'Live routing rules: Pulls the product team routing matrix from Confluence on every run.',
      'Slack handoff: Posts a formatted summary to #product-suggestions and @-mentions the owning Product Owner directly.',
      'Self-validating output: If Claude returns missing or malformed fields, retries the call before posting anything.',
      'Idempotent: Marks rows processed once posted — won\'t re-route a suggestion if the workflow runs again.'
    ],
    demoUrl: '',
    year: '2024',
    readme: `
# Product Suggestions Router

An n8n workflow that routes inbound customer product suggestions to the right product team and Product Owner via Slack — with no human in the routing loop.

## Trigger
Hourly schedule.

## Inputs
- **Master tab** of the Product Suggestions Google Sheet.
- **Tribe PICs tab** — a \`Team → Product Owner → Slack ID\` lookup.
- **PL1 routing matrix** — a Confluence page maintained by product ops.

## Flow
1. **Read** new rows from the Master tab.
2. **Fetch** context.
3. **For each unprocessed row:**
   - Call **Claude Sonnet 4** to structure and classify.
   - **Validate** JSON output.
   - **Look up** Slack PIC.
   - **Post** to Slack.
   - **Mark** row as processed.
    `
  },
  {
    id: 'daily-competitor-insights',
    category: 'Automation',
    title: 'Daily Competitor Insights',
    tag: 'Agent',
    oneLiner: 'Daily competitor watch that posts only when something matters.',
    description: 'This is a scheduled task that runs on Claude every day. It searches for news about Aspire\'s priority competitors and the broader SME fintech space, applying a ruthless quality filter.',
    keyFeatures: [
      'Daily scheduled scan: Runs once a day; web-search across the priority watchlist plus broader SME fintech.',
      'Six categories of material news: Product, pricing, expansion, fundraising, leadership, regulatory.',
      'Quality filter: Explicit include/exclude rules — direct competitive threats in; thought-leadership out.',
      'Silent on quiet days: If nothing material happened, the agent doesn\'t post.',
      'Executive-ready Slack output: 3–5 single-sentence bullets to #sg-competitor-insights with hyperlinked sources.'
    ],
    demoUrl: '',
    year: '2024',
    readme: `
# Daily Competitor Insights

A daily scheduled task running in claude.ai.

## Priority Watchlist
- Airwallex
- Brex
- Ramp
- Mercury
- YouTrip / YouBiz
- Revolut Business
    `
  },
  {
    id: 'chief-of-staff-agent',
    category: 'Automation',
    title: 'Chief of Staff Agent (WIP)',
    tag: 'Agent',
    oneLiner: 'Multi-source agent for executive workstream tracking.',
    github: 'https://github.com/zenf-star/cto-office',
    description: 'The CTO\'s office runs 28+ workstreams. This Claude Code agent maintains a per-stream tracker page in Confluence for every workstream, reading from Slack, Drive (meeting notes), Calendar, and existing canonical docs.',
    keyFeatures: [
      'Confluence as state surface: Each workstream gets its own page in CTO Office space, with canonical sections.',
      'Multi-MCP ingest: Reads from Slack channels, Drive (Gemini meeting notes), Google Calendar, and existing canonical docs.',
      'Five lifecycle skills: bootstrap-stream, backfill-stream, sync-state, build-brief, send-reminders.',
      'Mode-aware writes: Owned streams get full agent participation; monitored streams are read-and-flag only.',
      'Conservative defaults: Paraphrase don\'t quote, flag don\'t fabricate, human edits are sacred.',
      'Pre-meeting briefs: DMs the CoS a structured brief reflecting where we are and decisions needed today.'
    ],
    demoUrl: '',
    year: '2024',
    readme: `
# CTO Office — Project Brain

Persistent memory across Claude Code sessions. Help the CoS keep CTO Office workstreams properly tracked, documented, and meeting-ready.

## Operating principles
1. **Conservative on writes.**
2. **Flag, don't fabricate.**
3. **Human edits are sacred.**
4. **Idempotent.**
5. **Verify before write.**
    `
  },
  {
    id: 'project-documenter',
    category: 'Automation',
    title: 'Project Documenter',
    tag: 'Skill',
    oneLiner: 'Self-documenting agent for project portfolios.',
    github: 'https://github.com/zenf-star/claude-skills',
    description: 'This Claude Code agent takes any source (GitHub repo, n8n JSON, SKILL.md) and produces a complete portfolio entry. Every correction becomes a rule for future drafts.',
    keyFeatures: [
      'Multi-source intake: Reads GitHub repos, n8n JSON, SKILL.md, or written notes.',
      'CLAUDE.md as standard: Anatomies and voice rules live in one file the agent re-reads.',
      'Proposal-first workflow: Presents a draft table for approval before publishing.',
      'Self-improving rulebook: Corrections become rules that apply to the next draft.',
      'Sheet handoff: Approved entries are written to the master Google Sheet via JWT auth.',
      'Question discipline: Batched, targeted questions to minimize user friction.'
    ],
    demoUrl: '',
    year: '2024',
    readme: `
# Project Documenter

The webpage you're on right now? Every entry was drafted by this system.
    `
  },
  {
    id: 'tone-of-voice',
    category: 'Automation',
    title: 'Tone of Voice',
    tag: 'Skill',
    oneLiner: 'Self-improving voice skill for personal drafting.',
    github: 'https://github.com/zenf-star/claude-skills',
    description: 'Tone of Voice is a Claude Code skill that captures personal writing voice across Slack and LinkedIn. It self-corrects: every off-key draft becomes a new rule in the skill.',
    keyFeatures: [
      'Two voice profiles: Separate skills for Slack (internal) and LinkedIn (external).',
      'History-extracted: Voice profile built by feeding Claude past Slack threads and LinkedIn posts.',
      'Concrete rules: Openers, rhythms, and hedge phrases to avoid are explicitly defined.',
      'Anti-slop checklist: A "never says X" list caught before any draft ships.',
      'Hand-tuned: User adds new rules directly as the skill compounds with use.',
      'Drop-in skill: Loaded into Claude Code context whenever drafting a message.'
    ],
    demoUrl: '',
    year: '2024',
    readme: `
# Tone of Voice

A personal voice harness for Claude Code, composed of two paired skills — one for Slack and workplace messaging, one for LinkedIn and public-facing posts.
    `
  },
  {
    id: 'specs-writer',
    category: 'Automation',
    title: 'Specs Writer',
    tag: 'Skill',
    oneLiner: 'Standard-encoded writing skill for engineering-ready specs.',
    github: 'https://github.com/zenf-star/claude-skills',
    description: 'Specs Writer is a Claude Code skill that bundles the standard and applies it. It loads two Confluence policies and operates in two modes: write from scratch or improve an existing draft.',
    keyFeatures: [
      'Two modes: Write a spec from scratch (PM gives a brief), or improve an existing draft.',
      'Live standard: Loads the scoring rubric and writing standard from Confluence on every run.',
      'Self-scoring: Drafts are checked against 9 weighted dimensions before output.',
      'AI additions marked: Every line the skill adds is tagged [ADDED BY AI] for PM review.',
      'Fintech-aware: Hardcoded edge-case checklist for money-movement features.',
      'Engineering-ready output: Specs follow Aspire\'s required structure.'
    ],
    demoUrl: '',
    year: '2024',
    readme: `
# Specs Writer

A Claude Code skill that bundles Aspire's spec writing standard and applies it.

## Required Spec Structure
1. BACKGROUND (Problem, Solution, Impact)
2. REQUIREMENTS (Figma, User Stories, Considerations)
3. GOVERNANCE
    `
  },
  {
    id: 'product-researcher',
    category: 'Automation',
    title: 'Product Researcher',
    tag: 'Skill',
    oneLiner: 'Investment-grade research skill for new product opportunities.',
    github: 'https://github.com/zenf-star/claude-skills',
    description: 'Product Researcher is a Claude Code skill that produces a 9-section investment-grade report from a vague brief: market sizing, competitive landscape, regulatory scan, and financial case.',
    keyFeatures: [
      '9-section template: Executive Summary, Product Definition, Market Sizing, etc.',
      'Web search mandatory: Real data is the point. Every quantitative claim cites a source.',
      'Multi-geo regulatory scan: Checks license requirements for SG, HK, US, AU, NL, CA.',
      'Aspire-specific lenses: SMB segment, multi-geo footprint, fit with existing products.',
      'Build-vs-partner defaults: Recommends partner-first approach unless strongly justified.',
      'Kill criteria upfront: Defines what would make this a clear "no" early on.'
    ],
    demoUrl: '',
    year: '2024',
    readme: `
# New Product Research

Produce a structured, investment-grade research report for evaluating a new product
opportunity at Aspire.

## Report Structure
1. Executive Summary
2. Product Definition
3. Market Sizing
4. Competitive Landscape
5. Regulatory & Compliance
6. Go-To-Market Strategy
7. Financial Business Case
8. Risks & Open Questions
9. Recommendation & Next Steps
    `
  },
  {
    id: 'google-sheet-writer',
    category: 'Automation',
    title: 'Google Sheet Writer',
    tag: 'Skill',
    oneLiner: 'Give your agents the ability to write directly into Google Sheets.',
    github: 'https://github.com/zenf-star/claude-skills',
    description: 'This skill closes the gap between Claude chat and Google Sheets. It using a Python CLI wrapper and an inline auth pattern to hit the Google Sheets API v4 via a service-account JWT.',
    keyFeatures: [
      'Service-account auth: JWT-based access via a GCP service account — no human in the auth loop.',
      'CLI wrapper: A gsheets.py script with --read, --write, --append flags.',
      'Inline auth pattern: Documented Python snippet for direct Sheets API v4 calls.',
      'URL or ID input: Accepts the full sheet URL or a raw spreadsheet ID.',
      'One-time setup: Set an env var and share the sheet for persistent access.'
    ],
    demoUrl: '',
    year: '2024',
    readme: `
# Google Sheets Read/Write

Access Google Sheets via the Google Sheets API v4 using a service account for authentication.

## Prerequisites
- **Service account key**
- **Service account email shared as Editor**
    `
  },
  {
    id: 'memory-manager',
    category: 'Automation',
    title: 'Memory Manager',
    tag: 'Skill',
    oneLiner: 'Auto-warning skill for Claude Code context and cost.',
    github: 'https://github.com/zenf-star/claude-skills',
    description: 'Memory Manager is two UserPromptSubmit hooks that watch the session\'s token cache and fire graduated warnings. It detects when a long-coding command is invoked and prompts a switch to Sonnet.',
    keyFeatures: [
      'Three-stage warning: Fires at 75K, 100K (with handoff summary), and 150K tokens.',
      'Sonnet switch prompt: STOP-and-ASK switch to Sonnet 4.6 (5x cheaper) for routine work.',
      'Prompt-injection: Warning becomes a prompt the AI follows, not just a passive terminal message.',
      'JSONL-driven: Tails the session\'s transcript file to parse token counts.',
      'State-deduped: Flag file prevents re-firing within the same session.'
    ],
    demoUrl: '',
    year: '2024',
    readme: `
# Memory Manager

Two \`UserPromptSubmit\` hooks for Claude Code that govern runtime context and model use.
    `
  },
  {
    id: 'cards-for-agents',
    category: 'Frontend',
    title: 'Cards for Agents',
    tag: 'Design',
    oneLiner: 'Concept landing page for payments for AI agents.',
    github: 'https://github.com/zenf-frontend-projects/cards-for-agents-frontend',
    description: 'A concept landing page for a money layer aimed at AI agents — payment cards with signed mandates, MCP-native. Designed in Claude Design and hand-tuned.',
    keyFeatures: [
      'Built in Claude Design: Initial visual prototype produced then hand-tuned in HTML/CSS/JS.',
      'Live interactions: Animated mandate JSON in the hero and live authorizations ticker.',
      'Tweaks panel: Control surface lets a viewer toggle palette, mode, and density on the fly.',
      'SVG flow diagram: Responsive auth path visualization that re-layouts on resize.'
    ],
    demoUrl: 'https://zenf-frontend-projects.github.io/cards-for-agents-frontend/',
    year: '2024',
    readme: `
# Cards for Agents

Interactive details: animated mandate JSON in the hero, a live authorizations ticker, and an SVG flow diagram of the auth path.
    `
  },
  {
    id: 'kaki-socks',
    category: 'Frontend',
    title: 'Kaki Socks',
    tag: 'Design',
    oneLiner: 'Claude-built landing page for a vibrant streetwear sock brand.',
    github: 'https://github.com/zenf-frontend-projects/kaki-website',
    description: 'A friend was launching a sock brand and needed a landing page. Built end-to-end in Claude Code — single-page HTML/CSS/JS — with product visuals generated via Nano Banana Pro.',
    keyFeatures: [
      'Claude-built: HTML, CSS, copy, layout — all written end-to-end in Claude Code.',
      'Nano Banana imagery: Every product visual and hero generated via Nano Banana Pro.',
      'Single-page, no build: Embedded CSS/JS in one HTML file, deployed via GitHub Pages.',
      'Heritage meets streetwear: Brand voice does the heavy lifting for the aesthetic.'
    ],
    demoUrl: 'https://zenf-frontend-projects.github.io/kaki-website/',
    year: '2024',
    readme: `
# Kaki Socks

Single-page website for a streetwear soap brand.
    `
  }
];
