import { Muted } from "@/components/ui/typography";
import { cn } from "@/utils/cn";

export default () => {
  return (
    <div className={cn("w-full h-full", "flex justify-center", "items-center")}>
      <Muted>Please select a group</Muted>
    </div>
  );
};
