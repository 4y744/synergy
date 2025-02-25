import { ComponentProps, forwardRef } from "react";

import { cn } from "@synergy/utils";

type LogoProps = Readonly<Omit<ComponentProps<"span">, "children">>;

export const Logo = forwardRef<HTMLSpanElement, LogoProps>(
  ({ className, ...props }: LogoProps, ref) => {
    return (
      <span
        className={cn("font-arcade text-2xl text-center", className)}
        ref={ref}
        {...props}
      >
        synergy
      </span>
    );
  }
);
Logo.displayName = "Logo";
