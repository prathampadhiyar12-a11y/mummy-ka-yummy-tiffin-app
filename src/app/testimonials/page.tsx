import type { Metadata } from "next";
import { Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { PageHero } from "@/components/site/page-hero";
import { testimonials } from "@/lib/content";

export const metadata: Metadata = {
  title: "Testimonials",
  description: "Customer reviews and testimonials for homemade tiffin subscriptions in Vadodara.",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageHero eyebrow="Testimonials" title="Customers choose the comfort, then stay for consistency.">
        Google Reviews integration is supported by the CMS architecture with manual testimonial
        fallback for launch.
      </PageHero>
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="p-6">
              <div className="flex gap-1 text-[#e9682c]" aria-label={`${testimonial.rating} star rating`}>
                {Array.from({ length: testimonial.rating }).map((_, index) => (
                  <Star key={index} size={17} fill="currentColor" aria-hidden="true" />
                ))}
              </div>
              <p className="mt-5 text-base leading-8 text-[#3f372f]">&ldquo;{testimonial.quote}&rdquo;</p>
              <p className="mt-5 font-bold">{testimonial.name}</p>
              <p className="text-sm text-[#71675d]">{testimonial.role}</p>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}
