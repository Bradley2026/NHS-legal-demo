# Claude Code task: add a peer benchmarking section to the demo web app

## Goal
Add a new **Benchmarking** section to the existing NHS Legal Management Platform demo web app. It visualises total external legal spend across peer NHS organisations over three financial years (FY22/23, FY23/24, FY24/25) and clearly shows where **Anytown NHS Trust** (our demo organisation) sits within that range. All peer organisations must be **anonymised** — shown only as "Trust 1", "Trust 2", "ICB 1" etc. Real organisation names must never appear anywhere: not on screen, not in tooltips, not in code comments, not in the committed data file.

## Before you start
1. Inspect the existing codebase first. Identify the framework (React / plain HTML+JS / etc.), the charting library already in use, the existing colour tokens / theme, and how other sections (e.g. the Spend Intelligence dashboard) are structured and routed. **Match the existing conventions, component patterns, and styling** — this section should look native to the app, not bolted on.
2. The data below is **already extracted, cleaned and anonymised from our FOI tracker**. Do **not** read or import any spreadsheet. Use the dataset exactly as given. In particular, do not "fix" the `null` values or the excluded row — those are deliberate (see Data notes).

## The data
Embed this as the data source for the section (e.g. a local `benchmarkData.js`/`.json` module). Amounts are total external legal spend in GBP per financial year. `null` means no data was returned for that year.

```json
[
  { "id": "Anytown NHS Trust", "category": "Provider", "type": "Acute – Medium", "fy2223": 312000, "fy2324": 382000, "fy2425": 450000, "isAnytown": true, "excludeFromBenchmark": false },
  { "id": "Trust 1",  "category": "Provider", "type": "Mental Health",  "fy2223": 1053000, "fy2324": 989000,  "fy2425": 1263000, "isAnytown": false, "excludeFromBenchmark": false },
  { "id": "Trust 2",  "category": "Provider", "type": "Acute – Medium", "fy2223": 304715,  "fy2324": 402752,  "fy2425": 368297,  "isAnytown": false, "excludeFromBenchmark": false },
  { "id": "Trust 3",  "category": "Provider", "type": "Acute – Large",  "fy2223": 691210,  "fy2324": 803930,  "fy2425": 944570,  "isAnytown": false, "excludeFromBenchmark": false },
  { "id": "Trust 4",  "category": "Provider", "type": "Mental Health",  "fy2223": 783207,  "fy2324": 208252,  "fy2425": 409025,  "isAnytown": false, "excludeFromBenchmark": false },
  { "id": "Trust 5",  "category": "Provider", "type": "Specialist",     "fy2223": null,    "fy2324": 344880,  "fy2425": 289400,  "isAnytown": false, "excludeFromBenchmark": false },
  { "id": "Trust 6",  "category": "Provider", "type": "Acute – Large",  "fy2223": 1007460, "fy2324": null,    "fy2425": 1271060, "isAnytown": false, "excludeFromBenchmark": false },
  { "id": "Trust 7",  "category": "Provider", "type": "Mental Health",  "fy2223": 314901,  "fy2324": 472702,  "fy2425": 138417,  "isAnytown": false, "excludeFromBenchmark": false },
  { "id": "Trust 8",  "category": "Provider", "type": "Mental Health",  "fy2223": 299138,  "fy2324": 357282,  "fy2425": 368652,  "isAnytown": false, "excludeFromBenchmark": false },
  { "id": "Trust 9",  "category": "Provider", "type": "Acute – Medium", "fy2223": 391560,  "fy2324": 370950,  "fy2425": 444040,  "isAnytown": false, "excludeFromBenchmark": false },
  { "id": "Trust 10", "category": "Provider", "type": "Acute – Medium", "fy2223": 284508,  "fy2324": 316998,  "fy2425": 393143,  "isAnytown": false, "excludeFromBenchmark": false },
  { "id": "Trust 11", "category": "Provider", "type": "Acute – Large",  "fy2223": 615000,  "fy2324": 872000,  "fy2425": 450000,  "isAnytown": false, "excludeFromBenchmark": false },
  { "id": "Trust 12", "category": "Provider", "type": "Acute – Large",  "fy2223": 1096000, "fy2324": 942000,  "fy2425": 1094000, "isAnytown": false, "excludeFromBenchmark": false },
  { "id": "Trust 13", "category": "Provider", "type": "Mental Health",  "fy2223": 411940,  "fy2324": 561336,  "fy2425": 687459,  "isAnytown": false, "excludeFromBenchmark": false },
  { "id": "ICB 1",    "category": "ICB", "type": "ICB", "fy2223": 222000, "fy2324": 231000, "fy2425": 416000, "isAnytown": false, "excludeFromBenchmark": false },
  { "id": "ICB 2",    "category": "ICB", "type": "ICB", "fy2223": 280000, "fy2324": 418000, "fy2425": 448000, "isAnytown": false, "excludeFromBenchmark": false },
  { "id": "ICB 3",    "category": "ICB", "type": "ICB", "fy2223": 574970, "fy2324": 910552, "fy2425": 559977, "isAnytown": false, "excludeFromBenchmark": false },
  { "id": "ICB 4",    "category": "ICB", "type": "ICB", "fy2223": 489000, "fy2324": 1576000, "fy2425": 1570000, "isAnytown": false, "excludeFromBenchmark": false }
]
```

## Data notes (do not alter)
- `null` = the organisation did not return a figure for that year. **Exclude nulls from any statistic for that year** and render them as a gap in trend lines — never plot or count them as £0.
- `excludeFromBenchmark: true` would mark an organisation whose return is not comparable, to be omitted from all range/percentile/median calculations. **No organisation is currently flagged** — keep the field and the logic in place so a non-comparable return can be excluded later by setting this flag.
- `Anytown NHS Trust` is our demo organisation, not a peer. Always exclude it from the peer statistics (min / quartiles / median / max / percentile base) — it is plotted *against* the peer range, never *inside* it.
- **Anytown's figures are a placeholder aligned to the existing demo dashboard (~£450k in FY24/25).** Pull them from a single named constant so they are easy to change; if the app already holds Anytown's spend totals elsewhere, source them from there instead so the benchmarking view and the dashboard always agree.

## What to build
A Benchmarking section/route containing the following, top to bottom:

**1. Cohort filter (controls).** Let the user choose which peer cohort Anytown is compared against. Default to **like-for-like**: Provider trusts only (since Anytown is a provider). Options:
   - All organisations
   - Providers only *(default)*
   - ICBs only
   - (optional, if easy) sub-filter providers by type: Acute, Mental Health, Specialist
   - A year selector for the range chart (FY22/23 / FY23/24 / FY24/25), defaulting to FY24/25 (latest).
   All statistics and charts must recompute from the selected cohort and exclude Anytown, nulls, and `excludeFromBenchmark` rows.

**2. Positioning summary (headline cards).** For the selected year and cohort, show where Anytown sits:
   - Anytown's spend for the year.
   - Anytown's **percentile / rank** within the peer cohort (e.g. "Lower than 8 of 13 peers" and/or "≈ 35th percentile").
   - Variance vs the **peer median** (£ and %).
   Keep the language neutral — this is about *visibility of position*, not a judgement that higher or lower is good or bad.

**3. Range chart — the centrepiece ("where they sit in the range").** For the selected year, plot every included peer across a single spend axis so the spread is obvious, with Anytown highlighted distinctly. A **horizontal dot/strip plot** or a **sorted horizontal bar chart** both work — pick whichever fits the existing chart library. Requirements:
   - Mark **min, lower quartile, median, upper quartile, max** clearly (e.g. a box/whisker overlay or reference lines).
   - Render **Anytown as a bold, contrasting marker/bar** with a direct label, visually separated from the muted peer markers.
   - Tooltips show the anonymised id, type, and the £ value only.

**4. Three-year trend chart.** A multi-year line/area chart across FY22/23 → FY24/25 showing:
   - **Anytown** as a bold highlighted line.
   - The **peer median** line, and ideally a shaded **interquartile (Q1–Q3) band** behind it, recomputed per year from the selected cohort.
   - Optionally faint individual peer lines behind, but keep Anytown and the median clearly dominant.
   - Lines must break (gap) across years where a peer has `null`.

**5. Supporting table.** A compact table of the cohort summary statistics per year (n, min, Q1, median, Q3, max) plus Anytown's value and percentile per year. Anytown's row visually highlighted.

## Calculation rules
- Percentiles/quartiles: compute over the included peer set only (exclude Anytown, nulls for that year, and `excludeFromBenchmark` rows). Use a standard linear-interpolation percentile; state the method in a code comment.
- "n" shown anywhere must reflect the actual count of peers with data in that year/cohort, since nulls reduce it.
- Currency formatting: GBP, no decimals, thousands separators (e.g. £450,000); abbreviate axis ticks as £1.0m / £450k where it aids readability.

## Design / theme
Match the existing app theme. If you need a fallback palette, use the deck's: deep navy `#1f3a5f` for primary/headers, teal `#1a7f8e` as secondary, with muted grey for peer markers and a single strong accent (teal or amber `#e8902b`) reserved exclusively for **Anytown** so it pops against the peer range. Light background, generous whitespace, consistent with the existing dashboard. Make it responsive.

## Acceptance checks
- No real organisation name appears anywhere in the rendered output or source.
- Changing the cohort filter and year recomputes the cards, both charts, and the table consistently.
- Nulls never appear as £0; ICB 4 is absent from stats unless explicitly toggled in.
- Anytown is always visually distinct and never counted within the peer statistics.
- Section styling is indistinguishable in quality and theme from the existing Spend Intelligence dashboard.
