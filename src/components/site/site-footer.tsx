import Image from "next/image";
import Link from "next/link";
import { Camera, Mail, MapPin, Phone } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { navLinks, siteConfig } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-[#ead8bd] bg-[#201c18] text-white">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.2fr_0.8fr_0.8fr] lg:px-8">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-full bg-white">
              <Image src={siteConfig.logoUrl} alt="" width={52} height={52} className="object-contain" />
            </span>
            <p className="font-serif text-3xl font-semibold">{siteConfig.name}</p>
          </div>
          <p className="mt-3 max-w-md text-sm leading-7 text-[#f4dec2]">
            {siteConfig.shortDescription} Built for daily trust, simple subscriptions and warm
            homemade meals across {siteConfig.city}.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <ButtonLink href="/choose-your-meal">Order on WhatsApp</ButtonLink>
            <ButtonLink href="/admin" variant="secondary">
              Admin Panel
            </ButtonLink>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-[#f4dec2]">Website</p>
          <div className="mt-4 grid gap-2">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className="text-sm text-white/78 hover:text-white">
                {link.label}
              </Link>
            ))}
            <Link href="/dashboard" className="text-sm text-white/78 hover:text-white">
              Customer Dashboard
            </Link>
          </div>
        </div>

        <div>
          <p className="text-sm font-semibold text-[#f4dec2]">Contact</p>
          <div className="mt-4 grid gap-3 text-sm text-white/78">
            <a href={`tel:${siteConfig.phone.replaceAll(" ", "")}`} className="flex items-center gap-2 hover:text-white">
              <Phone size={16} aria-hidden="true" /> {siteConfig.phone}
            </a>
            <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-2 hover:text-white">
              <Mail size={16} aria-hidden="true" /> {siteConfig.email}
            </a>
            <a href={siteConfig.mapUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white">
              <MapPin size={16} aria-hidden="true" /> {siteConfig.address}
            </a>
            <a href={siteConfig.instagramUrl} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-white">
              <Camera size={16} aria-hidden="true" /> @mummy_ka_yummy_tiffin
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-white/58">
        Copyright 2026 {siteConfig.name}. Homemade tiffin subscriptions for Vadodara.
      </div>
    </footer>
  );
}
