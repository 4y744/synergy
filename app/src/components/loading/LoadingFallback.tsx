import { cn } from "@/utils/cn";
import { Spinner } from "./Spinner";

export const LoadingFallback = () => {
  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-full h-full",
        "flex justify-center items-center"
      )}
    >
      <Spinner />
    </div>
  );
};
