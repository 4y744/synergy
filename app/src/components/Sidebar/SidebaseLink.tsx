import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type Props = {
  children?: ReactNode;
  to: string;
};

export const _SidebarLink = ({ children, to }: Props) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
      px-4 py-2`}
    >
      {children}
    </NavLink>
  );
};
