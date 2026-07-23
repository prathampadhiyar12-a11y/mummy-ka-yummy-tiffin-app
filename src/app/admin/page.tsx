import type { Metadata } from "next";
import { AdminDashboard } from "@/components/admin/admin-dashboard";

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Admin dashboard, order management, CMS, analytics, reports and SEO settings.",
};

export default function AdminPage() {
  return (
    <section className="soft-grid px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <AdminDashboard />
      </div>
    </section>
  );
}
