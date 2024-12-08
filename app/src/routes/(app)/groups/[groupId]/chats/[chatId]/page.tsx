import { ChatInput } from "@/features/chats/components/chat-input";
import { useChats } from "@/features/chats/hooks/use-chats";
import { useParams } from "react-router-dom";

export default () => {
  const { groupId, chatId } = useParams();
  const chats = useChats(groupId!);
  return (
    <div>
      <div>{chatId}</div>
      <ChatInput
        chat={chats.data?.find((chat) => chat.id == chatId)!}
        groupId={groupId!}
      />
    </div>
  );
};
