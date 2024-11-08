import { cn } from "@/utils/cn";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLElement>;

export const ArrowLeftIcon = ({ className, ...props }: Props) => {
  return (
    <i
      className={cn("fa-solid fa-arrow-left", className)}
      {...props}
    />
  );
};
