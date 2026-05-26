"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(false);
    setLoading(true);

    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/dashboard");
    } else {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F8FAFC]">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <h1
            className="text-2xl font-semibold text-[#1F3A5F] tracking-tight"
            style={{ fontFamily: "var(--font-source-serif-4)" }}
          >
            NHS Legal Management Platform
          </h1>
          <p className="mt-2 text-sm text-[#334155]/70">Anytown NHS Trust</p>
        </div>

        <div className="rounded-lg border border-[#E2E8F0] bg-white px-8 py-8 shadow-sm">
          <h2 className="mb-6 text-base font-semibold text-[#1F3A5F]">
            Sign in to continue
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-[#334155]"
              >
                Access code
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#334155] outline-none transition-colors focus:border-[#138989] focus:ring-2 focus:ring-[#138989]/20"
                autoComplete="current-password"
                required
              />
              {error && (
                <p className="mt-1.5 text-xs text-[#DC2626]">
                  Incorrect access code. Please try again.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-md bg-[#1F3A5F] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#162d4a] disabled:opacity-60"
            >
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
