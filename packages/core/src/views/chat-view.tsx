import { ChatInput, ChatMessages } from "@synergy/features/chats";
import { useRef } from "react";
import { useParams } from "react-router-dom";

export const ChatView = () => {
  const { groupId, chatId } = useParams();
  const messagesRef = useRef<HTMLDivElement>(null);

  return (
    <div className="h-full max-h-screen relative">
      <ChatMessages
        className="h-[calc(100%-56px)]"
        groupId={groupId!}
        chatId={chatId!}
        ref={messagesRef}
      />
      <ChatInput
        className="absolute bottom-0 w-full p-2"
        groupId={groupId!}
        chatId={chatId!}
        onSubmit={() => {
          messagesRef.current!.scrollTo({
            top: messagesRef.current!.scrollHeight,
          });
        }}
      />
    </div>
  );
};
