import { cn } from "@synergy/utils";
import { ComponentProps } from "react";

type FooterProps = Readonly<ComponentProps<"footer">>;

export const Footer = ({ children, className, ...props }: FooterProps) => {
  return (
    <footer
      className={cn(
        "flex justify-center w-full p-8 border-t border-t-border",
        className
      )}
      {...props}
    >
      <div className={cn("w-fit flex flex-wrap gap-12", className)}>
        {children}
      </div>
    </footer>
  );
};
Footer.displayName = "Footer";

type FooterGroupProps = Readonly<ComponentProps<"section">>;

export const FooterGroup = ({ className, ...props }: FooterGroupProps) => {
  return (
    <section
      className={cn("space-y-2 min-w-64", className)}
      {...props}
    />
  );
};
FooterGroup.displayName = "FooterGroup";

type FooterLabelProps = Readonly<ComponentProps<"span">>;

export const FooterLabel = ({ className, ...props }: FooterLabelProps) => {
  return (
    <span
      className={cn("font-bold", className)}
      {...props}
    />
  );
};
FooterLabel.displayName = "FooterLabel";

type FooterItemProps = Readonly<ComponentProps<"div">>;

export const FooterItem = ({ className, ...props }: FooterItemProps) => {
  return (
    <div
      className={cn(
        "text-sm text-muted-foreground hover:underline cursor-pointer",
        className
      )}
      {...props}
    />
  );
};
FooterItem.displayName = "FooterItem";
