import { businessRules, mealItems, siteConfig, subscriptionPlans } from "./content";
import { SubscriptionId } from "./types";

export interface CartLine {
  itemId: string;
  quantity: number;
}

export interface OrderSummaryInput {
  cart: CartLine[];
  planId: SubscriptionId;
  distanceKm: number;
  fulfillment?: "delivery" | "pickup";
}

export interface FixedOrderSummaryInput {
  mealTotal: number;
  planId: SubscriptionId;
  distanceKm: number;
  fulfillment?: "delivery" | "pickup";
}

export interface WhatsAppOrderInput extends OrderSummaryInput {
  orderId: string;
  customerName: string;
  phone: string;
  address: string;
  startDate: string;
  specialInstructions?: string;
  mealLabel: string;
  mealTotalOverride?: number;
  fulfillment?: "delivery" | "pickup";
}

export function formatCurrency(value: number) {
  return `Rs. ${new Intl.NumberFormat("en-IN", {
    maximumFractionDigits: 0,
  }).format(value)}`;
}

export function generateOrderId(date = new Date()) {
  const datePart = date.toISOString().slice(0, 10).replaceAll("-", "");
  const randomPart = Math.random().toString(36).slice(2, 7).toUpperCase();
  return `MKYT-${datePart}-${randomPart}`;
}

export function calculateMealTotal(cart: CartLine[]) {
  return cart.reduce((total, line) => {
    const item = mealItems.find((mealItem) => mealItem.id === line.itemId);
    return total + (item ? item.price * Math.max(0, line.quantity) : 0);
  }, 0);
}

function buildSummary(input: FixedOrderSummaryInput) {
  const mealTotal = Math.max(0, input.mealTotal);
  const plan = subscriptionPlans.find((item) => item.id === input.planId) ?? subscriptionPlans[0];
  const discountedMeals = mealTotal * plan.durationDays;
  const discountAmount = Math.round((discountedMeals * plan.discountPercent) / 100);
  const fulfillment = input.fulfillment ?? "delivery";
  const deliveryDistance = Math.max(0, input.distanceKm);
  const outsideServiceArea =
    fulfillment === "delivery" && deliveryDistance > businessRules.serviceRadiusKm;
  const pickupOnly =
    fulfillment === "delivery" && mealTotal > 0 && mealTotal < businessRules.minimumOrderValue;
  const chargeableKm = Math.max(0, Math.ceil(deliveryDistance - businessRules.freeDeliveryKm));
  const deliveryCharge =
    fulfillment === "pickup" || outsideServiceArea || pickupOnly
      ? 0
      : chargeableKm * businessRules.extraDeliveryChargePerKm;
  const deposit = plan.depositRequired ? businessRules.depositAmount : 0;
  const subtotal = discountedMeals - discountAmount;
  const totalPayable = subtotal + deliveryCharge + deposit;

  return {
    mealTotal,
    plan,
    subtotal,
    discountAmount,
    deliveryCharge,
    deposit,
    totalPayable,
    fulfillment,
    pickupOnly,
    outsideServiceArea,
    note:
      fulfillment === "pickup"
        ? "Pickup selected. Pickup service is available for every customer."
        : outsideServiceArea
          ? `This area is above ${businessRules.serviceRadiusKm} km. Your order will stay pending until confirmation. Please call ${siteConfig.phone}.`
          : pickupOnly
            ? `Delivery needs a minimum meal value of ${formatCurrency(businessRules.minimumOrderValue)}. Pickup is available.`
            : deliveryDistance <= businessRules.freeDeliveryKm
              ? "Free delivery is available for this distance."
              : "Extra delivery charges apply for this distance.",
  };
}

export function calculateFixedOrderSummary(input: FixedOrderSummaryInput) {
  return buildSummary(input);
}

export function calculateOrderSummary(input: OrderSummaryInput) {
  return buildSummary({
    mealTotal: calculateMealTotal(input.cart),
    planId: input.planId,
    distanceKm: input.distanceKm,
    fulfillment: input.fulfillment,
  });
}

export function getCartDescription(cart: CartLine[]) {
  return cart
    .map((line) => {
      const item = mealItems.find((mealItem) => mealItem.id === line.itemId);
      if (!item || line.quantity <= 0) {
        return null;
      }
      return `${item.name} x ${line.quantity}`;
    })
    .filter(Boolean)
    .join(", ");
}

export function buildWhatsAppUrl(order: WhatsAppOrderInput) {
  const summary =
    typeof order.mealTotalOverride === "number"
      ? calculateFixedOrderSummary({
          mealTotal: order.mealTotalOverride,
          planId: order.planId,
          distanceKm: order.distanceKm,
          fulfillment: order.fulfillment,
        })
      : calculateOrderSummary(order);
  const cartDescription = getCartDescription(order.cart);
  const message = [
    `New order for ${siteConfig.name}`,
    `Order ID: ${order.orderId}`,
    `Customer: ${order.customerName}`,
    `Phone: ${order.phone}`,
    `Meal: ${order.mealLabel}`,
    `Order mode: ${summary.fulfillment === "pickup" ? "Pickup" : "Delivery"}`,
    cartDescription ? `Items: ${cartDescription}` : "",
    `Plan: ${summary.plan.name}`,
    `Start date: ${order.startDate}`,
    `Address: ${order.address}`,
    `Distance: ${order.distanceKm} km`,
    `Meal total: ${formatCurrency(summary.mealTotal)}`,
    `Discount: ${formatCurrency(summary.discountAmount)}`,
    `Delivery: ${formatCurrency(summary.deliveryCharge)}`,
    `Deposit: ${formatCurrency(summary.deposit)}`,
    `Total payable: ${formatCurrency(summary.totalPayable)}`,
    `Note: ${summary.note}`,
    "Payment flow: Please share QR code on WhatsApp. Customer will pay and send payment screenshot in this chat.",
    order.specialInstructions ? `Special instructions: ${order.specialInstructions}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
