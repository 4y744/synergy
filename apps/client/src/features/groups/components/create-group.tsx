import { ComponentProps, ReactNode, useState } from "react";
import { Loader2 } from "lucide-react";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTranslation } from "react-i18next";

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

import { cn } from "@synergy/utils";

import { useCreateGroup } from "../hooks/use-create-group";
import {
  CreateGroupInput,
  createGroupInputSchema,
} from "../types/create-group";

type CreateGroupProps = Readonly<
  ComponentProps<"form"> & {
    onSuccess?: (groupId: string) => void;
  }
>;

export const CreateGroupForm = ({
  onSuccess,
  onSubmit,
  className,
  ...props
}: CreateGroupProps) => {
  const { t } = useTranslation();

  const { mutateAsync: createGroup, isPending } = useCreateGroup({
    onSuccess,
    throwOnError: false,
  });

  const form = useForm<CreateGroupInput>({
    resolver: zodResolver(createGroupInputSchema),
    defaultValues: {
      name: "",
    },
  });

  const _onSubmit: SubmitHandler<CreateGroupInput> = (data) => {
    return createGroup(data);
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("client.feature.group.form.fields.name.label")}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t(
                    "client.feature.group.form.fields.name.placeholder"
                  )}
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
          {isPending ? (
            <>
              <Loader2 className="animate-spin" />
              {t("client.action.creating")}
            </>
          ) : (
            t("client.action.create")
          )}
        </Button>
      </form>
    </Form>
  );
};

type CreateGroupDialogProps = Readonly<{
  children?: ReactNode;
}>;

export const CreateGroupDialog = ({ children }: CreateGroupDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>{t("client.feature.group.create")}</DialogTitle>
        <CreateGroupForm onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
