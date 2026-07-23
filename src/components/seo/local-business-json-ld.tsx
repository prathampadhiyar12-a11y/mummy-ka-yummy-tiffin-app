import { businessRules, siteConfig } from "@/lib/content";

export function LocalBusinessJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FoodEstablishment",
    name: siteConfig.name,
    description: siteConfig.mission,
    founder: siteConfig.founder,
    slogan: siteConfig.tagline,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: "Shree Sakti Society, A/7, Vasna Rd, Saiyed Vasna",
      addressLocality: siteConfig.city,
      addressRegion: "Gujarat",
      postalCode: "390007",
      addressCountry: "IN",
    },
    areaServed: {
      "@type": "City",
      name: siteConfig.city,
    },
    servesCuisine: ["Gujarati", "Indian", "Homemade Food", "Tiffin"],
    priceRange: "Rs. 90 - Rs. 3500",
    url: siteConfig.baseUrl,
    image: siteConfig.heroPosterUrl,
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        opens: "10:00",
        closes: "20:30",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Tiffin subscriptions",
      itemListElement: [
        {
          "@type": "Offer",
          name: "Free delivery within 3 km",
          description: `Extra charges apply beyond ${businessRules.freeDeliveryKm} km. Above ${businessRules.serviceRadiusKm} km requires manual confirmation.`,
        },
      ],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
