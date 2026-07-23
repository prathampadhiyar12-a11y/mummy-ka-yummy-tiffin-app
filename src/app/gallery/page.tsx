import type { Metadata } from "next";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/site/page-hero";
import { galleryItems } from "@/lib/content";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Food, kitchen, packaging and behind-the-scenes gallery for Mummy Ka Yummy Tiffin.",
};

export default function GalleryPage() {
  return (
    <>
      <PageHero eyebrow="Gallery" title="Food, kitchen, packaging and behind-the-scenes care.">
        Gallery categories are CMS-managed for food photos, kitchen standards, packaging and
        preparation moments.
      </PageHero>
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2 xl:grid-cols-3">
          {galleryItems.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="relative min-h-[280px]">
                <Image
                  src={item.imageUrl}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="p-5">
                <Badge>{item.category}</Badge>
                <h2 className="mt-3 text-xl font-bold text-[#201c18]">{item.title}</h2>
              </div>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
