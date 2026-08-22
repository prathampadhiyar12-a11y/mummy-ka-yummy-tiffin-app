"use client";

import Image from "next/image";
import {
  CheckCircle2,
  Minus,
  PackageCheck,
  Plus,
  Send,
  Sparkles,
  Utensils,
} from "lucide-react";
import { useMemo, useState, useSyncExternalStore } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Select, Textarea } from "@/components/ui/input";
import {
  businessRules,
  mealItems,
  platterOptions,
  subscriptionPlans,
} from "@/lib/content";
import {
  buildWhatsAppUrl,
  calculateFixedOrderSummary,
  calculateOrderSummary,
  formatCurrency,
  generateOrderId,
  type CartLine,
} from "@/lib/order";
import { MealCategory, SubscriptionId } from "@/lib/types";

type MealChoice = "custom" | "mini" | "full";

const categoryLabels: Record<MealCategory, string> = {
  roti: "Roti",
  rice: "Rice",
  dal: "Dal",
  kathod: "Kathod",
  sabji: "Sabji",
  salad: "Salad",
  chaas: "Chaas",
  sweet: "Sweet",
};

const defaultQuantities: Record<string, number> = {
  "roti-plain": 6,
  "rice-steamed": 1,
  "dal-tadka": 1,
  "sabji-seasonal": 1,
  "salad-house": 1,
};

const mealChoices = [
  {
    id: "custom" as const,
    title: "Customize Meal",
    subtitle: "Build your own plate",
    price: "Flexible",
    imageUrl:
      "https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?auto=format&fit=crop&w=1400&q=85",
    icon: Sparkles,
  },
  {
    id: "mini" as const,
    title: "Mini Platter",
    subtitle: "Light and complete",
    price: formatCurrency(platterOptions.mini.basePrice),
    imageUrl: platterOptions.mini.imageUrl,
    icon: Utensils,
  },
  {
    id: "full" as const,
    title: "Full Platter",
    subtitle: "Daily full thali",
    price: formatCurrency(platterOptions.full.basePrice),
    imageUrl: platterOptions.full.imageUrl,
    icon: PackageCheck,
  },
];

function choiceFromHash(hash: string): MealChoice {
  if (hash.includes("mini")) {
    return "mini";
  }

  if (hash.includes("full")) {
    return "full";
  }

  return "custom";
}

function subscribeToHashChange(callback: () => void) {
  window.addEventListener("hashchange", callback);
  return () => window.removeEventListener("hashchange", callback);
}

function getHashSnapshot() {
  return window.location.hash;
}

function getServerHashSnapshot() {
  return "";
}

export function ChooseMealExperience() {
  const hash = useSyncExternalStore(
    subscribeToHashChange,
    getHashSnapshot,
    getServerHashSnapshot,
  );
  const choice = choiceFromHash(hash);
  const [quantities, setQuantities] = useState<Record<string, number>>(defaultQuantities);
  const [platterOptionIndex, setPlatterOptionIndex] = useState(0);
  const [platterQuantity, setPlatterQuantity] = useState(1);
  const [planId, setPlanId] = useState<SubscriptionId>("weekly");
  const [fulfillment, setFulfillment] = useState<"delivery" | "pickup">("delivery");
  const [distanceKm, setDistanceKm] = useState(2);
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [startDate, setStartDate] = useState(new Date().toISOString().slice(0, 10));
  const [specialInstructions, setSpecialInstructions] = useState("");

  const customCart: CartLine[] = useMemo(
    () =>
      Object.entries(quantities)
        .filter(([, quantity]) => quantity > 0)
        .map(([itemId, quantity]) => ({ itemId, quantity })),
    [quantities],
  );

  const groupedItems = useMemo(
    () =>
      mealItems.reduce(
        (acc, item) => {
          acc[item.category] = [...(acc[item.category] ?? []), item];
          return acc;
        },
        {} as Record<MealCategory, typeof mealItems>,
      ),
    [],
  );

  const selectedPlatter =
    choice === "mini" ? platterOptions.mini : choice === "full" ? platterOptions.full : null;
  const selectedPlatterItems = selectedPlatter?.options[platterOptionIndex] ?? [];
  const mealTotal = selectedPlatter
    ? selectedPlatter.basePrice * platterQuantity
    : calculateOrderSummary({ cart: customCart, planId, distanceKm, fulfillment }).mealTotal;
  const summary = selectedPlatter
    ? calculateFixedOrderSummary({ mealTotal, planId, distanceKm, fulfillment })
    : calculateOrderSummary({ cart: customCart, planId, distanceKm, fulfillment });
  const activeChoice = mealChoices.find((item) => item.id === choice) ?? mealChoices[0];

  function selectChoice(nextChoice: MealChoice) {
    const nextUrl = new URL(window.location.href);
    nextUrl.hash = nextChoice;
    window.history.replaceState(null, "", nextUrl);
    window.dispatchEvent(new Event("hashchange"));
  }

  function updateQuantity(itemId: string, nextQuantity: number) {
    setQuantities((current) => ({
      ...current,
      [itemId]: Math.max(0, Math.min(20, nextQuantity)),
    }));
  }

  function continueOnWhatsApp() {
    if (!customerName.trim() || !phone.trim() || !address.trim()) {
      alert("Please provide your Name, Phone, and Address before continuing.");
      return;
    }
    const orderId = generateOrderId();
    const platterNote = selectedPlatter
      ? `${selectedPlatter.name} Option ${platterOptionIndex + 1}: ${selectedPlatterItems.join(", ")}`
      : "";
    const whatsappUrl = buildWhatsAppUrl({
      orderId,
      customerName: customerName || "Guest customer",
      phone: phone || "Not provided",
      address: address || "Not provided",
      startDate,
      specialInstructions: [platterNote, specialInstructions].filter(Boolean).join(". "),
      mealLabel: selectedPlatter
        ? `${selectedPlatter.name} x ${platterQuantity}`
        : "Custom Meal",
      cart: selectedPlatter ? [] : customCart,
      planId,
      distanceKm,
      mealTotalOverride: selectedPlatter ? mealTotal : undefined,
      fulfillment,
    });
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }

  return (
    <div className="grid gap-8">
      <section aria-labelledby="meal-choice-heading">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-end">
          <div>
            <Badge>Choose Your Meal</Badge>
            <h2
              id="meal-choice-heading"
              className="mt-4 font-serif text-3xl font-semibold text-[#201c18] md:text-5xl"
            >
              Choose your perfect homemade meal.
            </h2>
          </div>
          <p className="max-w-md text-sm leading-7 text-[#71675d]">
            Custom Meal, Mini Platter and Full Platter are available in one calm flow with a
            shared subscription and WhatsApp checkout summary.
          </p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {mealChoices.map((meal) => {
            const Icon = meal.icon;
            const isActive = choice === meal.id;
            return (
              <button
                key={meal.id}
                type="button"
                onClick={() => selectChoice(meal.id)}
                className={`group overflow-hidden rounded-lg border bg-white text-left transition ${
                  isActive
                    ? "border-[#e9682c] shadow-xl shadow-[#5b3b2417]"
                    : "border-[#ead8bd] hover:-translate-y-1 hover:border-[#e9682c]"
                }`}
              >
                <span className="relative block h-44 overflow-hidden">
                  <Image
                    src={meal.imageUrl}
                    alt={`${meal.title} option`}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover transition duration-500 group-hover:scale-105"
                  />
                  <span className="absolute inset-0 bg-[linear-gradient(0deg,rgba(32,28,24,0.6),transparent)]" />
                  <span className="absolute bottom-4 left-4 flex h-11 w-11 items-center justify-center rounded-full bg-white text-[#e9682c]">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                </span>
                <span className="block p-5">
                  <span className="flex items-start justify-between gap-3">
                    <span>
                      <span className="block font-serif text-2xl font-semibold text-[#201c18]">
                        {meal.title}
                      </span>
                      <span className="mt-1 block text-sm text-[#71675d]">{meal.subtitle}</span>
                    </span>
                    <span className="rounded-full bg-[#fff4df] px-3 py-1 text-xs font-bold text-[#8a3b18]">
                      {meal.price}
                    </span>
                  </span>
                  <span
                    className={`mt-4 flex items-center gap-2 text-sm font-bold ${
                      isActive ? "text-[#246b45]" : "text-[#e9682c]"
                    }`}
                  >
                    <CheckCircle2 size={16} aria-hidden="true" />
                    {isActive ? "Selected" : "Choose"}
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <Card className="overflow-hidden">
          <div className="border-b border-[#ead8bd] bg-white p-5 sm:p-6">
            <Badge>{activeChoice.subtitle}</Badge>
            <h3 className="mt-3 font-serif text-3xl font-semibold text-[#201c18]">
              {activeChoice.title}
            </h3>
          </div>
          <div className="p-4 sm:p-6">
            {selectedPlatter ? (
              <PlatterConfigurator
                optionIndex={platterOptionIndex}
                quantity={platterQuantity}
                selectedPlatter={selectedPlatter}
                onOptionChange={setPlatterOptionIndex}
                onQuantityChange={setPlatterQuantity}
              />
            ) : (
              <CustomMealConfigurator
                groupedItems={groupedItems}
                quantities={quantities}
                onQuantityChange={updateQuantity}
              />
            )}
          </div>
        </Card>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <Card className="p-4 sm:p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-[#8a3b18]">
              <Sparkles size={17} aria-hidden="true" />
              Order summary
            </div>

            <div className="mt-5 grid gap-4">
              <label className="grid gap-2 text-sm font-semibold text-[#3f372f]">
                Subscription
                <Select
                  value={planId}
                  onChange={(event) => setPlanId(event.target.value as SubscriptionId)}
                >
                  {subscriptionPlans.map((plan) => (
                    <option key={plan.id} value={plan.id}>
                      {plan.name} - {plan.discountPercent}% discount
                    </option>
                  ))}
                </Select>
              </label>
              <div className="grid gap-2 text-sm font-semibold text-[#3f372f]">
                Order mode
                <div className="grid grid-cols-2 gap-2 rounded-lg bg-[#fff4df] p-1">
                  {[
                    { id: "delivery", label: "Delivery" },
                    { id: "pickup", label: "Pickup" },
                  ].map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setFulfillment(item.id as "delivery" | "pickup")}
                      className={`min-h-10 rounded-md px-3 text-sm font-bold transition ${
                        fulfillment === item.id
                          ? "bg-white text-[#201c18] shadow-sm"
                          : "text-[#71675d]"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
              <label className="grid gap-2 text-sm font-semibold text-[#3f372f]">
                Distance from kitchen in km
                <Input
                  min={0}
                  step={0.5}
                  type="number"
                  value={distanceKm}
                  disabled={fulfillment === "pickup"}
                  onChange={(event) => setDistanceKm(Number(event.target.value))}
                />
              </label>
            </div>

            <dl className="mt-6 grid gap-3 text-sm">
              {[
                ["Meal value", formatCurrency(summary.mealTotal)],
                [
                  "Subscription subtotal",
                  formatCurrency(summary.subtotal + summary.discountAmount),
                ],
                ["Discount", `-${formatCurrency(summary.discountAmount)}`],
                [fulfillment === "pickup" ? "Pickup" : "Delivery", formatCurrency(summary.deliveryCharge)],
                ["Refundable deposit", formatCurrency(summary.deposit)],
              ].map(([label, value]) => (
                <div key={label} className="flex items-center justify-between gap-4">
                  <dt className="text-[#71675d]">{label}</dt>
                  <dd className="font-semibold text-[#201c18]">{value}</dd>
                </div>
              ))}
              <div className="mt-2 flex items-center justify-between gap-4 rounded-lg bg-[#201c18] px-4 py-3 text-white">
                <dt className="text-sm">Total payable</dt>
                <dd className="text-lg font-bold">{formatCurrency(summary.totalPayable)}</dd>
              </div>
            </dl>

            <p className="mt-4 rounded-lg bg-[#fff4df] p-3 text-sm leading-6 text-[#5d5248]">
              {summary.note}
            </p>

            <div className="mt-5 grid gap-3">
              <Input
                placeholder="Name"
                value={customerName}
                onChange={(event) => setCustomerName(event.target.value)}
              />
              <Input
                placeholder="Phone"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
              />
              <Input
                type="date"
                value={startDate}
                onChange={(event) => setStartDate(event.target.value)}
              />
              <Textarea
                placeholder="Address"
                value={address}
                onChange={(event) => setAddress(event.target.value)}
              />
              <Textarea
                placeholder="Special instructions"
                value={specialInstructions}
                onChange={(event) => setSpecialInstructions(event.target.value)}
              />
            </div>

            <Button
              className="mt-5 w-full"
              disabled={summary.mealTotal <= 0}
              onClick={continueOnWhatsApp}
            >
              <Send size={17} aria-hidden="true" />
              {summary.outsideServiceArea ? "Contact on WhatsApp" : "Continue on WhatsApp"}
            </Button>
          </Card>
        </aside>
      </div>
    </div>
  );
}

function PlatterConfigurator({
  optionIndex,
  quantity,
  selectedPlatter,
  onOptionChange,
  onQuantityChange,
}: {
  optionIndex: number;
  quantity: number;
  selectedPlatter: typeof platterOptions.mini | typeof platterOptions.full;
  onOptionChange: (index: number) => void;
  onQuantityChange: (quantity: number) => void;
}) {
  return (
    <div className="grid gap-5">
      <div className="relative min-h-[320px] overflow-hidden rounded-lg">
        <Image
          src={selectedPlatter.imageUrl}
          alt={`${selectedPlatter.name} meal`}
          fill
          priority
          sizes="(min-width: 1024px) 60vw, 100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(32,28,24,0.62),transparent)]" />
        <div className="absolute bottom-5 left-5 right-5 text-white">
          <p className="text-sm font-semibold">Base price</p>
          <p className="text-3xl font-bold">{formatCurrency(selectedPlatter.basePrice)}</p>
        </div>
      </div>

      <label className="grid gap-2 text-sm font-semibold text-[#3f372f] sm:max-w-48">
        Quantity
        <Input
          min={1}
          max={20}
          type="number"
          value={quantity}
          onChange={(event) => onQuantityChange(Math.max(1, Number(event.target.value)))}
        />
      </label>

      <div className="grid gap-3">
        {selectedPlatter.options.map((option, index) => (
          <button
            key={option.join("-")}
            type="button"
            onClick={() => onOptionChange(index)}
            className={`rounded-lg border p-4 text-left transition ${
              optionIndex === index
                ? "border-[#e9682c] bg-[#fff4df]"
                : "border-[#ead8bd] bg-white hover:border-[#e9682c]"
            }`}
          >
            <span className="text-sm font-bold text-[#8a3b18]">Option {index + 1}</span>
            <span className="mt-2 block text-sm leading-6 text-[#5d5248]">
              {option.join(" / ")}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function CustomMealConfigurator({
  groupedItems,
  quantities,
  onQuantityChange,
}: {
  groupedItems: Record<MealCategory, typeof mealItems>;
  quantities: Record<string, number>;
  onQuantityChange: (itemId: string, quantity: number) => void;
}) {
  return (
    <div className="grid gap-5">
      <div className="rounded-lg bg-[#fff4df] px-4 py-3 text-sm text-[#5d5248]">
        Minimum order {formatCurrency(businessRules.minimumOrderValue)}. Agar order value kam
        hai to pickup only apply hoga.
      </div>

      {(Object.keys(categoryLabels) as MealCategory[]).map((category) => (
        <section key={category} aria-labelledby={`${category}-heading`}>
          <h4 id={`${category}-heading`} className="text-sm font-bold uppercase text-[#8a3b18]">
            {categoryLabels[category]}
          </h4>
          <div className="mt-3 grid gap-3 md:grid-cols-2">
            {(groupedItems[category] ?? []).map((item) => {
              const quantity = quantities[item.id] ?? 0;
              return (
                <div
                  key={item.id}
                  className="flex items-center justify-between gap-3 rounded-lg border border-[#ead8bd] bg-[#fffaf2] p-3"
                >
                  <div>
                    <p className="font-semibold text-[#201c18]">{item.name}</p>
                    <p className="text-xs leading-5 text-[#71675d]">{item.description}</p>
                    <p className="mt-1 text-sm font-bold text-[#246b45]">
                      {formatCurrency(item.price)}
                    </p>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center rounded-full border border-[#ead8bd] bg-white"
                      aria-label={`Decrease ${item.name}`}
                      onClick={() => onQuantityChange(item.id, quantity - 1)}
                    >
                      <Minus size={15} aria-hidden="true" />
                    </button>
                    <span className="w-6 text-center text-sm font-bold">{quantity}</span>
                    <button
                      type="button"
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-[#201c18] text-white"
                      aria-label={`Increase ${item.name}`}
                      onClick={() => onQuantityChange(item.id, quantity + 1)}
                    >
                      <Plus size={15} aria-hidden="true" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
