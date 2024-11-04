import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLElement>;

export const ArrowLeftIcon = ({ className, ...props }: Props) => {
  return (
    <i
      className={`fa-solid fa-arrow-left
      ${className}`}
      {...props}
    />
  );
};
