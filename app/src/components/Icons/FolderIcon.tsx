import { cn } from "@/utils/cn";
import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLElement>;

export const FolderIcon = ({ className, ...props }: Props) => {
  return (
    <i
      className={cn("fa-solid fa-folder", className)}
      {...props}
    />
  );
};
