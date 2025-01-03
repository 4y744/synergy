import * as React from "react";
import { Eye, EyeOff } from "lucide-react";

import { cn } from "@synergy/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    const [hidden, setHidden] = React.useState<boolean>(true);
    return (
      <div className="relative w-full">
        <input
          type={type == "password" ? (hidden ? "password" : "text") : type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            className
          )}
          ref={ref}
          {...props}
        />
        {type == "password" && (
          <button
            type="button"
            className={cn(
              "absolute right-0 top-1/2 -translate-y-1/2",
              "flex justify-center items-center",
              "h-full aspect-square"
            )}
            onClick={(event) => {
              setHidden(!hidden);
              event.stopPropagation();
            }}
          >
            {hidden ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
