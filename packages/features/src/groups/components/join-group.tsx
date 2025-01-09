import {
  Button,
  Input,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@synergy/ui";

import { SubmitHandler, useForm } from "react-hook-form";
import { Invite } from "../types/invite";
import { InviteSchema } from "../types/invite";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode, useState } from "react";

type JoinGroupProps = Readonly<{
  children?: ReactNode;
  uid: string;
}>;

export const JoinGroup = ({ children }: JoinGroupProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<Invite>({
    resolver: zodResolver(InviteSchema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit: SubmitHandler<Invite> = () => {
    setIsOpen(false);
  };

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
        <DialogTitle>Join group</DialogTitle>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4"
          >
            <FormField
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Invite link</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="https://synergy.app/my-invite-link"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Join</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
