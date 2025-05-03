import { ComponentProps, forwardRef, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { Trash2Icon } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage, Muted } from "@synergy/ui";
import { abbreviate, cn } from "@synergy/utils";

import { useAuth } from "~/features/auth/hooks/use-auth";
import { useUser } from "~/features/users/api/get-user";
import { useGroup } from "~/features/groups/api/get-group";

import { Message, useMessages } from "../api/get-messages";
import { DeleteMessageDialog } from "./delete-message";

/**
 * Combines messages based on ```createdBy``` and ```createdAt```.
 */
const squishMessages = (messages: Message[]) => {
  const squished: Message[][] = [];

  messages.toReversed().forEach((message) => {
    if (squished.length == 0) {
      return squished.push([message]);
    }
    const last = squished[0];
    if (
      message.createdBy == last[0].createdBy &&
      message.createdAt.getTime() < last[0].createdAt.getTime() + 5 * 60 * 1000
    ) {
      last.push(message);
    } else {
      squished.unshift([message]);
    }
  });

  return squished;
};

type MessagesListProps = Readonly<
  ComponentProps<"div"> & {
    groupId: string;
    chatId: string;
  }
>;

export const MessagesList = forwardRef<HTMLDivElement, MessagesListProps>(
  ({ groupId, chatId, className, ...props }, ref) => {
    const { fetchNextPage, data } = useMessages(groupId, chatId);
    const boundaryRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      // Load buffer page then load initial page.
      fetchNextPage().then(() => {
        const obserer = new IntersectionObserver(([obserer]) => {
          if (obserer.isIntersecting) {
            fetchNextPage();
          }
        });
        obserer.observe(boundaryRef.current!);
      });
    }, [groupId, chatId]);

    const messages = data?.pages
      // Remove empty retreived pages.
      // Happens occasionally, because of the way the Firebase SDK works.
      .filter((page) => page.messages.length > 0)
      // Why does this function even exist?
      .flatMap(({ messages }) => messages);

    return (
      <div
        className={cn("flex flex-col-reverse overflow-y-scroll", className)}
        ref={ref}
        {...props}
      >
        {messages && (
          <>
            {squishMessages(messages).map((messages, key) => (
              <MessageGroup
                key={key}
                groupId={groupId}
                chatId={chatId}
                messages={messages}
              />
            ))}
          </>
        )}
        <div ref={boundaryRef} />
      </div>
    );
  }
);
MessagesList.displayName = "MessagesList";

type MessageGroupProps = Readonly<{
  groupId: string;
  chatId: string;
  messages: Message[];
}>;

const MessageGroup = ({ groupId, chatId, messages }: MessageGroupProps) => {
  const { t } = useTranslation();
  const { uid } = useAuth();

  const { data: group } = useGroup(groupId);
  const { data: user, isPending } = useUser(messages[0].createdBy);

  if (isPending) {
    return <></>;
  }

  return (
    <div className="py-2">
      <div className="flex gap-2 p-2">
        <Avatar className="rounded-lg">
          <AvatarFallback>{abbreviate(user!.username)}</AvatarFallback>
          <AvatarImage src={user?.pfp} />
        </Avatar>
        <div>
          <span className="font-medium">{user!.username}</span>
          <Muted className="text-xs">
            {messages[0].createdAt.toLocaleString()}
          </Muted>
        </div>
      </div>
      <div className="w-full">
        {messages
          .map((message) => {
            return message.payload == "__deleted__"
              ? {
                  ...message,
                  payload: t("client.feature.message.deleted", {
                    interpolation: { escapeValue: false },
                  }),
                }
              : message;
          })
          .map(({ id, payload }) => (
            <div
              className="group hover:bg-sidebar w-full min-h-6 pl-14 flex items-center text-sm select-text"
              key={id}
            >
              <ReactMarkdown
                components={{
                  a: ({ children, href }) => (
                    <a
                      className="text-blue-500 cursor-pointer hover:underline"
                      href={href}
                      target="_blank"
                    >
                      {children}
                    </a>
                  ),
                }}
                // Auto convert text link into markdown link.
                remarkPlugins={[remarkGfm]}
              >
                {payload}
              </ReactMarkdown>
              {(uid == user?.uid || uid == group?.createdBy) && (
                <DeleteMessageDialog
                  groupId={groupId}
                  chatId={chatId}
                  messageId={id}
                >
                  <button className="group-hover:block hidden ml-auto mr-2 text-destructive">
                    <Trash2Icon size={16} />
                  </button>
                </DeleteMessageDialog>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};
MessageGroup.displayName = "MessagesList:MessageGroup";
