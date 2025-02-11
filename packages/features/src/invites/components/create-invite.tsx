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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@synergy/ui";

import { cn } from "@synergy/utils";

import { useCreateInvite } from "../hooks/use-create-invite";
import {
  CreateInviteInput,
  createInviteInputSchema,
} from "../types/create-invite";

type CreateInviteFormProps = Readonly<
  ComponentProps<"form"> & {
    groupId: string;
    onSuccess?: () => void;
  }
>;

export const EXPIRATION_TIME = {
  "5mins": "300000",
  "30mins": "1800000",
  "1hour": "3600000",
  "1day": "86400000",
  "1week": "604800000",
  "1month": "2678400000",
  "1year": "31556952000",
  never: "99999999999999",
};

export const CreateInviteForm = ({
  groupId,
  onSuccess,
  onSubmit,
  className,
  ...props
}: CreateInviteFormProps) => {
  const { mutateAsync: createInvite, isPending } = useCreateInvite(groupId, {
    onSuccess,
  });

  const form = useForm<CreateInviteInput>({
    resolver: zodResolver(createInviteInputSchema),
  });

  const _onSubmit: SubmitHandler<CreateInviteInput> = (date) => {
    return createInvite(date);
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
          name="expiresAt"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expires in</FormLabel>
              <Select
                onValueChange={(value) => {
                  return field.onChange(new Date(Date.now() + parseInt(value)));
                }}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="When should your invite expire?" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value={EXPIRATION_TIME["5mins"]}>
                    5 minutes
                  </SelectItem>
                  <SelectItem value={EXPIRATION_TIME["30mins"]}>
                    30 minutes
                  </SelectItem>
                  <SelectItem value={EXPIRATION_TIME["1hour"]}>
                    1 hour
                  </SelectItem>
                  <SelectItem value={EXPIRATION_TIME["1day"]}>1 day</SelectItem>
                  <SelectItem value={EXPIRATION_TIME["1week"]}>
                    1 week
                  </SelectItem>
                  <SelectItem value={EXPIRATION_TIME["1month"]}>
                    1 month
                  </SelectItem>
                  <SelectItem value={EXPIRATION_TIME["1year"]}>
                    1 year
                  </SelectItem>
                  <SelectItem value={EXPIRATION_TIME["never"]}>
                    never
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin" />
              Creating
            </>
          ) : (
            <>Create</>
          )}
        </Button>
      </form>
    </Form>
  );
};

type CreateInviteDialogProps = Readonly<{
  children?: ReactNode;
  groupId: string;
}>;

export const CreateInviteDialog = ({
  children,
  groupId,
}: CreateInviteDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Create invite</DialogTitle>
        <CreateInviteForm
          groupId={groupId}
          onSuccess={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
