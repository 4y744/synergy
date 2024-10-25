import { useParams } from "react-router-dom";
import { Chat } from "@/features/chat/components";

export const Component = () => {
  const { chatId } = useParams();
  return (
    <Chat.View>
      <Chat.Box />
    </Chat.View>
  );
};
