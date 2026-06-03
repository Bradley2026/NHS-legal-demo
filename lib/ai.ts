import Anthropic from "@anthropic-ai/sdk";
import type { AdviceDocument } from "@/data/advice-docs";

export const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export const CLAUDE_MODEL = "claude-sonnet-4-6";

// Score a document against a free-text query using keyword matching.
// Weights: title match (3), tag match (2), summary match (1).
function scoreDocument(doc: AdviceDocument, query: string): number {
  const q = query.toLowerCase();
  const words = q.split(/\W+/).filter((w) => w.length > 3);
  let score = 0;
  const title = doc.title.toLowerCase();
  const summary = doc.summary.toLowerCase();
  for (const word of words) {
    if (title.includes(word)) score += 3;
    if (doc.tags.some((t) => t.toLowerCase().includes(word))) score += 2;
    if (summary.includes(word)) score += 1;
  }
  // Also check full tag set against query fragments
  for (const tag of doc.tags) {
    if (q.includes(tag.toLowerCase())) score += 2;
  }
  return score;
}

export function findRelevantDocs(
  query: string,
  docs: AdviceDocument[],
  topN = 4
): AdviceDocument[] {
  return docs
    .map((doc) => ({ doc, score: scoreDocument(doc, query) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topN)
    .map(({ doc }) => doc);
}

// ---------------------------------------------------------------------------
// Confidence assessment — the Knowledge Centre traffic-light system.
//
// The rating tells the user whether the surfaced advice is safe to rely on
// (green), should be treated with caution (amber), or whether fresh external
// legal advice should be obtained (red). It combines three signals: how
// strongly the corpus matched the query, how recent the supporting advice is,
// and whether the answer draws on more than one practice area.
//
// Recency windows are deliberately generous because core NHS legal principles
// (Equality Act 2010, Employment Rights Act 1996, etc.) are slow to change.
// Adjust the constants below to tune the system.
// ---------------------------------------------------------------------------

// Advice within this age is treated as current.
const CURRENT_WITHIN_MONTHS = 48;
// Advice older than this is treated as stale and no longer dependable.
const STALE_AFTER_MONTHS = 60;
// Top-document score at or above this is treated as a strong, on-point match.
const STRONG_MATCH_SCORE = 5;
// A document only counts toward the practice-area spread if its score is at
// least this fraction of the top match. This prevents weak, incidental keyword
// hits (e.g. a stray "data" match) from being treated as a genuine reliance on
// a second practice area.
const SUBSTANTIVE_SCORE_RATIO = 0.4;

export type ConfidenceRating = "green" | "amber" | "red";

export type Confidence = {
  rating: ConfidenceRating;
  label: string;
  reason: string;
};

function monthsSince(dateStr: string, now: Date): number {
  const then = new Date(dateStr);
  if (Number.isNaN(then.getTime())) return Number.POSITIVE_INFINITY;
  return (
    (now.getFullYear() - then.getFullYear()) * 12 +
    (now.getMonth() - then.getMonth())
  );
}

export function assessConfidence(
  query: string,
  relevant: AdviceDocument[],
  now: Date = new Date()
): Confidence {
  // No meaningful match in the corpus.
  if (relevant.length === 0) {
    return {
      rating: "red",
      label: "Seek fresh advice",
      reason:
        "No current advice on file addresses this question. Obtain fresh legal advice before proceeding.",
    };
  }

  const scored = relevant.map((d) => ({
    doc: d,
    score: scoreDocument(d, query),
  }));
  const topScore = scored[0].score;
  // Age of the most recent supporting document.
  const newestAge = Math.min(...relevant.map((d) => monthsSince(d.date, now)));
  // Only documents that materially contributed to the answer count toward the
  // practice-area spread — weak incidental keyword hits are ignored.
  const substantive = scored.filter(
    ({ score }) => score >= topScore * SUBSTANTIVE_SCORE_RATIO
  );
  const departments = new Set(substantive.map(({ doc }) => doc.department));
  const crossPracticeArea = departments.size > 1;
  const strongMatch = topScore >= STRONG_MATCH_SCORE;

  // The most relevant advice is stale, or the match is weak and ageing.
  if (newestAge > STALE_AFTER_MONTHS) {
    return {
      rating: "red",
      label: "Seek fresh advice",
      reason:
        "The only matching advice is more than five years old and may no longer reflect current law. Obtain fresh legal advice before proceeding.",
    };
  }

  // Caution conditions: weaker match, ageing advice, or a cross-practice-area answer.
  if (!strongMatch || newestAge > CURRENT_WITHIN_MONTHS || crossPracticeArea) {
    const reasons: string[] = [];
    if (newestAge > CURRENT_WITHIN_MONTHS) {
      reasons.push("the most relevant advice is over four years old");
    }
    if (crossPracticeArea) {
      reasons.push(
        "the answer draws on documents from more than one practice area"
      );
    }
    if (!strongMatch) {
      reasons.push("the corpus match is partial rather than directly on point");
    }
    return {
      rating: "amber",
      label: "Proceed with caution",
      reason: `Proceed with caution — ${reasons.join("; ")}. Verify against current guidance before acting.`,
    };
  }

  // Strong, on-point match backed by reasonably recent advice.
  return {
    rating: "green",
    label: "Safe to rely on",
    reason:
      "This question is directly addressed by recent advice on file and is safe to rely on.",
  };
}

export const SYSTEM_PROMPT = `You are the Knowledge Centre for Anytown NHS Trust — an AI assistant that helps the Trust's Finance and Governance team quickly find and understand relevant prior legal advice.

You will be given summaries of advice documents from the Trust's legal corpus that are relevant to the question asked. Your role is to synthesise the information from these documents into a clear, practical response.

Follow these rules:
- Respond in formal British English.
- Be concise and direct. Use numbered points when listing multiple considerations.
- Cite your sources using [1], [2] etc., corresponding to the numbered documents provided.
- If the provided documents do not fully address the question, say so clearly and indicate what further advice may be needed.
- Do not speculate or provide novel legal advice beyond what the documents contain.
- Do not use markdown formatting such as asterisks for bold or hash symbols for headers. Use plain text with numbered points.`;
