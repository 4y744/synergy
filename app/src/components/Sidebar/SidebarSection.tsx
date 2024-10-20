//React
import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export const _SidebarSection = ({ children }: Props) => {
  return (
    <section
      className="
      grid grid-cols-1"
    >
      {children}
    </section>
  );
};
