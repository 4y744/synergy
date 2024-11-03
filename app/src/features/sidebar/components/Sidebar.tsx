import { ReactNode } from "react";
import { SidebarSection } from "./SidebarSection";
import { SidebarLink } from "./SidebaseLink";

type Props = {
  children?: ReactNode;
};

export const Sidebar = ({ children }: Props) => {
  return (
    <div
      className="bg-dark-900
      flex flex-col min-w-64 h-full
      border-r border-r-dark-700"
    >
      {children}
    </div>
  );
};
