import { useRef } from "react";
import { createLazyFileRoute, Navigate } from "@tanstack/react-router";
import { HashIcon } from "lucide-react";

import { ContentLayout } from "~/components/layouts/content-layout";
import { Header } from "~/components/layouts/header";

import { useChat } from "~/features/chats/api/get-chats";
import { MessagesList } from "~/features/messages/components/messages-list";
import { CreateMessageForm } from "~/features/messages/components/create-message";

export const Route = createLazyFileRoute(
  "/(app)/groups/$groupId/chats/$chatId"
)({
  component: () => {
    const { groupId, chatId } = Route.useParams();
    const messagesRef = useRef<HTMLDivElement>(null);

    const { data: chat } = useChat(groupId, chatId);

    if (!chat) {
      return (
        <Navigate
          to="/groups/$groupId"
          params={{ groupId }}
        />
      );
    }

    return (
      <ContentLayout className="p-0">
        <Header
          title={chat?.name}
          icon={<HashIcon size={16} />}
        />
        <MessagesList
          // Offsets are for Header and CreateMessageForm.
          className="h-[calc(100vh-56px-48px)]"
          groupId={groupId}
          chatId={chatId}
          ref={messagesRef}
        />
        <CreateMessageForm
          className="md:absolute fixed bottom-0 w-full p-2 bg-background"
          groupId={groupId!}
          chatId={chatId!}
          onSubmit={() => {
            messagesRef.current!.scrollTo({
              top: messagesRef.current!.scrollHeight,
            });
          }}
        />
      </ContentLayout>
    );
  },
});
