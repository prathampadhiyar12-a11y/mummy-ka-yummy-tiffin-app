import Link from "next/link";
import { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost" | "dark";

const variants: Record<Variant, string> = {
  primary:
    "bg-[#e9682c] text-white hover:bg-[#c85220] focus-visible:outline-[#e9682c]",
  secondary:
    "border border-[#e8d4ba] bg-white/80 text-[#26221d] hover:border-[#e9682c] hover:bg-white focus-visible:outline-[#e9682c]",
  ghost:
    "text-[#3f372f] hover:bg-[#fff4df] focus-visible:outline-[#e9682c]",
  dark:
    "bg-[#201c18] text-white hover:bg-[#3a312a] focus-visible:outline-[#201c18]",
};

const baseClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-55";

export function buttonClasses(variant: Variant = "primary", className?: string) {
  return cn(baseClass, variants[variant], className);
}

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  children: ReactNode;
  variant?: Variant;
}) {
  return (
    <Link href={href} className={buttonClasses(variant, className)} {...props}>
      {children}
    </Link>
  );
}

export function Button({
  children,
  variant = "primary",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: Variant;
}) {
  return (
    <button className={buttonClasses(variant, className)} {...props}>
      {children}
    </button>
  );
}
