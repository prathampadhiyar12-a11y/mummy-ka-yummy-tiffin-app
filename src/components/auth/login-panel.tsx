"use client";

import { useRouter } from "next/navigation";
import { KeyRound, Mail, ShieldCheck, UserRound } from "lucide-react";
import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

type Role = "customer" | "admin";

export function LoginPanel({ initialRole = "customer" }: { initialRole?: Role }) {
  const router = useRouter();
  const [role, setRole] = useState<Role>(initialRole);
  const [email, setEmail] = useState("");
  const [adminId, setAdminId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const next = new URLSearchParams(window.location.search).get("next") ?? undefined;
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          role === "admin"
            ? { role, adminId, password, next }
            : { role, email, next },
        ),
      });
      const result = (await response.json()) as { error?: string; redirectTo?: string };

      if (!response.ok) {
        setError(result.error ?? "Login failed. Please try again.");
        return;
      }

      router.push(result.redirectTo ?? (role === "admin" ? "/admin" : "/dashboard"));
      router.refresh();
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className="mx-auto max-w-xl p-5 sm:p-7">
      <div className="grid grid-cols-2 gap-2 rounded-lg bg-[#fff4df] p-1">
        {[
          { id: "customer", label: "Customer Email", icon: UserRound },
          { id: "admin", label: "Admin Login", icon: ShieldCheck },
        ].map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setRole(item.id as Role);
                setError("");
              }}
              className={`flex min-h-11 items-center justify-center gap-2 rounded-md px-3 text-sm font-bold transition ${
                role === item.id ? "bg-white text-[#201c18] shadow-sm" : "text-[#71675d]"
              }`}
            >
              <Icon size={17} aria-hidden="true" />
              {item.label}
            </button>
          );
        })}
      </div>

      <form className="mt-6 grid gap-4" onSubmit={onSubmit}>
        {role === "customer" ? (
          <label className="grid gap-2 text-sm font-semibold text-[#3f372f]">
            Email
            <Input
              type="email"
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="customer@example.com"
              required
            />
          </label>
        ) : (
          <>
            <label className="grid gap-2 text-sm font-semibold text-[#3f372f]">
              Admin ID
              <Input
                autoComplete="username"
                value={adminId}
                onChange={(event) => setAdminId(event.target.value)}
                placeholder="admin"
                required
              />
            </label>
            <label className="grid gap-2 text-sm font-semibold text-[#3f372f]">
              Password
              <Input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Admin password"
                required
              />
            </label>
          </>
        )}

        {error ? (
          <p className="rounded-lg bg-red-50 p-3 text-sm font-semibold text-red-700">{error}</p>
        ) : null}

        <Button type="submit" className="w-full" disabled={loading}>
          {role === "admin" ? (
            <KeyRound size={17} aria-hidden="true" />
          ) : (
            <Mail size={17} aria-hidden="true" />
          )}
          {loading
            ? "Signing in"
            : role === "admin"
              ? "Unlock Admin Panel"
              : "Continue With Email"}
        </Button>
      </form>

      <div className="mt-5 rounded-lg border border-[#ead8bd] bg-[#fffaf2] p-4 text-sm leading-7 text-[#71675d]">
        Customer login uses email. Admin access is protected with ID and password through a
        signed HTTP-only session cookie.
      </div>
    </Card>
  );
}
