import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLSpanElement>;

export const Label = ({ className, ...props }: Props) => {
  return (
    <span
      className={`font-medium ${className}`}
      {...props}
    />
  );
};
