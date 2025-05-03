import { useState, ReactNode, ComponentProps, useRef } from "react";
import { FileUpIcon, Loader2Icon } from "lucide-react";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTranslation } from "react-i18next";

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
  DialogTrigger,
  DialogContent,
  DialogTitle,
} from "@synergy/ui";

import { cn } from "@synergy/utils";

import { useAuth } from "~/features/auth/hooks/use-auth";

import { useUser } from "../api/get-user";
import {
  updateUserInputSchema,
  UpdateUserInput,
  useUpdateUser,
} from "../api/update-user";

type UpdateUserProps = Readonly<
  ComponentProps<"form"> & {
    onSuccess?: () => void;
  }
>;

export const UpdateUserForm = ({
  onSuccess,
  onSubmit,
  className,
  ...props
}: UpdateUserProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const { uid } = useAuth();
  const { t } = useTranslation();

  const { data: user } = useUser(uid);
  const { mutateAsync: updateUser, isPending } = useUpdateUser({
    onSuccess,
    throwOnError: false,
  });

  const form = useForm<UpdateUserInput>({
    resolver: zodResolver(updateUserInputSchema),
    defaultValues: {
      username: user?.username,
    },
  });

  const _onSubmit: SubmitHandler<UpdateUserInput> = (data) => {
    return updateUser(data);
  };

  return (
    <Form {...form}>
      <form
        className={cn("space-y-2", className)}
        onSubmit={(event) => {
          onSubmit?.(event);
          form.handleSubmit(_onSubmit)(event);
        }}
        {...props}
      >
        <FormField
          name="username"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("client.feature.user.form.fields.username.label")}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t(
                    "client.feature.user.form.fields.username.placeholder"
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          <input
            className="hidden"
            type="file"
            onChange={(event) => {
              form.setValue("pfp", event.target.files![0]);
            }}
            ref={inputRef}
          />
          <Button
            onClick={(event) => {
              inputRef.current!.click();
              event?.preventDefault();
            }}
          >
            <FileUpIcon />
            {t("client.feature.user.upload_pfp")}
          </Button>
        </div>
        <Button
          disabled={isPending}
          type="submit"
        >
          {isPending ? (
            <>
              <Loader2Icon className="animate-spin" />
              {t("client.action.saving")}
            </>
          ) : (
            t("client.action.save")
          )}
        </Button>
      </form>
    </Form>
  );
};
UpdateUserForm.displayName = "UpdateUserForm";

type UpdateUserDialogProps = Readonly<{
  children?: ReactNode;
}>;

export const UpdateUserDialog = ({ children }: UpdateUserDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>{t("client.feature.user.update")}</DialogTitle>
        <UpdateUserForm onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
UpdateUserDialog.displayName = "UpdateUserDialog";
