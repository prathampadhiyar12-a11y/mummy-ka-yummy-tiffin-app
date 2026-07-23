import type { ReactNode } from "react";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { verifySessionToken } from "@/lib/auth-session";

export default async function DashboardLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const session = await verifySessionToken(cookieStore.get("mkyt_session")?.value);

  if (!session) {
    redirect("/login?next=/dashboard&role=customer");
  }

  return children;
}
