import { HTMLAttributes } from "react";

type Props = HTMLAttributes<HTMLElement>;

export const HashtagIcon = ({ className, ...props }: Props) => {
  return (
    <i
      className={`fa-solid fa-hashtag
      ${className}`}
      {...props}
    />
  );
};
