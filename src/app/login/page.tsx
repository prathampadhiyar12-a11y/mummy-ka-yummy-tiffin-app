import type { Metadata } from "next";
import { LoginPanel } from "@/components/auth/login-panel";
import { PageHero } from "@/components/site/page-hero";

export const metadata: Metadata = {
  title: "Login",
  description: "Customer and admin login for Mummy Ka Yummy Tiffin.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const params = await searchParams;
  const initialRole = params.role === "admin" ? "admin" : "customer";

  return (
    <>
      <PageHero eyebrow="Login" title="Secure access for customers and admins.">
        Customers can continue with email. Admin panel opens only after admin ID and password.
      </PageHero>
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <LoginPanel initialRole={initialRole} />
      </section>
    </>
  );
}
