import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import {
  buildWhatsAppUrl,
  calculateOrderSummary,
  generateOrderId,
  type CartLine,
} from "@/lib/order";
import { SubscriptionId } from "@/lib/types";

interface OrderRequestBody {
  cart?: CartLine[];
  planId?: SubscriptionId;
  distanceKm?: number;
  customerName?: string;
  phone?: string;
  address?: string;
  startDate?: string;
  specialInstructions?: string;
  mealLabel?: string;
  fulfillment?: "delivery" | "pickup";
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as OrderRequestBody;
    const cart = Array.isArray(body.cart) ? body.cart : [];
    const planId = body.planId ?? "one-time";
    const distanceKm = Number(body.distanceKm ?? 0);
    const orderId = generateOrderId();
    const fulfillment = body.fulfillment ?? "delivery";
    const summary = calculateOrderSummary({ cart, planId, distanceKm, fulfillment });

    if (!body.customerName || !body.phone || !body.address || !body.startDate) {
      return NextResponse.json(
        { error: "Name, phone, address and start date are required." },
        { status: 400 },
      );
    }

    const whatsappUrl = buildWhatsAppUrl({
      orderId,
      customerName: body.customerName,
      phone: body.phone,
      address: body.address,
      startDate: body.startDate,
      specialInstructions: body.specialInstructions,
      mealLabel: body.mealLabel ?? "Custom Meal",
      cart,
      planId,
      distanceKm,
      fulfillment,
    });

    let persisted = false;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    if (supabaseUrl && serviceKey) {
      const supabase = createClient(supabaseUrl, serviceKey, {
        auth: { persistSession: false },
      });

      const { error } = await supabase.from("orders").insert({
        order_code: orderId,
        customer_name: body.customerName,
        phone: body.phone,
        delivery_address: body.address,
        start_date: body.startDate,
        meal_label: body.mealLabel ?? "Custom Meal",
        plan_id: planId,
        distance_km: distanceKm,
        fulfillment,
        meal_total: summary.mealTotal,
        discount_amount: summary.discountAmount,
        delivery_charge: summary.deliveryCharge,
        deposit_amount: summary.deposit,
        total_payable: summary.totalPayable,
        payment_status: "Pending",
        order_status: "Pending",
        special_instructions: body.specialInstructions ?? "",
      });

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      }

      persisted = true;
    }

    return NextResponse.json(
      {
        orderId,
        summary,
        whatsappUrl,
        persisted,
      },
      { status: 201 },
    );
  } catch {
    return NextResponse.json({ error: "Invalid order payload." }, { status: 400 });
  }
}
