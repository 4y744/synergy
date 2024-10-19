//React
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const _Chats = ({ children }: Props) => {
  return (
    <section
      className="flex
    "
    >
      {children}
    </section>
  );
};
