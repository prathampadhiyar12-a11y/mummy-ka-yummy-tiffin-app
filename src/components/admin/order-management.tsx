"use client";

import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Select } from "@/components/ui/input";
import { sampleOrders } from "@/lib/content";
import { formatCurrency } from "@/lib/order";
import { Order, OrderStatus, PaymentStatus } from "@/lib/types";

const paymentStatuses: PaymentStatus[] = ["Pending", "Paid", "Failed", "Refunded"];
const orderStatuses: OrderStatus[] = ["Pending", "Paid", "Confirmed", "Completed", "Rejected"];

export function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>(sampleOrders);
  const [filter, setFilter] = useState("All");

  const filteredOrders = useMemo(
    () => orders.filter((order) => filter === "All" || order.orderStatus === filter),
    [orders, filter],
  );

  function updateOrder(id: string, patch: Partial<Order>) {
    setOrders((current) => current.map((order) => (order.id === id ? { ...order, ...patch } : order)));
  }

  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col justify-between gap-4 border-b border-[#ead8bd] p-5 md:flex-row md:items-center">
        <div>
          <Badge>Order Management</Badge>
          <h2 className="mt-3 font-serif text-3xl font-semibold text-[#201c18]">
            Orders and payment verification
          </h2>
        </div>
        <Select value={filter} onChange={(event) => setFilter(event.target.value)} className="md:max-w-52">
          {["All", ...orderStatuses].map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </Select>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[940px] text-left text-sm">
          <thead className="bg-[#fff4df] text-[#8a3b18]">
            <tr>
              {[
                ["order_id", "Order"],
                ["customer", "Customer"],
                ["meal", "Meal"],
                ["plan", "Plan"],
                ["delivery", "Delivery"],
                ["payment", "Payment"],
                ["order_status", "Order"],
                ["amount", "Amount"],
              ].map(([key, heading]) => (
                <th key={key} className="px-5 py-3 font-bold">
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#ead8bd] bg-white">
            {filteredOrders.map((order) => (
              <tr key={order.id}>
                <td className="px-5 py-4 font-semibold text-[#201c18]">{order.id}</td>
                <td className="px-5 py-4">
                  <p className="font-semibold">{order.customerName}</p>
                  <p className="text-xs text-[#71675d]">{order.phone}</p>
                </td>
                <td className="px-5 py-4">{order.mealType}</td>
                <td className="px-5 py-4">{order.plan}</td>
                <td className="px-5 py-4">{order.deliveryMode}</td>
                <td className="px-5 py-4">
                  <Select
                    value={order.paymentStatus}
                    onChange={(event) =>
                      updateOrder(order.id, { paymentStatus: event.target.value as PaymentStatus })
                    }
                  >
                    {paymentStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </Select>
                </td>
                <td className="px-5 py-4">
                  <Select
                    value={order.orderStatus}
                    onChange={(event) =>
                      updateOrder(order.id, { orderStatus: event.target.value as OrderStatus })
                    }
                  >
                    {orderStatuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </Select>
                </td>
                <td className="px-5 py-4 font-bold">{formatCurrency(order.amount)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
