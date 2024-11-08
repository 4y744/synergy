import { cn } from "@/utils/cn";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLSpanElement>;

export const FormLabel = ({ className, ...props }: Props) => {
  return (
    <span
      className={cn("font-medium", className)}
      {...props}
    />
  );
};
