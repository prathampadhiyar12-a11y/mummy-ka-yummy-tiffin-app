import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";

export function PageHero({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <section className="soft-grid border-b border-[#ead8bd] px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <Badge>{eyebrow}</Badge>
        <h1 className="mt-5 max-w-4xl font-serif text-4xl font-semibold leading-tight text-[#201c18] md:text-6xl">
          {title}
        </h1>
        {children ? <p className="mt-5 max-w-3xl text-lg leading-8 text-[#71675d]">{children}</p> : null}
      </div>
    </section>
  );
}
