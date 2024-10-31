import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLHeadingElement>;

export const Title = (props: Props) => {
  return <h2 {...props} />;
};
