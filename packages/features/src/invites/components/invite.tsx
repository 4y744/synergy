import { useCreateMember } from "~/members/hooks/use-create-member";
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
import { SubmitHandler, useForm } from "react-hook-form";
import { Invite, InviteSchema } from "~/groups";
import { zodResolver } from "@hookform/resolvers/zod";
import { ComponentProps, ReactNode, useState } from "react";
import { cn, isValidURL } from "@synergy/utils";
import { Loader2 } from "lucide-react";

type InviteFormProps = Readonly<
  ComponentProps<"form"> & {
    onSuccess?: () => void;
  }
>;

export const InviteForm = ({
  onSuccess,
  onSubmit,
  className,
  ...props
}: InviteFormProps) => {
  const form = useForm<Invite>({
    resolver: zodResolver(InviteSchema),
    defaultValues: {
      id: "",
      expiresAt: new Date(),
    },
  });

  const { mutateAsync: createMember, isPending } = useCreateMember({
    onSuccess,
    onError: () => {
      form.setError("id", {
        message: "form/invalid-invite",
      });
    },
  });

  const _onSubmit: SubmitHandler<Invite> = async ({ id }) => {
    await createMember({
      inviteId: isValidURL(id) ? id.split("/").reverse()[0] : id,
    });
    onSuccess?.();
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
          name="id"
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

type InviteDialogProps = Readonly<{
  children?: ReactNode;
}>;

export const InviteDialog = ({ children }: InviteDialogProps) => {
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
        <DialogTitle>Join group</DialogTitle>
        <InviteForm onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
