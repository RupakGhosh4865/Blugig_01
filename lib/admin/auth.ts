import { createHash, createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

/**
 * Admin sign-in: one shared password (ADMIN_PASSWORD) and a signed, httpOnly
 * session cookie scoped to /admin. The signing key is ADMIN_SESSION_SECRET, or
 * derived from the password, so changing either signs everyone out. Server only.
 */

const COOKIE = "avantra_admin";
const SESSION_DAYS = 7;

export function adminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

function key() {
  return createHash("sha256")
    .update(process.env.ADMIN_SESSION_SECRET || `avantra-admin-session:${process.env.ADMIN_PASSWORD}`)
    .digest();
}

const sign = (payload: string) => createHmac("sha256", key()).update(payload).digest("base64url");

function sameBytes(a: Buffer, b: Buffer) {
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Constant-time password check (both sides hashed, so lengths always match). */
export function passwordMatches(input: string) {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return sameBytes(createHash("sha256").update(input).digest(), createHash("sha256").update(expected).digest());
}

export async function startSession() {
  const expires = Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000;
  const payload = String(expires);
  (await cookies()).set(COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/admin",
    expires: new Date(expires),
  });
}

export async function endSession() {
  (await cookies()).set(COOKIE, "", { path: "/admin", maxAge: 0 });
}

export async function isAdmin() {
  // Cookies first, even when the admin is off: it keeps every admin page request-time, so
  // ADMIN_PASSWORD is read when the page is served rather than frozen into a build-time render.
  const value = (await cookies()).get(COOKIE)?.value;
  if (!adminConfigured() || !value) return false;
  const [payload, sig] = value.split(".");
  if (!payload || !sig || !sameBytes(Buffer.from(sig), Buffer.from(sign(payload)))) return false;
  return Number(payload) > Date.now();
}

/** For admin pages: signed in, or off to the sign-in page. */
export async function requireAdmin() {
  if (!(await isAdmin())) redirect("/admin/login");
}

// Sign-in attempts: 8 per IP per 15 minutes (in memory, per server instance — fine for one Railway replica).
const WINDOW_MS = 15 * 60 * 1000;
const LIMIT = 8;
const attempts = new Map<string, number[]>();

export function allowSignInAttempt(ip: string) {
  const now = Date.now();
  const recent = (attempts.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  attempts.set(ip, recent);
  return recent.length <= LIMIT;
}
