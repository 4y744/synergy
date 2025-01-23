import { CreateMessage, Messages } from "@synergy/features/messages";
import { SidebarTrigger, useIsMobile } from "@synergy/ui";
import { useParams } from "@tanstack/react-router";
import { useRef } from "react";

export default () => {
  const { groupId, chatId } = useParams({
    from: "/groups/$groupId/chats/$chatId",
  });

  const messagesRef = useRef<HTMLDivElement>(null);

  const isMobile = useIsMobile();

  return (
    <div className="h-full max-h-screen relative">
      {isMobile && (
        <div className="absolute top-0 left-0 w-full h-12 bg-sidebar border-b border-b-border flex items-center px-1">
          <SidebarTrigger />
        </div>
      )}
      <Messages
        className="h-[calc(100%-56px)]"
        groupId={groupId!}
        chatId={chatId!}
        ref={messagesRef}
      />
      <CreateMessage
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
