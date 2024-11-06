import { cn } from "@/utils/cn";
import { Outlet, useNavigation } from "react-router-dom";

export const Component = () => {
  const { state } = useNavigation();
  return (
    <>
      <div className="fixed top-0 left-0 w-full">
        <div
          className={cn(
            "bg-cyan-800",
            "absolute left-[-50vw] top-0 w-[50vw] h-[2px]",
            { "animation-slide": state == "loading" }
          )}
        />
      </div>
      <Outlet />
    </>
  );
};
