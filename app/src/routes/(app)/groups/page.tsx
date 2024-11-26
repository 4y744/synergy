import { Muted } from "@/components/ui/typography";
import { cn } from "@/utils/cn";

export const Component = () => {
  return (
    <div className={cn("w-full h-full", "flex justify-center", "items-center")}>
      <Muted>Please select a group</Muted>
    </div>
  );
};
