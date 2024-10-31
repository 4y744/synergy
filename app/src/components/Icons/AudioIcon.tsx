import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLElement>;

export const AudioIcon = ({ className, ...props }: Props) => {
  return (
    <i
      className={`fa-solid fa-volume-high
      ${className}`}
      {...props}
    />
  );
};
