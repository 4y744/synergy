//React
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export const _Sidebar = ({ children }: Props) => {
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