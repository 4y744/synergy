import { ButtonHTMLAttributes } from "react";
import { Spinner } from "../loading";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  loading?: boolean;
};

export const Submit = ({
  children,
  loading,
  className,
  disabled,
  ...props
}: Props) => {
  return (
    <button
      className={`bg-cyan-800 rounded-md px-4 h-12
      flex justify-center items-center transition-button duration-200
      ${loading ? "opacity-50" : "hover:bg-cyan-900 active:bg-cyan-950"}
      ${className}`}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? <Spinner /> : <span>{children}</span>}
    </button>
  );
};
