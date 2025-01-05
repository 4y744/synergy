import { SubmitHandler, useForm } from "react-hook-form";

import { Input, Form, FormControl, FormField, FormItem } from "@synergy/ui";

import { cn } from "@synergy/utils";

import { useChat } from "../hooks/use-chat";
import { useCreateMessage } from "../hooks/use-create-message";
import { NewMessage, NewMessageSchema } from "../types/message";
import { useAuth } from "~/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { ComponentProps, forwardRef } from "react";

type ChatInputProps = Readonly<
  ComponentProps<"form"> & {
    groupId: string;
    chatId: string;
  }
>;

export const ChatInput = forwardRef<HTMLFormElement, ChatInputProps>(
  ({ chatId, groupId, onSubmit, ...props }, ref) => {
    const { uid } = useAuth();
    const chat = useChat(groupId, chatId);
    const { mutate: createMessage } = useCreateMessage(groupId, chatId);

    const form = useForm<NewMessage>({
      resolver: zodResolver(NewMessageSchema),
      defaultValues: {
        createdBy: uid,
        payload: "",
      },
    });

    const _onSubmit: SubmitHandler<NewMessage> = (data) => {
      createMessage(data);
      form.reset();
    };

    return (
      <Form {...form}>
        <form
          onSubmit={(event) => {
            form.handleSubmit(_onSubmit)(event);
            onSubmit?.(event);
          }}
          ref={ref}
          {...props}
        >
          <FormField
            name="payload"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    className={cn(
                      "bg-sidebar border-border h-10 w-full",
                      "focus-visible:ring-0"
                    )}
                    placeholder={`Send a message to #${chat.data?.name}`}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    );
  }
);
