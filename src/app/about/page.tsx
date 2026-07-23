import type { Metadata } from "next";
import Image from "next/image";
import { Heart, Leaf, ShieldCheck, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/site/page-hero";
import { siteConfig } from "@/lib/content";

export const metadata: Metadata = {
  title: "About",
  description: "The story of Rinku Padhiyar and Mummy Ka Yummy Tiffin in Vadodara.",
};

export default function AboutPage() {
  const values = [
    { icon: Heart, title: "Home", copy: "Meals shaped around comfort, routine and familiar taste." },
    { icon: Leaf, title: "Freshness", copy: "Menus rotate through seasonal vegetables and daily prep." },
    { icon: ShieldCheck, title: "Trust", copy: "Clear pricing, hygiene focus and simple payment confirmation." },
    { icon: Sparkles, title: "Consistency", copy: "Subscriptions make daily meals reliable for busy lives." },
  ];

  return (
    <>
      <PageHero eyebrow="About Us" title="A tiffin service built from care, not shortcuts.">
        {siteConfig.name} was started {siteConfig.startedYearsAgo} years ago by{" "}
        {siteConfig.founder} to bring healthy, hygienic and homemade food to Vadodara families,
        students and working professionals.
      </PageHero>
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div className="relative min-h-[480px] overflow-hidden rounded-lg">
            <Image
              src={siteConfig.storyImageUrl}
              alt="Fresh homemade food being prepared"
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-sm font-bold uppercase text-[#8a3b18]">Founder Story</p>
            <h2 className="mt-4 font-serif text-4xl font-semibold leading-tight text-[#201c18] md:text-5xl">
              Rinku Padhiyar created the kitchen because regular tiffin food was not tasting like home.
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#71675d]">
              That gap became the birth of Mummy Ka Yummy Tiffin. The promise is simple:
              healthy and homemade food at your doorstep, clear ordering on WhatsApp and payment
              confirmation through the admin-managed workflow.
            </p>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Card className="p-5">
                <p className="text-sm font-bold uppercase text-[#8a3b18]">Mission</p>
                <p className="mt-3 text-sm leading-7 text-[#71675d]">{siteConfig.mission}</p>
              </Card>
              <Card className="p-5">
                <p className="text-sm font-bold uppercase text-[#8a3b18]">Vision</p>
                <p className="mt-3 text-sm leading-7 text-[#71675d]">{siteConfig.vision}</p>
              </Card>
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {values.map((value) => {
                const Icon = value.icon;
                return (
                  <Card key={value.title} className="p-5">
                    <Icon className="h-7 w-7 text-[#e9682c]" aria-hidden="true" />
                    <h3 className="mt-4 text-lg font-bold">{value.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-[#71675d]">{value.copy}</p>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
