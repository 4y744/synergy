import { cn } from "@/utils/cn";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export const Spinner = ({ className, ...props }: Props) => {
  return (
    <div
      className={cn(
        "w-8 h-8 animate-spin rounded-full",
        "border-4 border-dark-400 border-t-dark-300",
        className
      )}
      {...props}
    />
  );
};
