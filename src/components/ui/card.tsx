import { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Card({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement> & { children: ReactNode }) {
  return (
    <div
      className={cn(
        "rounded-lg border border-[#ead8bd] bg-white/88 shadow-sm shadow-[#5b3b2412]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
