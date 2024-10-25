import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type Props = {
  children?: ReactNode;
  to: string;
  icon?: ReactNode;
};

export const _SidebarLink = ({ children, to, icon }: Props) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => `
      ${isActive ? "bg-white text-black" : "hover:bg-dark-800"}
      flex items-center gap-2
      p-2 mx-2 rounded-md text-base
      transition-link duration-200`}
      draggable={false}
    >
      <span
        className="text-xs
      "
      >
        {icon}
      </span>
      {children}
    </NavLink>
  );
};
