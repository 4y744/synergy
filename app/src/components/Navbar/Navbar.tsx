//React
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export const _Navbar = ({ children }: Props) => {
  return (
    <nav
      className="bg-dark-950
      flex"
    >
      {children}
    </nav>
  );
};