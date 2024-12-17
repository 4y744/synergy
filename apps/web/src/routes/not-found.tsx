import { cn } from "@/utils/cn";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-full h-full",
        "flex justify-center items-center flex-col"
      )}
    >
      <div className={cn("flex items-center gap-5")}>
        <h1>404</h1>
        <div className={cn("w-[1px] h-full bg-white")} />
        <p>Oops! This page doesn't seem to exist.</p>
      </div>
      <Link
        to="/"
        className={cn(
          "flex items-center gap-1",
          "text-sm text-neutral-400 underline",
          "hover:text-neutral-300",
          "transition-text duration-200"
        )}
      >
        Go back
      </Link>
    </div>
  );
};
