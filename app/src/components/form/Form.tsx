import { cn } from "@/utils/cn";
import { FormHTMLAttributes } from "react";

type Props = FormHTMLAttributes<HTMLFormElement>;

export const Form = ({ className, onSubmit, ...props }: Props) => {
  return (
    <form
      className={cn(
        "bg-dark-900 rounded-md shadow-md",
        "flex flex-col gap-4 p-6",
        "border border-dark-700",
        "w-[512px] max-w-[90vw]",
        className
      )}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit?.(event);
      }}
      {...props}
    />
  );
};
