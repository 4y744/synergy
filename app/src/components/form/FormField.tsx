import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLDivElement>;

export const FormField = ({ className, ...props }: Props) => {
  return (
    <div
      className={`flex flex-col gap-2 ${className}`}
      {...props}
    />
  );
};
