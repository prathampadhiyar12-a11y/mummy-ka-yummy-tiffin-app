import { CalendarDays, CheckCircle2, CreditCard, Home, PackageCheck, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { sampleCustomers, sampleOrders } from "@/lib/content";
import { formatCurrency } from "@/lib/order";

export function CustomerDashboard() {
  const customer = sampleCustomers[0];
  const activeOrder = sampleOrders[0];
  const history = sampleOrders.filter((order) => order.customerName === customer.name);

  const stats = [
    { icon: PackageCheck, label: "Order Status", value: activeOrder.orderStatus },
    { icon: CreditCard, label: "Payment Status", value: activeOrder.paymentStatus },
    { icon: CalendarDays, label: "Renewal Date", value: customer.renewalDate },
    { icon: Home, label: "Delivery Area", value: customer.area },
  ];

  return (
    <div className="grid gap-6">
      <Card className="p-5 sm:p-7">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <Badge>Current Subscription</Badge>
            <h1 className="mt-4 font-serif text-4xl font-semibold text-[#201c18]">
              {customer.currentPlan} plan
            </h1>
            <p className="mt-2 text-[#71675d]">
              Order ID {activeOrder.id} is {activeOrder.orderStatus.toLowerCase()}.
            </p>
          </div>
          <div className="rounded-lg bg-[#201c18] px-5 py-4 text-white">
            <p className="text-sm text-white/70">Current payable</p>
            <p className="text-3xl font-bold">{formatCurrency(activeOrder.amount)}</p>
          </div>
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-5">
              <Icon className="h-7 w-7 text-[#e9682c]" aria-hidden="true" />
              <p className="mt-4 text-sm font-semibold text-[#71675d]">{stat.label}</p>
              <p className="mt-1 text-xl font-bold text-[#201c18]">{stat.value}</p>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="overflow-hidden">
          <div className="border-b border-[#ead8bd] p-5">
            <h2 className="font-serif text-3xl font-semibold">Order history</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[620px] text-left text-sm">
              <thead className="bg-[#fff4df] text-[#8a3b18]">
                <tr>
                  {["Order", "Meal", "Plan", "Payment", "Status", "Amount"].map((heading) => (
                    <th key={heading} className="px-5 py-3 font-bold">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#ead8bd]">
                {history.map((order) => (
                  <tr key={order.id}>
                    <td className="px-5 py-4 font-semibold">{order.id}</td>
                    <td className="px-5 py-4">{order.mealType}</td>
                    <td className="px-5 py-4">{order.plan}</td>
                    <td className="px-5 py-4">{order.paymentStatus}</td>
                    <td className="px-5 py-4">{order.orderStatus}</td>
                    <td className="px-5 py-4 font-bold">{formatCurrency(order.amount)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="p-5">
          <div className="flex items-center gap-3">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#fff4df] text-[#e9682c]">
              <UserRound aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-xl font-bold text-[#201c18]">{customer.name}</h2>
              <p className="text-sm text-[#71675d]">{customer.phone}</p>
            </div>
          </div>
          <div className="mt-6 grid gap-3 text-sm text-[#5d5248]">
            <p className="flex gap-2">
              <CheckCircle2 className="h-5 w-5 text-[#246b45]" aria-hidden="true" />
              Delivery address is set for {customer.area}, Vadodara.
            </p>
            <p className="flex gap-2">
              <CheckCircle2 className="h-5 w-5 text-[#246b45]" aria-hidden="true" />
              Payment confirmation updates after admin verification.
            </p>
            <p className="flex gap-2">
              <CheckCircle2 className="h-5 w-5 text-[#246b45]" aria-hidden="true" />
              Subscription renewal reminders are stored with the customer profile.
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
}
