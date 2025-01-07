import { ChatInput, ChatMessages } from "@synergy/features/chats";
import { SidebarTrigger, useIsMobile } from "@synergy/ui";
import { useRef } from "react";
import { useParams } from "react-router-dom";

export const ChatView = () => {
  const { groupId, chatId } = useParams();
  const messagesRef = useRef<HTMLDivElement>(null);

  const isMobile = useIsMobile();

  return (
    <div className="h-full max-h-screen relative">
      {isMobile && (
        <div className="absolute top-0 left-0 w-full h-12 bg-sidebar border-b border-b-border flex items-center px-1">
          <SidebarTrigger />
        </div>
      )}
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
