import { ChatInput } from "@synergy/features/chats";
import { useParams } from "react-router-dom";

export const ChatView = () => {
  const { groupId, chatId } = useParams();

  return (
    <ChatInput
      groupId={groupId!}
      chatId={chatId!}
    />
  );
};
