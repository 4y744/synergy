import { ComponentProps, forwardRef } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Input, Form, FormControl, FormField, FormItem } from "@synergy/ui";

import { cn } from "@synergy/utils";

import { useCreateMessage } from "../hooks/use-create-message";
import {
  CreateMessageInput,
  createMessageInputSchema,
} from "../types/create-message";

type ChatInputProps = Readonly<
  ComponentProps<"form"> & {
    groupId: string;
    chatId: string;
  }
>;

export const CreateMessageForm = forwardRef<HTMLFormElement, ChatInputProps>(
  ({ chatId, groupId, onSubmit, ...props }, ref) => {
    const { mutateAsync: createMessage } = useCreateMessage(groupId, chatId);

    const form = useForm<CreateMessageInput>({
      resolver: zodResolver(createMessageInputSchema),
      defaultValues: {
        payload: "",
      },
    });

    const _onSubmit: SubmitHandler<CreateMessageInput> = (data) => {
      form.reset();
      return createMessage(data);
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
