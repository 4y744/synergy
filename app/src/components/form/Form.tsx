import { FormHTMLAttributes } from "react";

type Props = FormHTMLAttributes<HTMLFormElement>;

export const Form = ({ className, onSubmit, ...props }: Props) => {
  return (
    <form
      className={`bg-dark-900 rounded-md shadow-md p-6 
      flex flex-col gap-4 border border-dark-700
      ${className}`}
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit?.(event);
      }}
      {...props}
    />
  );
};
