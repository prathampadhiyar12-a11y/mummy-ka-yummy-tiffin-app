import { ReactNode } from "react";
import { Badge } from "./badge";
import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  children,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("mx-auto max-w-3xl", align === "center" && "text-center")}>
      {eyebrow ? <Badge>{eyebrow}</Badge> : null}
      <h2 className="mt-4 font-serif text-3xl font-semibold leading-tight text-[#201c18] md:text-5xl">
        {title}
      </h2>
      {children ? (
        <p className="mt-4 text-base leading-8 text-[#71675d] md:text-lg">{children}</p>
      ) : null}
    </div>
  );
}
