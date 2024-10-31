import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLElement>;

export const FolderIcon = ({ className, ...props }: Props) => {
  return (
    <i
      className={`fa-solid fa-folder
      ${className}`}
      {...props}
    />
  );
};
