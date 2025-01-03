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

import { zodResolver } from "@hookform/resolvers/zod";

import { useCreateGroup } from "../hooks/use-create-group";
import { NewGroup, NewGroupSchema } from "../types/group";

import { ReactNode, useState } from "react";

type CreateGroupFormProps = Readonly<{
  uid: string;
  children?: ReactNode;
  className?: string;
}>;

export const CreateGroupDialog = ({
  uid,
  className,
  children,
}: CreateGroupFormProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const { mutate: createGroup } = useCreateGroup();
  const form = useForm<NewGroup>({
    resolver: zodResolver(NewGroupSchema),
    defaultValues: {
      name: "",
      uid,
    },
  });

  const onSubmit: SubmitHandler<NewGroup> = (data) => {
    createGroup(data);
    setIsOpen(false);
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <DialogTrigger
        className={className}
        asChild
      >
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Create group</DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
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
      </DialogContent>
    </Dialog>
  );
};
