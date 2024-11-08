import { cn } from "@/utils/cn";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export const FormField = ({ className, ...props }: Props) => {
  return (
    <div
      className={cn("flex flex-col gap-2", className)}
      {...props}
    />
  );
};
