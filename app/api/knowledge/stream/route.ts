import { anthropic, CLAUDE_MODEL, SYSTEM_PROMPT, findRelevantDocs, assessConfidence } from "@/lib/ai";
import { adviceDocs } from "@/data/advice-docs";
import { firms } from "@/data/firms";

export async function POST(request: Request) {
  const { query } = await request.json() as { query: string };

  if (!query?.trim()) {
    return new Response("Query is required", { status: 400 });
  }

  if (!process.env.ANTHROPIC_API_KEY) {
    return new Response("ANTHROPIC_API_KEY is not configured", { status: 503 });
  }

  const relevant = findRelevantDocs(query, adviceDocs, 4);

  // Build numbered context block
  const context = relevant
    .map((doc, i) => {
      const firm = firms.find((f) => f.id === doc.firmId);
      return `[${i + 1}] ${doc.title}
Firm: ${firm?.name ?? doc.firmId} | Department: ${doc.department} | Date: ${doc.date}
${doc.summary}`;
    })
    .join("\n\n");

  const userMessage = relevant.length > 0
    ? `Question: ${query}\n\nRelevant documents from the Trust's legal corpus:\n\n${context}`
    : `Question: ${query}\n\nNo closely matching documents were found in the Trust's legal corpus. Please indicate this and suggest what type of advice the Trust may need to obtain.`;

  const encoder = new TextEncoder();

  // Minimal source metadata to send to client
  const sourceMeta = relevant.map((doc) => ({
    id: doc.id,
    title: doc.title,
    department: doc.department,
    firmId: doc.firmId,
    date: doc.date,
  }));

  // Traffic-light confidence rating for this query.
  const confidence = assessConfidence(query, relevant);

  const stream = new ReadableStream({
    async start(controller) {
      // First: emit sources and confidence as a prefixed JSON line
      controller.enqueue(
        encoder.encode(
          `SOURCES:${JSON.stringify({ sources: sourceMeta, confidence })}\n`
        )
      );

      try {
        const claudeStream = await anthropic.messages.stream({
          model: CLAUDE_MODEL,
          max_tokens: 1024,
          system: SYSTEM_PROMPT,
          messages: [{ role: "user", content: userMessage }],
        });

        for await (const event of claudeStream) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Unknown error";
        controller.enqueue(encoder.encode(`\n\n[Error: ${msg}]`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "X-Content-Type-Options": "nosniff",
    },
  });
}
