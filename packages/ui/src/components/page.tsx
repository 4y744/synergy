import {
  ForwardedRef,
  forwardRef,
  HTMLAttributes,
  PropsWithoutRef,
} from "react";

import { cn } from "@synergy/utils";

type PageProps = Readonly<
  PropsWithoutRef<HTMLAttributes<HTMLDivElement>> & {
    centered?: boolean;
  }
>;

export const Page = forwardRef(
  (
    { centered = false, className, ...props }: PageProps,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div
        className={cn(
          "min-w-full min-h-screen space-y-2 md:p-8 p-4",
          { "flex flex-col justify-center items-center": centered },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
