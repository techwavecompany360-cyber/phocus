import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const SECRET = process.env.ADMIN_SESSION_SECRET ?? "phocus-admin-secret-key-change-in-production";
const encodedKey = new TextEncoder().encode(SECRET);

export interface SessionPayload {
  userId: string;
  email: string;
  role: string;
  expiresAt: Date;
}

export async function encryptSession(payload: SessionPayload): Promise<string> {
  return new SignJWT({ ...payload })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decryptSession(token: string | undefined): Promise<SessionPayload | null> {
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, encodedKey, { algorithms: ["HS256"] });
    return payload as unknown as SessionPayload;
  } catch {
    return null;
  }
}

export async function createAdminSession(userId: string, email: string, role: string) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  const token = await encryptSession({ userId, email, role, expiresAt });
  const cookieStore = await cookies();
  cookieStore.set("admin_session", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function getAdminSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_session")?.value;
  return decryptSession(token);
}

export async function deleteAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
}
