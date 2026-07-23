import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySessionToken } from "@/lib/auth-session";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const session = await verifySessionToken(cookieStore.get("mkyt_session")?.value);

  if (session?.role !== "admin") {
    redirect("/login?next=/admin&role=admin");
  }

  return children;
}
