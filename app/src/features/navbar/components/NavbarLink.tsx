import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type Props = {
  children?: ReactNode;
  to: string;
};

export const _NavbarLink = ({ children, to }: Props) => {
  return (
    <NavLink
      className={({ isActive }) => `
      ${isActive ? "bg-white text-black" : "hover:bg-dark-800"}
      flex justify-center items-center
      px-4 h-3/4 rounded-md`}
      to={to}
    >
      {children}
    </NavLink>
  );
};
