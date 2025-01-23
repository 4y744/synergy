import { ComponentProps, forwardRef, useEffect, useRef } from "react";

import { Avatar, AvatarFallback, Muted } from "@synergy/ui";
import { abbreviate, cn } from "@synergy/utils";

import { useMessages } from "../hooks/use-messages";
import { Message } from "../types/message";

// Cross-feature imports violate https://github.com/alan2207/bulletproof-react/blob/master/docs/project-structure.md,
// but it should be okay, because "users: is not that complicated of a feature.
import { useUser } from "~/users";

/**
 * Combines messages based on createdBy and creation time.
 * @param messages
 * @returns
 */
const sqiushMessages = (messages: Message[]) => {
  const squished: Message[] = [];

  // Reverse to start from last
  const reversed = messages.toReversed();

  reversed?.forEach((message) => {
    if (squished.length == 0) {
      return squished.push({ ...reversed[0] });
    }
    const prevMessage = squished[squished.length - 1];
    if (
      message.createdBy == prevMessage.createdBy &&
      message.createdAt.getTime() <
        prevMessage.createdAt.getTime() + 5 * 60 * 1000
    ) {
      prevMessage.payload = `${prevMessage.payload}\n${message.payload}`;
    } else {
      squished.push({ ...message });
    }
  });

  return squished.toReversed();
};

type MessageGroupProps = Readonly<Message>;

const MessageGroup = ({ payload, createdAt, createdBy }: MessageGroupProps) => {
  const { data, isPending } = useUser(createdBy);

  if (isPending) {
    return <>TODO: ADD SKELETON</>;
  }

  return (
    <div className="flex gap-2 py-2">
      <Avatar className="ml-2">
        <AvatarFallback>{abbreviate(data!.username)}</AvatarFallback>
      </Avatar>
      <div className="select-text">
        <div className="flex items-center gap-2">
          <span className="font-medium">{data!.username}</span>
          <Muted className="text-xs">{createdAt.toLocaleString()}</Muted>
        </div>
        <span className="whitespace-pre-line text-sm">{payload}</span>
      </div>
    </div>
  );
};

type ChatMessagesProps = Readonly<
  ComponentProps<"div"> & {
    groupId: string;
    chatId: string;
  }
>;

export const Messages = forwardRef<HTMLDivElement, ChatMessagesProps>(
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
            {sqiushMessages(messages).map((message, key) => (
              <MessageGroup
                key={key}
                {...message}
              />
            ))}
          </>
        )}
        <div ref={boundaryRef} />
      </div>
    );
  }
);
