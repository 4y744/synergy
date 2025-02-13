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
          "w-full min-h-[calc(100vh-48px-56px)] space-y-2 p-4",
          { "flex flex-col justify-center items-center": isCentered },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
