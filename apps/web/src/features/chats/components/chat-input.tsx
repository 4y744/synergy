import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";
import { Chat } from "../types/chat";
import { useCreateMessage } from "../hooks/use-create-message";
import { SubmitHandler, useForm } from "react-hook-form";
import { Message } from "../types/message";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

type Props = Readonly<{
  groupId: string;
  chat: Chat;
}>;

export const ChatInput = ({ chat, groupId }: Props) => {
  const { mutate: createMessage } = useCreateMessage(groupId, chat.id);
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
                  placeholder={`Send a message to #${chat.name}`}
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
