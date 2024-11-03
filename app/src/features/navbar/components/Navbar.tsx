import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export const Navbar = ({ children }: Props) => {
  return (
    <nav
      className="bg-dark-900
      flex items-center h-12
      border-b border-b-dark-700"
    >
      {children}
    </nav>
  );
};
