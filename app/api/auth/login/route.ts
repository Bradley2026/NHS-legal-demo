import { NextResponse } from "next/server";

const DEMO_PASSWORD = process.env.DEMO_PASSWORD ?? "anytown2025";
const COOKIE_NAME = "demo-auth";
const COOKIE_MAX_AGE = 60 * 60 * 8; // 8 hours

export async function POST(request: Request) {
  const { password } = await request.json();

  if (password !== DEMO_PASSWORD) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(COOKIE_NAME, "1", {
    httpOnly: true,
    sameSite: "lax",
    maxAge: COOKIE_MAX_AGE,
    path: "/",
  });
  return response;
}
