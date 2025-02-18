import { ComponentProps, forwardRef } from "react";
import { ReactNode } from "@tanstack/react-router";

import { SidebarTrigger, useIsMobile } from "@synergy/ui";
import { cn } from "@synergy/utils";

type TopbarProps = Readonly<
  ComponentProps<"div"> & {
    title?: string;
    icon?: ReactNode;
  }
>;

export const Topbar = forwardRef<HTMLDivElement, TopbarProps>(
  ({ title, icon, children, className, ...props }, ref) => {
    const isMobile = useIsMobile();

    return (
      <>
        <div
          className={cn(
            "absolute top-0 left-0",
            "w-full h-12 md:pl-4 pl-2  z-50",
            "flex items-center gap-2",
            "bg-background border-b border-b-border",
            "font-bold md:text-base text-sm",
            className
          )}
          ref={ref}
          {...props}
        >
          {isMobile && <SidebarTrigger />}
          {icon}
          {title}
        </div>
        <div className="h-12" />
      </>
    );
  }
);
