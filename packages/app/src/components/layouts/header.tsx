import { ComponentProps, forwardRef } from "react";

import { SidebarTrigger, useIsMobile } from "@synergy/ui";
import { cn } from "@synergy/utils";

type HeaderProps = Readonly<ComponentProps<"div">>;

export const Header = forwardRef<HTMLDivElement, HeaderProps>(
  ({ children, className, ...props }, ref) => {
    const isMobile = useIsMobile();
    return (
      <div
        className={cn(
          "sticky top-0 left-0 w-full h-12 md:pl-4 pl-2",
          "bg-background z-50",
          "flex items-center gap-2",
          "border-b border-b-border",
          "font-bold md:text-lg text-base",
          className
        )}
        ref={ref}
        {...props}
      >
        {isMobile && <SidebarTrigger />}
        {children}
      </div>
    );
  }
);
