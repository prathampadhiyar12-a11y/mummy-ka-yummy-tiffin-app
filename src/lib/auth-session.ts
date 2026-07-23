export type SessionRole = "admin" | "customer";

export interface AuthSession {
  role: SessionRole;
  email?: string;
  adminId?: string;
  exp: number;
}

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function getAuthSecret() {
  return (
    process.env.AUTH_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "mkyt-local-development-session-secret"
  );
}

function bytesToBase64Url(bytes: Uint8Array) {
  let binary = "";
  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
}

function base64UrlToBytes(value: string) {
  const padded = value.replaceAll("-", "+").replaceAll("_", "/").padEnd(
    Math.ceil(value.length / 4) * 4,
    "=",
  );
  const binary = atob(padded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0));
}

function encodePayload(payload: AuthSession) {
  return bytesToBase64Url(encoder.encode(JSON.stringify(payload)));
}

function decodePayload(value: string): AuthSession {
  return JSON.parse(decoder.decode(base64UrlToBytes(value))) as AuthSession;
}

async function sign(value: string) {
  const key = await crypto.subtle.importKey(
    "raw",
    encoder.encode(getAuthSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"],
  );
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return bytesToBase64Url(new Uint8Array(signature));
}

export async function createSessionToken(payload: AuthSession) {
  const encodedPayload = encodePayload(payload);
  const signature = await sign(encodedPayload);
  return `${encodedPayload}.${signature}`;
}

export async function verifySessionToken(token?: string | null) {
  if (!token) {
    return null;
  }

  const [payload, signature] = token.split(".");
  if (!payload || !signature) {
    return null;
  }

  const expectedSignature = await sign(payload);
  if (signature !== expectedSignature) {
    return null;
  }

  try {
    const session = decodePayload(payload);
    if (!session.exp || session.exp < Date.now()) {
      return null;
    }

    return session;
  } catch {
    return null;
  }
}

export function getSessionMaxAge(role: SessionRole) {
  return role === "admin" ? 60 * 60 * 8 : 60 * 60 * 24 * 30;
}
