import { ReactNode } from "react";
import { NavLink } from "react-router-dom";

type Props = {
  children: ReactNode;
  to: string;
};

export const _ChatsLink = ({ children, to }: Props) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) => ``}
    >
      {children}
    </NavLink>
  );
};
