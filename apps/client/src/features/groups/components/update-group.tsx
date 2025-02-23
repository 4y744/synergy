import { ComponentProps, useRef } from "react";
import { FileUpIcon, Loader2 } from "lucide-react";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useTranslation } from "react-i18next";

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
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const { data: group } = useGroup(groupId);
  const { mutateAsync: updateGroup, isPending } = useUpdateGroup(groupId, {
    onSuccess,
    throwOnError: false,
  });

  const form = useForm<UpdateGroupInput>({
    resolver: zodResolver(updateGroupInputSchema),
    defaultValues: {
      name: group?.name,
    },
  });

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
        <div>
          <input
            className="hidden"
            type="file"
            onChange={(event) => {
              form.setValue("icon", event.target.files![0]);
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
            {t("client.feature.group.upload_icon")}
          </Button>
        </div>
        <Button
          disabled={isPending}
          type="submit"
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin" />
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
