//React
import { ReactNode } from "react";

//React Router
import { NavLink } from "react-router-dom";

type Props = {
  children?: ReactNode;
  to: string;
};

export const _Navlink = ({ children, to }: Props) => {
  return (
    <NavLink
      className={({
        isActive,
      }) => `${isActive ? "bg-white text-neutral-900" : "bg-neutral-900 hover:bg-neutral-800"}
      rounded-md 
      px-2 py-1 m-1`}
      to={to}
    >
      {children}
    </NavLink>
  );
};
