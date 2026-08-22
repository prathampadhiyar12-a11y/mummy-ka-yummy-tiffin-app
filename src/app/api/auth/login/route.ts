import { NextResponse } from "next/server";
import { createSessionToken, getSessionMaxAge, type SessionRole } from "@/lib/auth-session";

interface LoginBody {
  role?: SessionRole;
  email?: string;
  adminId?: string;
  password?: string;
  next?: string;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getAdminId() {
  return process.env.ADMIN_LOGIN_ID || "admin";
}

function getAdminPassword() {
  return process.env.ADMIN_PASSWORD || "Admin@7383344746";
}

function safeRedirect(nextPath: string | undefined, fallback: string) {
  if (!nextPath || !nextPath.startsWith("/") || nextPath.startsWith("//")) {
    return fallback;
  }

  return nextPath;
}

export async function POST(request: Request) {
  let body: LoginBody;

  try {
    body = (await request.json()) as LoginBody;
  } catch {
    return NextResponse.json({ error: "Invalid login payload." }, { status: 400 });
  }

  const role = body.role ?? "customer";

  if (role === "admin") {
    const adminId = body.adminId?.trim();
    const password = body.password ?? "";
    const expectedAdminId = getAdminId();
    const expectedPassword = getAdminPassword();

    if (!expectedAdminId || !expectedPassword) {
      return NextResponse.json(
        { error: "Admin credentials are not configured." },
        { status: 503 },
      );
    }

    if (adminId !== expectedAdminId || password !== expectedPassword) {
      return NextResponse.json({ error: "Invalid admin ID or password." }, { status: 401 });
    }

    const maxAge = getSessionMaxAge("admin");
    const token = await createSessionToken({
      role: "admin",
      adminId,
      exp: Date.now() + maxAge * 1000,
    });
    const response = NextResponse.json({
      ok: true,
      redirectTo: safeRedirect(body.next, "/admin"),
    });

    response.cookies.set("mkyt_session", token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge,
    });

    return response;
  }

  const email = body.email?.trim().toLowerCase();
  if (!email || !emailPattern.test(email)) {
    return NextResponse.json({ error: "Valid email is required." }, { status: 400 });
  }

  const maxAge = getSessionMaxAge("customer");
  const token = await createSessionToken({
    role: "customer",
    email,
    exp: Date.now() + maxAge * 1000,
  });
  const response = NextResponse.json({
    ok: true,
    redirectTo: safeRedirect(body.next, "/dashboard"),
  });

  response.cookies.set("mkyt_session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge,
  });

  return response;
}
