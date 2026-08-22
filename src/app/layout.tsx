import type { Metadata } from "next";
import { Geist, Playfair_Display } from "next/font/google";
import "./globals.css";
import { LocalBusinessJsonLd } from "@/components/seo/local-business-json-ld";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { FloatingSocials } from "@/components/site/floating-socials";
import { seoKeywords, siteConfig } from "@/lib/content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  title: {
    default: `${siteConfig.name} | Homemade Tiffin Service in Vadodara`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Healthy and hygienic homemade lunch and dinner tiffin in Vadodara by Mummy Ka Yummy Tiffin. Custom meals, platters, subscriptions and WhatsApp ordering.",
  keywords: seoKeywords,
  applicationName: siteConfig.name,
  authors: [{ name: siteConfig.founder }],
  creator: siteConfig.founder,
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: siteConfig.baseUrl,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | Homemade Tiffin Service in Vadodara`,
    description: siteConfig.shortDescription,
    images: [
      {
        url: siteConfig.heroPosterUrl,
        width: 1200,
        height: 630,
        alt: "Fresh homemade food prepared in a warm kitchen",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} | Homemade Tiffin Service in Vadodara`,
    description: siteConfig.shortDescription,
    images: [siteConfig.heroPosterUrl],
  },
  alternates: {
    canonical: siteConfig.baseUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${playfair.variable} h-full antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="min-h-full bg-background text-foreground">
        <LocalBusinessJsonLd />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <FloatingSocials />
      </body>
    </html>
  );
}
