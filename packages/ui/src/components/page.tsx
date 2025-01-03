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
          "w-screen min-h-screen",
          { "flex flex-col justify-center items-center": centered },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
