import { cn } from "@/utils/cn";

export const Component = () => {
  return (
    <div
      className={cn(
        "h-full w-full",
        "flex justify-center items-center gap-2",
        "text-dark-400"
      )}
    >
      Select a group.
    </div>
  );
};
