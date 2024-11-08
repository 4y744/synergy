import { cn } from "@/utils/cn";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLSpanElement>;

export const FormError = ({ className, ...props }: Props) => {
  return (
    <span
      className={cn("text-red-800 font-bold h-6", className)}
      {...props}
    />
  );
};
