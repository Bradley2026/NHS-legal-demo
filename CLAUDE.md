# NHS Legal Management Platform — Demo Project

This file is your project's permanent context. Claude Code reads it at the start of every session. Keep it accurate and concise; update it when project decisions change.

---

## Project context

We are building a **sales demo** for an NHS Legal Spend Management Platform — a web application designed to be shown to NHS Directors of Finance and Company Secretaries during 30-minute prospect meetings. The product has two integrated modules: **Spend Intelligence** (invoice analysis, rate benchmarking, panel management) and **Knowledge Centre** (AI-powered legal advice retrieval and synthesis).

This demo is **not** a production system. It does not have real authentication, real multi-tenancy, real invoice ingestion, or persistent user data. It simulates a single fictional NHS Trust convincingly enough to support a sales conversation. Where the real product would have complex backend infrastructure, the demo uses well-crafted mock data. Where the real product would have AI behind every interaction, the demo has AI in a few carefully chosen "wow" moments and pre-baked content elsewhere.

The audience for the demo is senior, non-technical, NHS-experienced finance and governance leaders. The product needs to look polished, feel responsive, and use language that resonates with NHS terminology — not Silicon Valley terminology.

---

## Demo persona

The fictional Trust shown throughout the demo is **Anytown NHS Trust**, an acute Trust in the North of England with approximately £1.4b annual turnover and 12,000 staff. Its current annual advisory legal spend is roughly £950,000, distributed across Employment (largest), Healthcare, Governance & Public Law, Primary Care, Contract & Commercial, Mental Health, and Property & Estates.

Whenever the project needs example data, names, or scenarios, default to "Anytown NHS Trust" unless explicitly told otherwise. This keeps the demo internally consistent.

Panel firms used in the demo are fictional. Default names: **Hartwell & Vine LLP**, **Bramley Sterling**, **Marston Carey**, **Penrose Bell**. Do not use names of real NHS panel firms.

---

## Tech stack — these decisions are made

Do not propose alternatives unless explicitly asked. Stack stability is more important than any individual technical choice at this stage.

- **Framework:** Next.js (App Router), TypeScript
- **Styling:** Tailwind CSS, shadcn/ui components
- **Charts:** Recharts
- **AI:** Anthropic Claude API directly (model: `claude-sonnet-4-5` or current Sonnet — verify before any new integration). Used only in the Knowledge Centre, not in Spend Intelligence.
- **State:** React Server Components where possible; client components only where interactivity requires it
- **Data:** Static TypeScript files (`/data/*.ts`) for all mock data — no database, no API mocking layer
- **Hosting:** Vercel
- **Auth:** Single shared password protecting the entire app via middleware (Vercel password protection or simple custom middleware) — no real user accounts
- **Repo:** GitHub, deployed via Vercel's GitHub integration

---

## Brand and design system

The product's visual language is **professional, calm, NHS-credible, not flashy**. It should feel closer to a Bank of England report than a SaaS landing page. Senior NHS leaders are sceptical of products that look like Silicon Valley toys; they trust products that look like considered institutional tools.

**Colours** (extend Tailwind config to include these):
- `navy` (primary): `#1F3A5F` — used for headers, primary navigation, headline numbers
- `teal` (accent): `#138989` — used for module accents, secondary highlights, the Knowledge Centre brand
- `slate` (neutral text): `#334155`
- `bg` (page background): `#F8FAFC`
- `card` (card background): `#FFFFFF`
- `border`: `#E2E8F0`
- `success`: `#10B981` (Green traffic light)
- `warning`: `#F59E0B` (Amber traffic light)
- `danger`: `#DC2626` (Red traffic light, rate variance alerts)

**Typography:**
- Headings: a transitional serif — use **Source Serif 4** (Google Fonts) for `<h1>` through `<h3>`, weight 600
- Body: **Inter** (Google Fonts), weight 400 for body, 500 for UI elements, 600 for emphasis
- Numbers (headline figures, charts, tables): Inter with `font-variant-numeric: tabular-nums`

**Layout principles:**
- Generous whitespace — never cram
- Card-based information architecture — every distinct concept in its own card
- Tables and data grids should look like a finance report: thin rules, right-aligned numbers, subtle row hover
- Animations: subtle and quick (150-200ms ease-out transitions). Never bouncy, never long.

---

## File structure

```
/app
  /(authed)              # Routes protected by demo password
    /dashboard           # Spend Intelligence main page
    /panel-firms         # Panel firm management
    /benchmarking        # Rate benchmarking detail
    /reports             # Reports and exports
    /knowledge           # Knowledge Centre
    layout.tsx           # Top nav, sidebar, page shell
  /login                 # Demo password gate
  layout.tsx             # Root layout, fonts, global styles
  globals.css
/components
  /ui                    # shadcn/ui components (auto-generated)
  /charts                # Reusable Recharts wrappers
  /spend                 # Spend Intelligence-specific components
  /knowledge             # Knowledge Centre-specific components
/data
  invoices.ts            # Mock invoice data for Anytown
  firms.ts               # Panel firm list and rate schedules
  departments.ts         # Trust departments and budget data
  advice-docs.ts         # Sample legal advice documents (full text)
  benchmarks.ts          # Anonymised peer benchmark data
/lib
  utils.ts               # Shared utilities, formatters
  ai.ts                  # Claude API client and RAG helpers
  embeddings.json        # Pre-computed embeddings for advice docs (built once)
/scripts
  build-embeddings.ts    # Run once to embed the advice corpus
CLAUDE.md
README.md
```

Stick to this layout. Do not invent new top-level folders without prompting.

---

## Coding conventions

- TypeScript everywhere. No `any` unless genuinely unavoidable; prefer `unknown` and narrow.
- Server components by default; mark client components with `"use client"` only when interactivity demands it (charts, forms, dialogs).
- Use shadcn/ui components instead of building from scratch. Add new ones via the shadcn CLI.
- Currency formatting: use a single `formatCurrency()` utility in `/lib/utils.ts` — display GBP with thousands separators, no decimals for amounts >= £1,000 (£347,400), two decimals below (£8.50).
- Dates: format as "16 January 2025" in body copy, "16 Jan 25" in dense tables. Use `date-fns`, not `Moment`.
- File names: kebab-case for files, PascalCase for components.
- No external API calls during page render except the deliberate Claude API calls in the Knowledge Centre.

---

## Copy and voice

The voice of the product matches David's existing materials (business plan, deck). Characteristics:

- **British English spelling and phrasing.** "Organisation" not "organization". "Whilst" is fine. "Per cent" preferred over "%".
- **Formal but warm.** "Your organisation" not "you guys". "Across the trust" not "across the org".
- **Numbers do the talking.** Where a metric, percentage, or pound figure can replace a marketing adjective, use the figure.
- **No exclamation marks. No emojis. No "amazing", "awesome", "great", "easy".**
- **NHS terminology used correctly.** "Trust", "ICB", "panel firm", "matter", "instruction", "advisory", "Co Sec", "DoF", "audit committee".

When writing UI copy that doesn't have a definitive source, draft it then ask whether to adjust.

---

## Demo data

The synthetic dataset is being prepared separately. When you encounter a placeholder for data that doesn't yet exist, leave a clear `TODO:` comment with what's needed (e.g. `// TODO: Replace with real advice doc content from David`) rather than inventing detail that may contradict what's coming.

When inventing fictional data is necessary for a component to render, use realistic NHS-shaped values:
- Hourly rates: £180 (paralegal) to £580 (partner)
- Invoice values: typically £800 to £18,000, occasionally £40,000+ for complex matters
- Matter durations: 2 weeks to 9 months
- Firm names: only use the four fictional names listed above

---

## Things to avoid

- **Do not use real NHS Trust names.** "Anytown NHS Trust" only.
- **Do not use real panel firm names.** Use the fictional ones above.
- **Do not generate fake legal advice content.** Where advice doc content is needed, use placeholder text and flag for David to provide the real synthetic content.
- **Do not propose alternative tech choices** unless asked. The stack is decided.
- **Do not implement real authentication, real multi-tenancy, or persistent user state.** This is a demo.
- **Do not make the UI "fun" or "playful".** Senior NHS leaders read this as unprofessional. Calm, considered, institutional.
- **Do not add features beyond what's been planned.** Scope creep on a sales demo is the enemy of shipping. If something seems missing, ask before building.

---

## When in doubt

If a decision affects the architecture, the demo flow, the data model, or the brand, **stop and ask** before implementing. If it's a pure implementation detail (which utility function to use, how to lay out a single component internally, naming a variable), use your judgement and move on.

Always prefer to ship a working, smaller version and iterate, over a perfect version that takes three times as long.
