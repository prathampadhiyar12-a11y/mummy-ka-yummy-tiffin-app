import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Clock,
  Heart,
  MapPin,
  MessageCircle,
  ShieldCheck,
  Sparkles,
  Star,
  Truck,
  Utensils,
} from "lucide-react";
import { FadeIn } from "@/components/motion/fade-in";
import { Badge } from "@/components/ui/badge";
import { ButtonLink } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/ui/section-heading";
import {
  businessRules,
  deliveryAreas,
  faqs,
  galleryItems,
  platterOptions,
  siteConfig,
  subscriptionPlans,
  testimonials,
  weeklyMenu,
} from "@/lib/content";
import { formatCurrency } from "@/lib/order";

export function HeroSection() {
  return (
    <section className="relative isolate min-h-[calc(100svh-80px)] overflow-hidden bg-[#201c18]">
      {siteConfig.heroVideoUrl ? (
        <video
          autoPlay
          muted
          loop
          playsInline
          src={siteConfig.heroVideoUrl}
          poster={siteConfig.heroPosterUrl}
          className="absolute inset-0 h-full w-full object-cover opacity-90"
        >
          <source src={siteConfig.heroVideoUrl} type="video/mp4" />
        </video>
      ) : (
        <>
          <Image
            src={siteConfig.heroPosterUrl}
            alt="A warm kitchen preparing fresh homemade food"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </>
      )}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(32,28,24,0.65),rgba(32,28,24,0.30),rgba(32,28,24,0.10))]" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-[linear-gradient(0deg,#fffaf2,transparent)]" />

      <div className="relative mx-auto flex min-h-[calc(100svh-80px)] max-w-7xl items-center px-4 py-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl text-white">
          <FadeIn>
            <Badge className="border-white/20 bg-white/12 text-white backdrop-blur">
              {siteConfig.usp}
            </Badge>
            <h1 className="mt-6 font-serif text-5xl font-semibold leading-tight md:text-7xl">
              Fresh Homemade Food, Cooked With Love, Delivered Daily.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-white/82">
              {siteConfig.shortDescription}
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/choose-your-meal">
                Order Now
                <ArrowRight size={17} aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/weekly-menu" variant="secondary">
                Explore Weekly Menu
              </ButtonLink>
            </div>
          </FadeIn>
        </div>


      </div>
    </section>
  );
}


export function WeeklyMenuPreview() {
  return (
    <section id="weekly-menu" className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Weekly Menu" title="Daily comfort, planned with care.">
            Lunch and dinner menus are editable from the admin CMS and designed for freshness,
            rotation and familiar homemade taste.
          </SectionHeading>
          <ButtonLink href="/weekly-menu" variant="secondary">
            View Full Menu
            <CalendarDays size={17} aria-hidden="true" />
          </ButtonLink>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {weeklyMenu.slice(0, 6).map((day, index) => (
            <FadeIn key={day.day} delay={index * 0.04}>
              <Card className="h-full p-5">
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-serif text-2xl font-semibold">{day.day}</h3>
                  <Badge>{day.closed ? "Closed" : "Lunch + Dinner"}</Badge>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-2">
                  <MenuBlock title="Lunch" items={day.lunch} />
                  <MenuBlock title="Dinner" items={day.dinner} />
                </div>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function MenuBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-sm font-bold text-[#8a3b18]">{title}</p>
      <ul className="mt-2 space-y-2 text-sm leading-6 text-[#5d5248]">
        {items.slice(0, 4).map((item) => (
          <li key={item} className="flex gap-2">
            <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-[#246b45]" aria-hidden="true" />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function MealCategoriesSection() {
  const categories = [
    {
      href: "/choose-your-meal#custom",
      title: "Customize Your Meal",
      price: "Build your plate",
      copy: "Select roti, rice, dal, kathod, sabji, salad, chaas, sweet and special instructions.",
      icon: Sparkles,
    },
    {
      href: "/choose-your-meal#mini",
      title: "Mini Platter",
      price: formatCurrency(platterOptions.mini.basePrice),
      copy: "Two compact combinations for lighter lunches and everyday office meals.",
      icon: Utensils,
    },
    {
      href: "/choose-your-meal#full",
      title: "Full Platter",
      price: formatCurrency(platterOptions.full.basePrice),
      copy: "A complete thali with kathod, vegetable, dal rice, salad and six rotis.",
      icon: Heart,
    },
  ];

  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Meal Categories" title="Choose the plan that fits your day." align="center">
          From a quick mini platter to a full subscription routine, the ordering flow stays simple
          and the admin team keeps pricing editable.
        </SectionHeading>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <FadeIn key={category.href} delay={index * 0.05}>
                <Link
                  href={category.href}
                  className="group block h-full rounded-lg border border-[#ead8bd] bg-[#fffaf2] p-6 transition hover:-translate-y-1 hover:border-[#e9682c] hover:bg-white hover:shadow-xl hover:shadow-[#5b3b2417]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#201c18] text-white">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className="mt-6 font-serif text-3xl font-semibold text-[#201c18]">
                    {category.title}
                  </h3>
                  <p className="mt-2 text-lg font-bold text-[#246b45]">{category.price}</p>
                  <p className="mt-3 text-sm leading-7 text-[#71675d]">{category.copy}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-[#e9682c]">
                    Start order <ArrowRight size={16} aria-hidden="true" />
                  </span>
                </Link>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function WhyChooseUsSection() {
  const points = [
    { icon: Heart, title: "Homemade warmth", copy: "Food that feels emotional, familiar and gentle." },
    { icon: ShieldCheck, title: "Hygienic kitchen", copy: "Clean prep, sealed packing and consistent handling." },
    { icon: Clock, title: "Daily reliability", copy: "Subscriptions built for lunch and dinner routines." },
    { icon: MapPin, title: "Vadodara focused", copy: "Local SEO, delivery rules and service areas are city-first." },
  ];

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Why Choose Us" title="Premium where it matters, simple where it should be.">
          The website is built around trust: clear plans, transparent pricing, fast WhatsApp
          checkout and admin-managed content.
        </SectionHeading>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {points.map((point, index) => {
            const Icon = point.icon;
            return (
              <FadeIn key={point.title} delay={index * 0.04}>
                <Card className="h-full p-5">
                  <Icon className="h-8 w-8 text-[#e9682c]" aria-hidden="true" />
                  <h3 className="mt-5 text-lg font-bold text-[#201c18]">{point.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-[#71675d]">{point.copy}</p>
                </Card>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export function JourneySection() {
  return (
    <section className="bg-[#201c18] px-4 py-20 text-white sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <FadeIn>
          <div className="relative min-h-[420px] overflow-hidden rounded-lg">
            <Image
              src={siteConfig.storyImageUrl}
              alt="Founder preparing fresh homemade food"
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(32,28,24,0.38),transparent)]" />
          </div>
        </FadeIn>
        <FadeIn delay={0.08}>
          <Badge className="border-white/20 bg-white/10 text-white">Our Journey</Badge>
          <h2 className="mt-5 font-serif text-4xl font-semibold leading-tight md:text-5xl">
            Started {siteConfig.startedYearsAgo} years ago by {siteConfig.founder}, shaped by the feeling of home.
          </h2>
          <p className="mt-5 text-lg leading-8 text-white/76">
            Mummy Ka Yummy Tiffin was born when regular tiffin food did not feel like ghar ka
            taste. Rinku Padhiyar started it with a simple promise: healthy, hygienic and
            homemade meals that reach your doorstep with consistency and care.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg border border-white/12 bg-white/8 p-4">
              <p className="text-3xl font-bold text-[#e9682c]">1000+</p>
              <p className="mt-1 text-sm font-medium text-white/80">Happy Deliveries</p>
            </div>
            <div className="rounded-lg border border-white/12 bg-white/8 p-4">
              <p className="text-3xl font-bold text-[#e9682c]">4.7 ★</p>
              <p className="mt-1 text-sm font-medium text-white/80">Rating on Google Map</p>
            </div>
            <div className="rounded-lg border border-white/12 bg-white/8 p-4">
              <p className="text-3xl font-bold text-[#e9682c]">2+ Years</p>
              <p className="mt-1 text-sm font-medium text-white/80">Of Experience</p>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

export function DeliveryDetailsSection() {
  const details = [
    { icon: Truck, label: "Free delivery", value: `Up to ${businessRules.freeDeliveryKm} km` },
    { icon: MapPin, label: "Manual confirmation", value: `Above ${businessRules.serviceRadiusKm} km` },
    { icon: Clock, label: "Lunch order", value: `Till ${businessRules.lunchOrderCutoff}` },
    { icon: Clock, label: "Dinner order", value: `Till ${businessRules.dinnerOrderCutoff}` },
  ];

  return (
    <section className="bg-[#fff4df] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Delivery Details" title="Clear timing and delivery rules." align="center">
          Pickup is available for everyone. Delivery needs a minimum order value of{" "}
          {formatCurrency(businessRules.minimumOrderValue)} and Sunday tiffin service is closed.
        </SectionHeading>
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {details.map((detail) => {
            const Icon = detail.icon;
            return (
              <Card key={detail.label} className="p-5">
                <Icon className="h-7 w-7 text-[#e9682c]" aria-hidden="true" />
                <p className="mt-4 text-sm font-semibold text-[#71675d]">{detail.label}</p>
                <p className="mt-1 text-xl font-bold text-[#201c18]">{detail.value}</p>
              </Card>
            );
          })}
        </div>
        <Card className="mt-6 p-5">
          <p className="text-sm font-bold uppercase text-[#8a3b18]">Nearby delivery areas</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {deliveryAreas.map((area) => (
              <span key={area} className="rounded-full bg-white px-3 py-1 text-sm font-semibold text-[#5d5248]">
                {area}
              </span>
            ))}
          </div>
          <p className="mt-5 text-sm leading-7 text-[#71675d]">{businessRules.holidayNotice}</p>
        </Card>
      </div>
    </section>
  );
}

export function SubscriptionSection() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Subscriptions" title="Flexible plans with clear savings." align="center">
          Deposits apply only to recurring plans. Discounts and deposit amounts are CMS/database
          ready and editable from pricing controls.
        </SectionHeading>
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {subscriptionPlans.map((plan, index) => (
            <FadeIn key={plan.id} delay={index * 0.04}>
              <Card className="h-full p-5">
                <Badge>{plan.label}</Badge>
                <h3 className="mt-5 font-serif text-3xl font-semibold">{plan.name}</h3>
                <p className="mt-3 text-4xl font-bold text-[#246b45]">
                  {plan.discountPercent}%
                </p>
                <p className="mt-2 text-sm text-[#71675d]">discount on meal value</p>
                <p className="mt-5 rounded-lg bg-[#fff4df] p-3 text-sm font-semibold text-[#5d5248]">
                  {plan.depositRequired
                    ? `${formatCurrency(businessRules.depositAmount)} refundable deposit`
                    : "No deposit required"}
                </p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export function GalleryPreview() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Gallery" title="Fresh food, clean packing, daily care.">
            The gallery is categorized for food, kitchen, packaging and behind-the-scenes content.
          </SectionHeading>
          <ButtonLink href="/gallery" variant="secondary">
            View Gallery
          </ButtonLink>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {galleryItems.slice(0, 6).map((item, index) => (
            <FadeIn key={item.id} delay={index * 0.03}>
              <div className="group relative min-h-[260px] overflow-hidden rounded-lg">
                <Image
                  src={item.imageUrl}
                  alt={item.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  className="object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[linear-gradient(0deg,rgba(32,28,24,0.62),transparent)]" />
                <div className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <p className="text-xs font-semibold uppercase">{item.category}</p>
                  <p className="mt-1 text-lg font-bold">{item.title}</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export function TestimonialsSection() {
  return (
    <section className="bg-[#fff4df] px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <SectionHeading eyebrow="Google Reviews" title="Trusted by everyday Vadodara routines." align="center">
          Review cards are ready for Google Reviews integration and can fall back to curated CMS
          testimonials when an API feed is unavailable.
        </SectionHeading>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <FadeIn key={testimonial.id} delay={index * 0.05}>
              <Card className="h-full p-6">
                <div className="flex gap-1 text-[#e9682c]" aria-label={`${testimonial.rating} star rating`}>
                  {Array.from({ length: testimonial.rating }).map((_, starIndex) => (
                    <Star key={starIndex} size={17} fill="currentColor" aria-hidden="true" />
                  ))}
                </div>
                <p className="mt-5 text-base leading-8 text-[#3f372f]">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <p className="mt-5 font-bold text-[#201c18]">{testimonial.name}</p>
                <p className="text-sm text-[#71675d]">{testimonial.role}</p>
              </Card>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FaqSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <SectionHeading eyebrow="FAQ" title="Simple answers before you order." align="center" />
        <div className="mt-10 divide-y divide-[#ead8bd] rounded-lg border border-[#ead8bd] bg-white">
          {faqs.map((faq) => (
            <details key={faq.question} className="group p-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-bold text-[#201c18]">
                {faq.question}
                <span className="text-[#e9682c] group-open:rotate-90">+</span>
              </summary>
              <p className="mt-3 text-sm leading-7 text-[#71675d]">{faq.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
        <SectionHeading eyebrow="Contact" title="Ready for ghar jaisa khana?">
          Delivery is free within {businessRules.freeDeliveryKm} km. Outside{" "}
          {businessRules.serviceRadiusKm} km, orders stay pending until confirmation from the
          business.
        </SectionHeading>
        <Card className="p-6">
          <div className="grid gap-4 text-sm text-[#5d5248]">
            <span className="flex items-center gap-3">
              <MessageCircle className="text-[#246b45]" aria-hidden="true" /> WhatsApp: {siteConfig.phone}
            </span>
            <span className="flex items-center gap-3">
              <MapPin className="text-[#246b45]" aria-hidden="true" /> {siteConfig.address}
            </span>
            <span className="flex items-center gap-3">
              <Clock className="text-[#246b45]" aria-hidden="true" /> Lunch till{" "}
              {businessRules.lunchOrderCutoff}, dinner till {businessRules.dinnerOrderCutoff}
            </span>
          </div>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <ButtonLink href="/choose-your-meal">
              Build Meal
              <ArrowRight size={17} aria-hidden="true" />
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              Contact Details
            </ButtonLink>
            <a
              href={siteConfig.mapUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-full border border-[#e8d4ba] bg-white/80 px-5 py-2.5 text-sm font-semibold text-[#26221d] transition hover:border-[#e9682c] hover:bg-white"
            >
              View Map
            </a>
          </div>
        </Card>
      </div>
    </section>
  );
}
