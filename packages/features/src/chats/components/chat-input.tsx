import {
  Input,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@synergy/ui";

import { cn } from "@synergy/utils";
import { useCreateMessage } from "../hooks/use-create-message";
import { SubmitHandler, useForm } from "react-hook-form";
import { Message } from "../types/message";
import { useChat } from "../hooks/use-chat";

type Props = Readonly<{
  groupId: string;
  chatId: string;
}>;

export const ChatInput = ({ chatId, groupId }: Props) => {
  const chat = useChat(groupId, chatId);
  const { mutate: createMessage } = useCreateMessage(groupId, chatId);

  const form = useForm<Message>({
    defaultValues: {
      payload: "",
    },
  });

  const onSubmit: SubmitHandler<Message> = ({ payload }) => {
    createMessage({ payload });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <FormField
          name="payload"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  className={cn(
                    "bg-sidebar border-border w-3/4",
                    "focus-visible:ring-0"
                  )}
                  placeholder={`Send a message to #${chat.data?.name}`}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};
