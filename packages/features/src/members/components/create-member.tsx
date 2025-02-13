import { ComponentProps, ReactNode, useState } from "react";
import { Loader2 } from "lucide-react";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@synergy/ui";

import { cn, isValidURL } from "@synergy/utils";

import {
  CreateMemberInput,
  useCreateMember,
  createMemberInputSchema,
} from "~/members";

type CreateMemberFormProps = Readonly<
  ComponentProps<"form"> & {
    onSuccess?: () => void;
  }
>;

export const CreateMemberForm = ({
  onSuccess,
  onSubmit,
  className,
  ...props
}: CreateMemberFormProps) => {
  const form = useForm<CreateMemberInput>({
    resolver: zodResolver(createMemberInputSchema),
    defaultValues: {
      inviteId: "",
    },
  });

  const { mutateAsync: createMember, isPending } = useCreateMember({
    onSuccess,
    onError: () => {
      form.setError("inviteId", {
        message: "form/invalid-invite",
      });
    },
  });

  const _onSubmit: SubmitHandler<CreateMemberInput> = ({ inviteId }) => {
    return createMember({
      inviteId: isValidURL(inviteId)
        ? inviteId.split("/").reverse()[0]
        : inviteId,
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(event) => {
          onSubmit?.(event);
          form.handleSubmit(_onSubmit)(event);
        }}
        className={cn("space-y-4", className)}
        {...props}
      >
        <FormField
          name="inviteId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Invite link</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="https://synergy-app.net/invite/my-invite-link"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isPending}
        >
          {isPending ? <Loader2 className="animate-spin" /> : <>Join</>}
        </Button>
      </form>
    </Form>
  );
};

type CreateMemberDialogProps = Readonly<{
  children?: ReactNode;
}>;

export const CreateMemberDialog = ({ children }: CreateMemberDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Join group</DialogTitle>
        <CreateMemberForm onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
