import { Archive, Edit3, UsersRound } from "lucide-react";
import { CmsWorkspace } from "@/components/admin/cms-workspace";
import { OrderManagement } from "@/components/admin/order-management";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { adminSections, sampleCustomers } from "@/lib/content";

export function AdminSectionPage({
  kind,
  compact = false,
}: {
  kind: string;
  compact?: boolean;
}) {
  const section = adminSections.find((item) => item.href.endsWith(kind));

  if (kind === "orders") {
    return <OrderManagement />;
  }

  if (kind === "customers") {
    return (
      <Card className="overflow-hidden">
        <div className="border-b border-[#ead8bd] p-5">
          <Badge>Customers</Badge>
          <h2 className="mt-3 font-serif text-3xl font-semibold">Customer records</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-left text-sm">
            <thead className="bg-[#fff4df] text-[#8a3b18]">
              <tr>
                {["Customer", "Phone", "Area", "Plan", "Status", "Actions"].map((heading) => (
                  <th key={heading} className="px-5 py-3 font-bold">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#ead8bd] bg-white">
              {sampleCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td className="px-5 py-4 font-semibold">{customer.name}</td>
                  <td className="px-5 py-4">{customer.phone}</td>
                  <td className="px-5 py-4">{customer.area}</td>
                  <td className="px-5 py-4">{customer.currentPlan}</td>
                  <td className="px-5 py-4">{customer.status}</td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2">
                      <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ead8bd]" aria-label="View customer">
                        <UsersRound size={16} aria-hidden="true" />
                      </button>
                      <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ead8bd]" aria-label="Edit customer">
                        <Edit3 size={16} aria-hidden="true" />
                      </button>
                      <button className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ead8bd]" aria-label="Archive customer">
                        <Archive size={16} aria-hidden="true" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    );
  }

  return (
    <div className={compact ? "grid gap-4" : "grid gap-6"}>
      {section && !compact ? (
        <Card className="p-5">
          <Badge>Admin</Badge>
          <h1 className="mt-3 font-serif text-4xl font-semibold text-[#201c18]">{section.label}</h1>
          <p className="mt-2 max-w-3xl text-[#71675d]">{section.description}</p>
        </Card>
      ) : null}
      <CmsWorkspace kind={kind} />
    </div>
  );
}
