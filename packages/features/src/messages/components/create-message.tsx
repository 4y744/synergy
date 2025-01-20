import { SubmitHandler, useForm } from "react-hook-form";

import { Input, Form, FormControl, FormField, FormItem } from "@synergy/ui";

import { cn } from "@synergy/utils";

import { useCreateMessage } from "../../messages/hooks/use-create-message";
import { NewMessage, NewMessageSchema } from "../../messages/types/message";
import { useAuth } from "~/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { ComponentProps, forwardRef } from "react";

type ChatInputProps = Readonly<
  ComponentProps<"form"> & {
    groupId: string;
    chatId: string;
  }
>;

export const CreateMessage = forwardRef<HTMLFormElement, ChatInputProps>(
  ({ chatId, groupId, onSubmit, ...props }, ref) => {
    const { uid } = useAuth();
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
                    placeholder={`Send a message...`}
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
