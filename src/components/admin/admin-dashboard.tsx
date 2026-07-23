import Link from "next/link";
import { BarChart3, IndianRupee, PackageCheck, UsersRound } from "lucide-react";
import { AdminSectionPage } from "@/components/admin/admin-section-page";
import { OrderManagement } from "@/components/admin/order-management";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { adminSections, sampleCustomers, sampleOrders } from "@/lib/content";
import { formatCurrency } from "@/lib/order";

export function AdminDashboard() {
  const todaysRevenue = sampleOrders.reduce((sum, order) => sum + order.amount, 0);
  const pendingOrders = sampleOrders.filter((order) => order.orderStatus === "Pending").length;
  const confirmedOrders = sampleOrders.filter((order) => order.orderStatus === "Confirmed").length;
  const stats = [
    { label: "Today's Orders", value: sampleOrders.length.toString(), icon: PackageCheck },
    { label: "Today's Revenue", value: formatCurrency(todaysRevenue), icon: IndianRupee },
    { label: "Today's Customers", value: sampleCustomers.length.toString(), icon: UsersRound },
    { label: "Pending Orders", value: pendingOrders.toString(), icon: BarChart3 },
  ];

  return (
    <div className="grid gap-8">
      <Card className="p-5 sm:p-7">
        <Badge>Admin Panel</Badge>
        <div className="mt-4 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h1 className="font-serif text-4xl font-semibold text-[#201c18]">
              Website command center
            </h1>
            <p className="mt-3 max-w-3xl text-[#71675d]">
              Manage orders, payments, customers, CMS content, pricing, gallery, analytics,
              reports, SEO and business settings from the website.
            </p>
          </div>
          <p className="rounded-lg bg-[#fff4df] px-4 py-3 text-sm font-semibold text-[#8a3b18]">
            Confirmed today: {confirmedOrders}
          </p>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-5">
              <Icon className="h-7 w-7 text-[#e9682c]" aria-hidden="true" />
              <p className="mt-4 text-sm font-semibold text-[#71675d]">{stat.label}</p>
              <p className="mt-1 text-2xl font-bold text-[#201c18]">{stat.value}</p>
            </Card>
          );
        })}
      </div>

      <OrderManagement />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {adminSections.map((section) => (
          <Link
            key={section.href}
            href={section.href}
            className="rounded-lg border border-[#ead8bd] bg-white p-5 transition hover:-translate-y-1 hover:border-[#e9682c] hover:shadow-xl hover:shadow-[#5b3b2417]"
          >
            <h2 className="text-lg font-bold text-[#201c18]">{section.label}</h2>
            <p className="mt-2 text-sm leading-7 text-[#71675d]">{section.description}</p>
          </Link>
        ))}
      </div>

      <AdminSectionPage kind="homepage-cms" compact />
    </div>
  );
}
