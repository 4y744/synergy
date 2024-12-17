import { useParams } from "react-router-dom";

export default () => {
  const { chatId } = useParams();
  return <>{chatId}</>;
};
