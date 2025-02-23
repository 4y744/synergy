import { ComponentProps, forwardRef } from "react";

import { cn } from "@synergy/utils";

type ContentProps = Readonly<
  ComponentProps<"div"> & {
    isCentered?: boolean;
  }
>;

export const ContentLayout = forwardRef<HTMLDivElement, ContentProps>(
  ({ isCentered, className, ...props }, ref) => {
    return (
      <div
        className={cn(
          "w-full min-h-[100svh] space-y-4 p-4",
          { "flex flex-col justify-center items-center": isCentered },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
ContentLayout.displayName = "ContentLayout";
