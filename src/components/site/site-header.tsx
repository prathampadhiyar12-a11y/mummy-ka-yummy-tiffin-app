"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ShieldCheck, ShoppingBag, X } from "lucide-react";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { navLinks, siteConfig } from "@/lib/content";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-[#ead8bd]/80 bg-[#fffaf2]/92 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex min-w-0 items-center gap-3" aria-label={siteConfig.name}>
          <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white ring-1 ring-[#ead8bd]">
            <Image
              src={siteConfig.logoUrl}
              alt=""
              width={44}
              height={44}
              className="h-11 w-11 object-contain"
              priority
            />
          </span>
          <span className="min-w-0">
            <span className="block truncate font-serif text-xl font-semibold text-[#201c18]">
              {siteConfig.name}
            </span>
            <span className="block truncate text-xs font-medium text-[#8a3b18]">
              {siteConfig.tagline}
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3 py-2 text-sm font-medium text-[#5d5248] transition hover:bg-white hover:text-[#201c18]",
                pathname === link.href && "bg-white text-[#201c18] shadow-sm",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 md:flex">
          <ButtonLink href="/login" variant="secondary">
            <ShieldCheck size={17} aria-hidden="true" />
            Login
          </ButtonLink>
          <ButtonLink href="/choose-your-meal">
            <ShoppingBag size={17} aria-hidden="true" />
            Order Now
          </ButtonLink>
        </div>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[#ead8bd] bg-white text-[#201c18] lg:hidden"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-[#ead8bd] bg-[#fffaf2] px-4 py-4 lg:hidden">
          <nav className="mx-auto grid max-w-7xl gap-2" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-3 text-sm font-semibold text-[#3f372f] hover:bg-white"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 grid gap-2 sm:grid-cols-2">
              <ButtonLink href="/login" variant="secondary" onClick={() => setOpen(false)}>
                <ShieldCheck size={17} aria-hidden="true" />
                Login
              </ButtonLink>
              <ButtonLink href="/choose-your-meal" onClick={() => setOpen(false)}>
                <ShoppingBag size={17} aria-hidden="true" />
                Order Now
              </ButtonLink>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
