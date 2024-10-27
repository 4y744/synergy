import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  title: string;
};

export const _SidebarSection = ({ children, title }: Props) => {
  return (
    <section
      className="
      grid grid-cols-1 gap-1"
    >
      <span
        className="px-4 py-2
      text-dark-400 text-sm font-medium"
      >
        {title}
      </span>
      {children}
    </section>
  );
};
