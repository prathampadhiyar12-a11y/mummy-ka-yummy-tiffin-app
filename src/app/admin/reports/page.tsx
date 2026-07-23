import type { Metadata } from "next";
import { AdminSectionPage } from "@/components/admin/admin-section-page";

export const metadata: Metadata = {
  title: "Admin Reports",
};

export default function AdminReportsPage() {
  return (
    <section className="soft-grid px-4 py-12 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <AdminSectionPage kind="reports" />
      </div>
    </section>
  );
}
