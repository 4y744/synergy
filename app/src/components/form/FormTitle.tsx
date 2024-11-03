import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLHeadingElement>;

export const FormTitle = (props: Props) => {
  return <h2 {...props} />;
};
