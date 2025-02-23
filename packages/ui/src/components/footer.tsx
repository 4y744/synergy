import { ComponentProps, forwardRef } from "react";

import { cn } from "@synergy/utils";

type FooterProps = Readonly<ComponentProps<"footer">>;

export const Footer = forwardRef<HTMLDivElement, FooterProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <footer
        className={cn(
          "flex justify-center w-full p-8 border-t border-t-border",
          className
        )}
        ref={ref}
        {...props}
      >
        <div className={cn("w-fit flex flex-wrap gap-12", className)}>
          {children}
        </div>
      </footer>
    );
  }
);
Footer.displayName = "Footer";

type FooterGroupProps = Readonly<ComponentProps<"section">>;

export const FooterGroup = forwardRef<HTMLDivElement, FooterGroupProps>(
  ({ className, ...props }, ref) => {
    return (
      <section
        className={cn("space-y-2 min-w-64", className)}
        ref={ref}
        {...props}
      />
    );
  }
);
FooterGroup.displayName = "FooterGroup";

type FooterLabelProps = Readonly<ComponentProps<"span">>;

export const FooterLabel = forwardRef<HTMLSpanElement, FooterLabelProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        className={cn("font-bold", className)}
        ref={ref}
        {...props}
      />
    );
  }
);
FooterLabel.displayName = "FooterLabel";

type FooterItemProps = Readonly<ComponentProps<"div">>;

export const FooterItem = forwardRef<HTMLDivElement, FooterItemProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "text-sm text-muted-foreground hover:underline cursor-pointer",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
FooterItem.displayName = "FooterItem";
