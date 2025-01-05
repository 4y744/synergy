import { ComponentProps, forwardRef, useEffect, useRef } from "react";
import { useMessages } from "../hooks/use-messages";
import { cn } from "@synergy/utils";
import { Avatar, AvatarFallback, Muted } from "@synergy/ui";
import { Message } from "../types/message";

/**
 * Combines messages based on creator and creation time.
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
      message.created.getTime() < prevMessage.created.getTime() + 5 * 60 * 1000
    ) {
      prevMessage.payload = `${prevMessage.payload}\n${message.payload}`;
    } else {
      squished.push({ ...message });
    }
  });

  return squished.toReversed();
};

type ChatMessagesProps = Readonly<
  ComponentProps<"div"> & {
    groupId: string;
    chatId: string;
  }
>;

export const ChatMessages = forwardRef<HTMLDivElement, ChatMessagesProps>(
  ({ groupId, chatId, className, ...props }, ref) => {
    const { fetchNextPage, data } = useMessages(groupId, chatId);
    const boundaryRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      // Load buffer page then load initial messages.
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
            {sqiushMessages(messages).map(({ id, payload, created }) => (
              <div
                className="flex gap-2 py-2"
                key={id}
              >
                <Avatar className="ml-2">
                  <AvatarFallback>AB</AvatarFallback>
                </Avatar>
                <div className="flex flex-col gap-1 select-text">
                  <Muted className="text-xs">{created.toLocaleString()}</Muted>
                  <span className="whitespace-pre-line text-sm">{payload}</span>
                </div>
              </div>
            ))}
          </>
        )}
        <div ref={boundaryRef} />
      </div>
    );
  }
);
