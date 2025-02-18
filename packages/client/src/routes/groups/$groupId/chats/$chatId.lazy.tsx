import { useRef } from "react";
import { HashIcon } from "lucide-react";
import { createLazyFileRoute } from "@tanstack/react-router";

import { CreateMessageForm, MessagesList } from "@synergy/features/messages";
import { useChat } from "@synergy/features/chats";

import { ContentLayout } from "~/components/layouts/content-layout";
import { Topbar } from "~/components/layouts/topbar";

export const Route = createLazyFileRoute("/groups/$groupId/chats/$chatId")({
  component: () => {
    const { groupId, chatId } = Route.useParams();

    const { data: chat } = useChat(groupId, chatId);

    const messagesRef = useRef<HTMLDivElement>(null);

    return (
      <>
        <Topbar
          title={chat?.name}
          icon={<HashIcon size={16} />}
        />
        <ContentLayout className="p-0">
          <MessagesList
            // Offsets are for Header and ChatMessageForm.
            className="h-[calc(100dvh-56px-48px)]"
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
        </ContentLayout>
      </>
    );
  },
});
