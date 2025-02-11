import { useRef } from "react";
import { HashIcon } from "lucide-react";
import { createLazyFileRoute, useParams } from "@tanstack/react-router";

import { CreateMessageForm, MessagesList } from "@synergy/features/messages";
import { useChat } from "@synergy/features/chats";

import { Header } from "~/components/layouts/header";

export const Route = createLazyFileRoute("/groups/$groupId/chats/$chatId")({
  component: () => {
    const { groupId, chatId } = useParams({
      from: "/groups/$groupId/chats/$chatId",
    });

    const { data: chat } = useChat(groupId, chatId);

    const messagesRef = useRef<HTMLDivElement>(null);

    return (
      <>
        <Header>
          <HashIcon size={16} />
          {chat?.name}
        </Header>
        <MessagesList
          // Offsets are for Header and ChatMessageForm.
          className="h-[calc(100%-56px-48px)]"
          groupId={groupId!}
          chatId={chatId!}
          ref={messagesRef}
        />
        <CreateMessageForm
          className="absolute bottom-0 w-full p-2"
          groupId={groupId!}
          chatId={chatId!}
          onSubmit={() => {
            messagesRef.current!.scrollTo({
              top: messagesRef.current!.scrollHeight,
            });
          }}
        />
      </>
    );
  },
});
