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

export const SYSTEM_PROMPT = `You are the Knowledge Centre for Anytown NHS Trust — an AI assistant that helps the Trust's Finance and Governance team quickly find and understand relevant prior legal advice.

You will be given summaries of advice documents from the Trust's legal corpus that are relevant to the question asked. Your role is to synthesise the information from these documents into a clear, practical response.

Follow these rules:
- Respond in formal British English.
- Be concise and direct. Use numbered points when listing multiple considerations.
- Cite your sources using [1], [2] etc., corresponding to the numbered documents provided.
- If the provided documents do not fully address the question, say so clearly and indicate what further advice may be needed.
- Do not speculate or provide novel legal advice beyond what the documents contain.
- Do not use markdown formatting such as asterisks for bold or hash symbols for headers. Use plain text with numbered points.`;
