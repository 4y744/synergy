import { ComponentProps, ReactNode, useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";

import {
  Input,
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@synergy/ui";

import { useCreateGroup } from "../hooks/use-create-group";
import { NewGroup, NewGroupSchema } from "../types/new-group";
import { cn } from "@synergy/utils";
import { zodResolver } from "@hookform/resolvers/zod";

type CreateGroupProps = Readonly<ComponentProps<"form">>;

export const CreateGroupForm = ({
  onSubmit,
  className,
  ...props
}: CreateGroupProps) => {
  const { mutate: createGroup } = useCreateGroup();

  const form = useForm<NewGroup>({
    resolver: zodResolver(NewGroupSchema),
    defaultValues: {
      name: "",
    },
  });

  const _onSubmit: SubmitHandler<NewGroup> = (data) => {
    createGroup(data);
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(event) => {
          onSubmit?.(event);
          form.handleSubmit(_onSubmit);
        }}
        className={cn("space-y-4", className)}
        {...props}
      >
        <FormField
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="School project"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
};

type CreateGroupDialogProps = Readonly<{
  children?: ReactNode;
}>;

export const CreateGroupDialog = ({ children }: CreateGroupDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <DialogTrigger
        className="w-full"
        asChild
      >
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Create group</DialogTitle>
        <CreateGroupForm onSubmit={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
