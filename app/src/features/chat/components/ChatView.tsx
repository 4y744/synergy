import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export const _ChatView = ({ children }: Props) => {
  return <div className="relative w-[calc(100%-256px)]">{children}</div>;
};
