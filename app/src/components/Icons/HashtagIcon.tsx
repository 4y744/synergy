import { cn } from "@/utils/cn";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLElement>;

export const HashtagIcon = ({ className, ...props }: Props) => {
  return (
    <i
      className={cn("fa-solid fa-hashtag", className)}
      {...props}
    />
  );
};
