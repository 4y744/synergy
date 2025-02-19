import { ComponentProps } from "react";
import { Loader2 } from "lucide-react";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
} from "@synergy/ui";

import { cn } from "@synergy/utils";

import { useGroup } from "../hooks/use-group";
import { useUpdateGroup } from "../hooks/use-update-group";
import {
  UpdateGroupInput,
  updateGroupInputSchema,
} from "../types/update-group";
import { useTranslation } from "@synergy/i18n";

type UpdateGroupProps = Readonly<
  ComponentProps<"form"> & {
    groupId: string;
    onSuccess?: () => void;
  }
>;

export const UpdateGroupForm = ({
  groupId,
  onSubmit,
  onSuccess,
  className,
  ...props
}: UpdateGroupProps) => {
  const { data: group } = useGroup(groupId);
  const { mutateAsync: updateGroup, isPending } = useUpdateGroup(groupId, {
    onSuccess,
  });

  const form = useForm<UpdateGroupInput>({
    resolver: zodResolver(updateGroupInputSchema),
    defaultValues: {
      name: group?.name,
    },
  });

  const { t } = useTranslation();

  const _onSubmit: SubmitHandler<UpdateGroupInput> = (data) => {
    return updateGroup(data);
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
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("group.form.fields.name.label")}</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t("group.form.fields.name.placeholder")}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          disabled={isPending}
          type="submit"
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin" />
              {t("generic.saving")}
            </>
          ) : (
            t("generic.save")
          )}
        </Button>
      </form>
    </Form>
  );
};
