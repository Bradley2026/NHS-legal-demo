"use client";

import { useState, useRef, useCallback } from "react";
import SourceCard, { type SourceMeta } from "./SourceCard";

const EXAMPLE_QUERIES = [
  "What is the Trust's approach to defending unfair dismissal claims?",
  "What data protection obligations apply when engaging third-party software suppliers?",
  "What were the TUPE considerations in the recent service integration?",
  "How should the Trust respond to a procurement challenge during the standstill period?",
];

type Status = "idle" | "loading" | "streaming" | "done" | "error";

type Confidence = {
  rating: "green" | "amber" | "red";
  label: string;
  reason: string;
};

const CONFIDENCE_STYLES: Record<
  Confidence["rating"],
  { dot: string; text: string; bg: string; border: string }
> = {
  green: { dot: "#10B981", text: "#10B981", bg: "#F0FDF8", border: "#A7F3D0" },
  amber: { dot: "#F59E0B", text: "#B45309", bg: "#FFFBEB", border: "#FDE68A" },
  red: { dot: "#DC2626", text: "#DC2626", bg: "#FEF2F2", border: "#FECACA" },
};

function ConfidenceBadge({ confidence }: { confidence: Confidence }) {
  const s = CONFIDENCE_STYLES[confidence.rating];
  return (
    <div
      className="flex items-start gap-3 rounded-lg border px-4 py-3 transition-all duration-200 ease-out"
      style={{ backgroundColor: s.bg, borderColor: s.border }}
    >
      <span
        className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full"
        style={{ backgroundColor: s.dot }}
      />
      <div>
        <p
          className="text-xs font-semibold uppercase tracking-wider"
          style={{ color: s.text }}
        >
          {confidence.label}
        </p>
        <p className="mt-0.5 text-sm text-[#334155]/80">{confidence.reason}</p>
      </div>
    </div>
  );
}

export default function SearchInterface() {
  const [query, setQuery] = useState("");
  const [submittedQuery, setSubmittedQuery] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [response, setResponse] = useState("");
  const [sources, setSources] = useState<SourceMeta[]>([]);
  const [confidence, setConfidence] = useState<Confidence | null>(null);
  const [errorMsg, setErrorMsg] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const submit = useCallback(async (q: string) => {
    const trimmed = q.trim();
    if (!trimmed || status === "loading" || status === "streaming") return;

    setSubmittedQuery(trimmed);
    setStatus("loading");
    setResponse("");
    setSources([]);
    setConfidence(null);
    setErrorMsg("");

    try {
      const res = await fetch("/api/knowledge/stream", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: trimmed }),
      });

      if (!res.ok || !res.body) {
        const text = await res.text();
        setErrorMsg(text || "An error occurred. Please try again.");
        setStatus("error");
        return;
      }

      setStatus("streaming");

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      let sourcesRead = false;

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });

        if (!sourcesRead) {
          buffer += chunk;
          const nl = buffer.indexOf("\n");
          if (nl !== -1) {
            const sourcesLine = buffer.slice(0, nl);
            try {
              const parsed = JSON.parse(sourcesLine.replace("SOURCES:", ""));
              // Payload shape: { sources: SourceMeta[], confidence: Confidence }
              if (Array.isArray(parsed)) {
                setSources(parsed); // backwards-compatible fallback
              } else {
                if (Array.isArray(parsed.sources)) setSources(parsed.sources);
                if (parsed.confidence) setConfidence(parsed.confidence);
              }
            } catch {
              // Sources line malformed — continue without citations
            }
            const rest = buffer.slice(nl + 1);
            buffer = "";
            sourcesRead = true;
            if (rest) setResponse(rest);
          }
        } else {
          setResponse((prev) => prev + chunk);
        }
      }

      setStatus("done");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Network error. Please try again.");
      setStatus("error");
    }
  }, [status]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    submit(query);
  }

  function handleExample(q: string) {
    setQuery(q);
    submit(q);
  }

  function handleReset() {
    setQuery("");
    setSubmittedQuery("");
    setStatus("idle");
    setResponse("");
    setSources([]);
    setConfidence(null);
    setErrorMsg("");
    setTimeout(() => textareaRef.current?.focus(), 50);
  }

  const isActive = status !== "idle";

  return (
    <div className="space-y-6">
      {/* Query input */}
      <form onSubmit={handleSubmit}>
        <div className="rounded-lg border border-[#E2E8F0] bg-white p-1 shadow-sm focus-within:border-[#138989] focus-within:ring-2 focus-within:ring-[#138989]/20 transition-all">
          <textarea
            ref={textareaRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                submit(query);
              }
            }}
            placeholder="Ask a question about the Trust's prior legal advice…"
            rows={2}
            className="w-full resize-none rounded-md bg-transparent px-4 py-3 text-sm text-[#334155] placeholder:text-[#334155]/40 outline-none"
          />
          <div className="flex items-center justify-between px-3 pb-2">
            <span className="text-xs text-[#334155]/40">
              {adviceDocCount} advice documents · Press Enter to search
            </span>
            <button
              type="submit"
              disabled={!query.trim() || status === "loading" || status === "streaming"}
              className="rounded-md bg-[#138989] px-4 py-1.5 text-xs font-medium text-white transition-colors hover:bg-[#0f7070] disabled:opacity-40"
            >
              {status === "loading" || status === "streaming" ? "Searching…" : "Search"}
            </button>
          </div>
        </div>
      </form>

      {/* Empty state — example queries */}
      {!isActive && (
        <div>
          <p className="mb-3 text-xs font-medium uppercase tracking-wider text-[#334155]/40">
            Example queries
          </p>
          <div className="grid grid-cols-2 gap-3">
            {EXAMPLE_QUERIES.map((q) => (
              <button
                key={q}
                onClick={() => handleExample(q)}
                className="rounded-lg border border-[#E2E8F0] bg-white px-4 py-3 text-left text-sm text-[#334155]/70 transition-colors hover:border-[#138989]/40 hover:bg-[#F0FAFA] hover:text-[#1F3A5F]"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Active state — question + response + sources */}
      {isActive && (
        <div className="grid grid-cols-3 gap-6">
          {/* Response panel */}
          <div className="col-span-2 space-y-4">
            {/* Submitted question */}
            <div className="rounded-lg border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3">
              <p className="text-xs font-medium uppercase tracking-wider text-[#334155]/40 mb-1">
                Your question
              </p>
              <p className="text-sm text-[#1F3A5F] font-medium">{submittedQuery}</p>
            </div>

            {/* Confidence traffic light */}
            {confidence && <ConfidenceBadge confidence={confidence} />}

            {/* Response */}
            <div className="rounded-lg border border-[#E2E8F0] bg-white px-5 py-5">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-[#138989]" />
                <p className="text-xs font-semibold uppercase tracking-wider text-[#138989]">
                  Knowledge Centre
                </p>
                {status === "streaming" && (
                  <span className="ml-1 text-[10px] text-[#334155]/40 animate-pulse">
                    Synthesising…
                  </span>
                )}
              </div>

              {status === "loading" && (
                <div className="space-y-2">
                  {[80, 65, 90, 55, 70].map((w, i) => (
                    <div
                      key={i}
                      className="h-3 animate-pulse rounded bg-[#F1F5F9]"
                      style={{ width: `${w}%` }}
                    />
                  ))}
                </div>
              )}

              {(status === "streaming" || status === "done") && response && (
                <p className="whitespace-pre-wrap text-sm leading-relaxed text-[#334155]">
                  {response}
                  {status === "streaming" && (
                    <span className="ml-0.5 inline-block h-3.5 w-0.5 animate-pulse bg-[#138989]" />
                  )}
                </p>
              )}

              {status === "error" && (
                <p className="text-sm text-[#DC2626]">{errorMsg}</p>
              )}
            </div>

            {status === "done" && (
              <button
                onClick={handleReset}
                className="text-xs font-medium text-[#334155]/50 hover:text-[#138989] transition-colors"
              >
                ← Ask another question
              </button>
            )}
          </div>

          {/* Sources panel */}
          <div className="space-y-3">
            <p className="text-xs font-medium uppercase tracking-wider text-[#334155]/40">
              {sources.length > 0
                ? `${sources.length} source${sources.length !== 1 ? "s" : ""} referenced`
                : "Searching corpus…"}
            </p>
            {sources.length > 0 ? (
              sources.map((source, i) => (
                <SourceCard key={source.id} source={source} index={i} />
              ))
            ) : (
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="h-20 animate-pulse rounded-md bg-[#F1F5F9]"
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// Accessed at module level so the server-rendered count is consistent
const adviceDocCount = 12;
