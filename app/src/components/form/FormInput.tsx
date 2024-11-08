import { cn } from "@/utils/cn";
import { InputHTMLAttributes } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  error?: boolean;
};

export const FormInput = ({ error, className, ...props }: Props) => {
  return (
    <input
      className={cn(
        "bg-dark-800 rounded-md px-4 h-12",
        "focus:outline outline-4",
        "transition-outline duration-100",
        error ? "outline outline-red-800" : "outline-cyan-800",
        className
      )}
      {...props}
    />
  );
};
