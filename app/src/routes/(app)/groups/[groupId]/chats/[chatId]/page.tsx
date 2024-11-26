import { useParams } from "react-router-dom";

export const Component = () => {
  const { chatId } = useParams();
  return <div>{chatId}</div>;
};
