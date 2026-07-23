import { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-[#ead8bd] bg-[#fff4df] px-3 py-1 text-xs font-semibold text-[#8a3b18]",
        className,
      )}
    >
      {children}
    </span>
  );
}
