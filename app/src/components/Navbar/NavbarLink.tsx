//React
import { ReactNode } from "react";

//React Router
import { NavLink } from "react-router-dom";

type Props = {
  children?: ReactNode;
  to: string;
};

export const _NavbarLink = ({ children, to }: Props) => {
  return (
    <NavLink
      className={({
        isActive,
      }) => `${isActive ? "bg-white text-dark-900" : "bg-dark-950 hover:bg-dark-800"}
      rounded-md 
      px-2 py-1 m-1`}
      to={to}
    >
      {children}
    </NavLink>
  );
};
