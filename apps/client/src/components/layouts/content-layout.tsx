import { ComponentProps, forwardRef } from "react";

import { cn } from "@synergy/utils";

type ContentLayoutProps = Readonly<
  ComponentProps<"div"> & {
    isCentered?: boolean;
  }
>;

export const ContentLayout = forwardRef<HTMLDivElement, ContentLayoutProps>(
  ({ isCentered, className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "w-full min-h-[calc(100vh-48px)] space-y-2 p-4",
          {
            "flex flex-col items-center justify-center": isCentered,
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
ContentLayout.displayName = "ContentLayout";
