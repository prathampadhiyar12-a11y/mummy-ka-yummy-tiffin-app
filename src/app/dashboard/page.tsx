import type { Metadata } from "next";
import { CustomerDashboard } from "@/components/customer/customer-dashboard";
import { PageHero } from "@/components/site/page-hero";

export const metadata: Metadata = {
  title: "Customer Dashboard",
  description: "Customer subscription, payment status, order history and profile dashboard.",
};

export default function DashboardPage() {
  return (
    <>
      <PageHero eyebrow="Customer Dashboard" title="Subscription, payment and order status in one place.">
        Customers can see the current plan, order status, payment status, renewal date, order
        history, delivery address and profile information.
      </PageHero>
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <CustomerDashboard />
        </div>
      </section>
    </>
  );
}
