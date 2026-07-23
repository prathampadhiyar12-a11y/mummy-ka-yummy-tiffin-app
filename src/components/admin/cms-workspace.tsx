"use client";

import { ImagePlus, Plus, Save, Upload } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input, Select, Textarea } from "@/components/ui/input";
import {
  businessRules,
  galleryItems,
  mealItems,
  seoKeywords,
  siteConfig,
  subscriptionPlans,
  testimonials,
  weeklyMenu,
} from "@/lib/content";
import { formatCurrency } from "@/lib/order";
import { GalleryCategory } from "@/lib/types";

const galleryCategoryOptions: GalleryCategory[] = [
  "Food",
  "Kitchen",
  "Packaging",
  "Behind the Scenes",
];

export function CmsWorkspace({ kind }: { kind: string }) {
  const [saved, setSaved] = useState(false);
  const title = useMemo(
    () =>
      kind
        .split("-")
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(" "),
    [kind],
  );

  function save() {
    setSaved(true);
    window.setTimeout(() => setSaved(false), 1600);
  }

  return (
    <div className="grid gap-6">
      <Card className="p-5">
        <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase text-[#8a3b18]">CMS</p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-[#201c18]">{title}</h2>
          </div>
          <Button type="button" onClick={save}>
            <Save size={17} aria-hidden="true" />
            {saved ? "Saved" : "Save Draft"}
          </Button>
        </div>
      </Card>

      {kind === "weekly-menu" ? <WeeklyMenuEditor /> : null}
      {kind === "pricing" ? <PricingEditor /> : null}
      {kind === "gallery" ? <GalleryEditor /> : null}
      {kind === "homepage-cms" ? <HomepageEditor /> : null}
      {kind === "testimonials" ? <TestimonialsEditor /> : null}
      {kind === "seo-settings" ? <SeoEditor /> : null}
      {kind === "general-settings" ? <GeneralSettingsEditor /> : null}
      {kind === "analytics" ? <AnalyticsPanel /> : null}
      {kind === "reports" ? <ReportsPanel /> : null}
    </div>
  );
}

function WeeklyMenuEditor() {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {weeklyMenu.map((day) => (
        <Card key={day.day} className="p-5">
          <h3 className="font-serif text-2xl font-semibold">{day.day}</h3>
          <label className="mt-4 grid gap-2 text-sm font-semibold text-[#3f372f]">
            Lunch
            <Textarea defaultValue={day.lunch.join("\n")} />
          </label>
          <label className="mt-4 grid gap-2 text-sm font-semibold text-[#3f372f]">
            Dinner
            <Textarea defaultValue={day.dinner.join("\n")} />
          </label>
        </Card>
      ))}
    </div>
  );
}

function PricingEditor() {
  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_0.8fr]">
      <Card className="p-5">
        <h3 className="font-serif text-2xl font-semibold">Meal item pricing</h3>
        <div className="mt-5 grid gap-3">
          {mealItems.map((item) => (
            <div key={item.id} className="grid gap-3 rounded-lg border border-[#ead8bd] p-3 sm:grid-cols-[1fr_120px]">
              <Input defaultValue={item.name} aria-label={`${item.name} name`} />
              <Input defaultValue={item.price} type="number" aria-label={`${item.name} price`} />
            </div>
          ))}
        </div>
      </Card>
      <Card className="p-5">
        <h3 className="font-serif text-2xl font-semibold">Discount rules</h3>
        <div className="mt-5 grid gap-3">
          {subscriptionPlans.map((plan) => (
            <label key={plan.id} className="grid gap-2 text-sm font-semibold text-[#3f372f]">
              {plan.name}
              <Input defaultValue={plan.discountPercent} type="number" />
            </label>
          ))}
          <label className="grid gap-2 text-sm font-semibold text-[#3f372f]">
            Deposit
            <Input defaultValue={businessRules.depositAmount} type="number" />
          </label>
        </div>
      </Card>
    </div>
  );
}

function GalleryEditor() {
  const [items, setItems] = useState(galleryItems);
  const [title, setTitle] = useState("");
  const [alt, setAlt] = useState("");
  const [category, setCategory] = useState<GalleryCategory>("Food");
  const [imageUrl, setImageUrl] = useState("");
  const [fileName, setFileName] = useState("");
  const [status, setStatus] = useState("");

  async function addGalleryItem() {
    setStatus("");
    if (!title.trim()) {
      setStatus("Title required.");
      return;
    }

    const newItem = {
      id: `draft-${Date.now()}`,
      category,
      title: title.trim(),
      alt: alt.trim() || title.trim(),
      imageUrl:
        imageUrl.trim() ||
        "https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?auto=format&fit=crop&w=1400&q=85",
    };

    const response = await fetch("/api/admin/gallery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newItem),
    });

    if (!response.ok) {
      setStatus("Saved in preview only. Login/backend storage may need configuration.");
    } else {
      setStatus("New gallery item added.");
    }

    setItems((current) => [newItem, ...current]);
    setTitle("");
    setAlt("");
    setImageUrl("");
    setFileName("");
  }

  return (
    <div className="grid gap-6">
      <Card className="p-5">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fff4df] text-[#e9682c]">
            <Plus size={20} aria-hidden="true" />
          </span>
          <div>
            <h3 className="font-serif text-2xl font-semibold">Add New Photo</h3>
            <p className="text-sm text-[#71675d]">
              Upload-ready CMS form. Add title, category, alt text and storage URL.
            </p>
          </div>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="mt-4 grid gap-2 text-sm font-semibold text-[#3f372f]">
            Title
            <Input value={title} onChange={(event) => setTitle(event.target.value)} />
          </label>
          <label className="mt-4 grid gap-2 text-sm font-semibold text-[#3f372f]">
            Category
            <Select value={category} onChange={(event) => setCategory(event.target.value as GalleryCategory)}>
              {galleryCategoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
          </label>
          <label className="mt-4 grid gap-2 text-sm font-semibold text-[#3f372f]">
            Alt text
            <Input value={alt} onChange={(event) => setAlt(event.target.value)} />
          </label>
          <label className="mt-4 grid gap-2 text-sm font-semibold text-[#3f372f]">
            Image URL
            <Input
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              placeholder="Cloudinary or Supabase Storage URL"
            />
          </label>
          <label className="mt-4 grid gap-2 text-sm font-semibold text-[#3f372f] md:col-span-2">
            Upload photo
            <span className="flex min-h-24 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[#d9c3a7] bg-[#fffaf2] px-4 py-5 text-center text-sm text-[#71675d]">
              <Upload className="mb-2 text-[#e9682c]" aria-hidden="true" />
              {fileName || "Choose image file. Production upload can connect to Cloudinary/Supabase Storage."}
              <input
                className="sr-only"
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={(event) => setFileName(event.target.files?.[0]?.name ?? "")}
              />
            </span>
          </label>
        </div>
        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button type="button" onClick={addGalleryItem}>
            <Plus size={17} aria-hidden="true" />
            Add New
          </Button>
          {status ? <p className="text-sm font-semibold text-[#71675d]">{status}</p> : null}
        </div>
      </Card>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {items.map((item) => (
          <Card key={item.id} className="p-5">
            <div className="flex items-center gap-3">
              <ImagePlus className="text-[#e9682c]" aria-hidden="true" />
              <p className="font-bold">{item.category}</p>
            </div>
            <label className="mt-4 grid gap-2 text-sm font-semibold text-[#3f372f]">
              Title
              <Input defaultValue={item.title} />
            </label>
            <label className="mt-4 grid gap-2 text-sm font-semibold text-[#3f372f]">
              Image URL
              <Textarea defaultValue={item.imageUrl} />
            </label>
          </Card>
        ))}
      </div>
    </div>
  );
}

function HomepageEditor() {
  return (
    <Card className="p-5">
      <h3 className="font-serif text-2xl font-semibold">Homepage content</h3>
      <div className="mt-5 grid gap-4">
        <label className="grid gap-2 text-sm font-semibold text-[#3f372f]">
          Hero video URL
          <Input defaultValue={siteConfig.heroVideoUrl} placeholder="Cloudinary video URL" />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-[#3f372f]">
          Hero headline
          <Textarea defaultValue="Fresh Homemade Food, Cooked With Love, Delivered Daily." />
        </label>
        <label className="grid gap-2 text-sm font-semibold text-[#3f372f]">
          Mission
          <Textarea defaultValue={siteConfig.mission} />
        </label>
      </div>
    </Card>
  );
}

function TestimonialsEditor() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {testimonials.map((testimonial) => (
        <Card key={testimonial.id} className="p-5">
          <Input defaultValue={testimonial.name} aria-label={`${testimonial.name} name`} />
          <Input className="mt-3" defaultValue={testimonial.rating} type="number" aria-label="Rating" />
          <Textarea className="mt-3" defaultValue={testimonial.quote} aria-label="Quote" />
        </Card>
      ))}
    </div>
  );
}

function SeoEditor() {
  return (
    <Card className="p-5">
      <h3 className="font-serif text-2xl font-semibold">Local SEO settings</h3>
      <div className="mt-5 grid gap-4">
        <Textarea defaultValue={seoKeywords.join("\n")} aria-label="SEO keywords" />
        <Input defaultValue={siteConfig.baseUrl} aria-label="Canonical URL" />
        <Textarea defaultValue="Schema.org FoodEstablishment, Open Graph, Twitter Cards, sitemap and robots are configured in app code." />
      </div>
    </Card>
  );
}

function GeneralSettingsEditor() {
  return (
    <Card className="p-5">
      <h3 className="font-serif text-2xl font-semibold">Business profile</h3>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <Input defaultValue={siteConfig.name} aria-label="Business name" />
        <Input defaultValue={siteConfig.founder} aria-label="Founder" />
        <Input defaultValue={siteConfig.phone} aria-label="Phone" />
        <Input defaultValue={siteConfig.email} aria-label="Email" />
        <Input defaultValue={siteConfig.instagramUrl} aria-label="Instagram" />
        <Input defaultValue={siteConfig.mapUrl} aria-label="Google map link" />
        <Input defaultValue={businessRules.freeDeliveryKm} type="number" aria-label="Free delivery km" />
        <Input defaultValue={businessRules.serviceRadiusKm} type="number" aria-label="Service radius km" />
        <Input defaultValue={businessRules.lunchOrderCutoff} aria-label="Lunch order cutoff" />
        <Input defaultValue={businessRules.dinnerOrderCutoff} aria-label="Dinner order cutoff" />
      </div>
    </Card>
  );
}

function AnalyticsPanel() {
  const metrics = [
    ["Today's revenue", formatCurrency(5817)],
    ["Today's customers", "32"],
    ["Pending orders", "7"],
    ["Confirmed orders", "25"],
  ];

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {metrics.map(([label, value]) => (
        <Card key={label} className="p-5">
          <p className="text-sm font-semibold text-[#71675d]">{label}</p>
          <p className="mt-2 text-3xl font-bold text-[#201c18]">{value}</p>
        </Card>
      ))}
    </div>
  );
}

function ReportsPanel() {
  return (
    <Card className="p-5">
      <h3 className="font-serif text-2xl font-semibold">Operational reports</h3>
      <div className="mt-5 grid gap-3 text-sm text-[#5d5248]">
        <p>Revenue report: daily, weekly and monthly totals.</p>
        <p>Orders report: pending, paid, confirmed, completed and rejected.</p>
        <p>Customer report: active, pending and archived customer records.</p>
      </div>
    </Card>
  );
}
