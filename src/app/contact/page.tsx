import type { Metadata } from "next";
import { Camera, Clock, Mail, MapPin, MessageCircle, Phone, Truck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/site/page-hero";
import { businessRules, deliveryAreas, siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Mummy Ka Yummy Tiffin for homemade tiffin service in Vadodara.",
};

export default function ContactPage() {
  const details = [
    { icon: Phone, label: "Phone", value: siteConfig.phone, href: `tel:${siteConfig.phone.replaceAll(" ", "")}` },
    { icon: MessageCircle, label: "WhatsApp", value: siteConfig.phone, href: `https://wa.me/${siteConfig.whatsappNumber}` },
    { icon: Mail, label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
    { icon: MapPin, label: "Google Map", value: siteConfig.address, href: siteConfig.mapUrl },
    { icon: Camera, label: "Instagram", value: "@mummy_ka_yummy_tiffin", href: siteConfig.instagramUrl },
    { icon: Clock, label: "Order Timing", value: `Lunch till ${businessRules.lunchOrderCutoff}, dinner till ${businessRules.dinnerOrderCutoff}` },
  ];

  return (
    <>
      <PageHero eyebrow="Contact" title="Order, ask, or confirm your service area.">
        Free delivery applies within {businessRules.freeDeliveryKm} km. For addresses outside{" "}
        {businessRules.serviceRadiusKm} km, the order stays pending until manual confirmation.
      </PageHero>
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 xl:grid-cols-3">
          {details.map((detail) => {
            const Icon = detail.icon;
            const content = (
              <Card key={detail.label} className="p-6">
                <Icon className="h-7 w-7 text-[#e9682c]" aria-hidden="true" />
                <p className="mt-4 text-sm font-bold uppercase text-[#8a3b18]">{detail.label}</p>
                <p className="mt-2 text-xl font-semibold text-[#201c18]">{detail.value}</p>
              </Card>
            );

            return detail.href ? (
              <a key={detail.label} href={detail.href} target={detail.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer">
                {content}
              </a>
            ) : (
              content
            );
          })}
        </div>
        <Card className="mx-auto mt-6 max-w-7xl p-6">
          <div className="flex items-center gap-3">
            <Truck className="h-7 w-7 text-[#e9682c]" aria-hidden="true" />
            <div>
              <p className="text-sm font-bold uppercase text-[#8a3b18]">Delivery Areas</p>
              <p className="mt-1 text-sm leading-7 text-[#71675d]">
                Free delivery till {businessRules.freeDeliveryKm} km. Extra charges apply after
                that. Pickup is available for everyone. Sunday tiffin service is closed.
              </p>
            </div>
          </div>
          <div className="mt-5 flex flex-wrap gap-2">
            {deliveryAreas.map((area) => (
              <span key={area} className="rounded-full bg-[#fff4df] px-3 py-1 text-sm font-semibold text-[#5d5248]">
                {area}
              </span>
            ))}
          </div>
          <p className="mt-5 text-sm leading-7 text-[#71675d]">{businessRules.holidayNotice}</p>
        </Card>
        <div className="mx-auto mt-8 flex max-w-7xl flex-col gap-3 sm:flex-row">
          <ButtonLink href="/choose-your-meal">Order Now</ButtonLink>
          <ButtonLink href="/weekly-menu" variant="secondary">
            Weekly Menu
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
