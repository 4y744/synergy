import {
  ComponentProps,
  forwardRef,
  ReactNode,
  useEffect,
  useState,
} from "react";
import { createPortal } from "react-dom";

import { SidebarTrigger, useIsMobile } from "@synergy/ui";
import { cn } from "@synergy/utils";

type HeaderProviderProps = Readonly<ComponentProps<"div">>;

export const HeaderProvider = forwardRef<HTMLDivElement, HeaderProviderProps>(
  ({ children, className, ...props }, ref) => {
    const isMobile = useIsMobile();

    return (
      <div className="relative h-screen overflow-y-hidden">
        <div
          className={cn(
            "md:absolute fixed top-0 left-0",
            "w-full h-12 md:pl-4 pl-2 z-50",
            "flex items-center gap-2",
            "bg-background border-b border-b-border",
            "font-bold md:text-base text-sm",
            className
          )}
          ref={ref}
          {...props}
        >
          {isMobile && <SidebarTrigger />}
          <div
            className="flex items-center gap-2"
            id="header"
          />
        </div>
        <div className="h-[calc(100%-48px)] mt-12 overflow-y-auto">
          {children}
        </div>
      </div>
    );
  }
);
HeaderProvider.displayName = "HeaderProvider";

type HeaderProps = Readonly<{
  title?: string;
  icon?: ReactNode;
}>;

export const Header = ({ title, icon }: HeaderProps) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    mounted &&
    createPortal(
      <>
        {icon}
        {title}
      </>,
      document.getElementById("header")!
    )
  );
};
Header.displayName = "Header";
