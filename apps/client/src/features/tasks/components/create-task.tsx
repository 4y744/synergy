import React, { ComponentProps, ReactNode, useState } from "react";
import { useTranslation } from "react-i18next";
import { Loader2Icon } from "lucide-react";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Button,
  Checkbox,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Label,
  Textarea,
} from "@synergy/ui";

import { cn } from "@synergy/utils";

import { useMembers } from "~/features/members/api/get-members";
import { useUser } from "~/features/users/api/get-user";

import {
  useCreateTask,
  CreateTaskInput,
  createTaskInputSchema,
} from "../api/create-task";

type CreateTaskProps = Readonly<
  ComponentProps<"form"> & {
    groupId: string;
    boardId: string;
    onSuccess?: () => void;
  }
>;

export const CreateTaskForm = ({
  groupId,
  boardId,
  onSuccess,
  className,
  onSubmit,
  ...props
}: CreateTaskProps) => {
  const { t } = useTranslation();

  const { data: members } = useMembers(groupId);

  const { mutateAsync: createTask, isPending } = useCreateTask(
    groupId,
    boardId,
    {
      onSuccess,
      throwOnError: false,
    }
  );

  const form = useForm<CreateTaskInput>({
    resolver: zodResolver(createTaskInputSchema),
    defaultValues: {
      name: "",
      description: "",
      assignedTo: [],
    },
  });

  const _onSubmit: SubmitHandler<CreateTaskInput> = (data) => {
    return createTask(data);
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
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("client.feature.task.form.fields.name.label")}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t(
                    "client.feature.task.form.fields.name.placeholder"
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("client.feature.task.form.fields.description.label")}
              </FormLabel>
              <FormControl>
                <Textarea
                  className="min-h-48 resize-none"
                  spellCheck={false}
                  placeholder={t(
                    "client.feature.task.form.fields.description.placeholder"
                  )}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          name="assignedTo"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("client.feature.task.form.fields.assigned_to.label")}
              </FormLabel>
              <FormControl>
                <div>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full flex justify-start"
                      >
                        {(field.value as string[]).length > 0
                          ? (field.value as string[]).map((uid, index) => (
                              <React.Fragment key={uid}>
                                {index ? ", " : ""}
                                <MemberName uid={uid} />{" "}
                              </React.Fragment>
                            ))
                          : t(
                              "client.feature.task.form.fields.assigned_to.placeholder"
                            )}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="min-w-64">
                      <DropdownMenuLabel>
                        {t("client.feature.task.form.fields.assigned_to.label")}
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup className="max-h-64 overflow-y-scroll">
                        {members?.map(({ uid }) => (
                          <DropdownMenuItem
                            key={uid}
                            onClick={(event) => {
                              if (field.value.includes(uid)) {
                                field.onChange(
                                  (field.value as string[]).filter(
                                    (value) => value != uid
                                  )
                                );
                              } else {
                                field.onChange([...field.value, uid]);
                              }

                              event.preventDefault();
                            }}
                          >
                            <Checkbox
                              id={uid}
                              checked={field.value.includes(uid)}
                            />
                            <Label htmlFor={uid}>
                              <MemberName uid={uid} />
                            </Label>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
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
              <Loader2Icon className="animate-spin" />
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
CreateTaskForm.displayName = "CreateTaskForm";

// We need this, because "member" queries only come with a uid.
const MemberName = ({ uid }: { uid: string }) => {
  const { data: user, isPending } = useUser(uid);

  if (isPending) {
    return <></>;
  }

  return <>{user!.username}</>;
};
MemberName.displayName = "CreateTaskForm:MemberName";

type CreateTaskDialogProps = Readonly<{
  children?: ReactNode;
  groupId: string;
  boardId: string;
}>;

export const CreateTaskDialog = ({
  children,
  groupId,
  boardId,
}: CreateTaskDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>{t("client.feature.task.create")}</DialogTitle>
        <CreateTaskForm
          groupId={groupId}
          boardId={boardId}
          onSuccess={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
CreateTaskDialog.displayName = "CreateTaskDialog";
