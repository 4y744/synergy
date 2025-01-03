import { cn } from "@synergy/utils";
import { Loader2 } from "lucide-react";

export const LoadingFallback = () => {
  return (
    <div
      className={cn("h-screen w-screen", "flex justify-center items-center")}
    >
      <Loader2 className="animate-spin h-12 w-12" />
    </div>
  );
};
