import { useState, ReactNode, ComponentProps } from "react";
import { useTranslation } from "react-i18next";
import { Loader2Icon } from "lucide-react";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  Textarea,
} from "@synergy/ui";

import { cn } from "@synergy/utils";

import { useTask } from "../api/get-tasks";
import {
  UpdateTaskInput,
  updateTaskInputSchema,
  useUpdateTask,
} from "../api/update-task";

type UpdateTaskProps = Readonly<
  ComponentProps<"form"> & {
    groupId: string;
    boardId: string;
    taskId: string;
    onSuccess?: () => void;
  }
>;

export const UpdateTaskForm = ({
  groupId,
  boardId,
  taskId,
  onSuccess,
  onSubmit,
  className,
  ...props
}: UpdateTaskProps) => {
  const { t } = useTranslation();

  const { data: task } = useTask(groupId, boardId, taskId);
  const { mutateAsync: updateTask, isPending } = useUpdateTask(
    groupId,
    boardId,
    taskId,
    { onSuccess, throwOnError: false }
  );

  const form = useForm<UpdateTaskInput>({
    resolver: zodResolver(updateTaskInputSchema),
    defaultValues: {
      name: task?.name,
      description: task?.description,
    },
  });

  const _onSubmit: SubmitHandler<UpdateTaskInput> = (data) => {
    return updateTask(data);
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
          name="description"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                {t("client.feature.task.form.fields.name.label")}
              </FormLabel>
              <FormControl>
                <Textarea
                  className="min-h-48 resize-none"
                  spellCheck={false}
                  placeholder={t(
                    "client.feature.task.form.fields.name.placeholder"
                  )}
                  {...field}
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
UpdateTaskForm.displayName = "UpdateTaskForm";

type UpdateTaskDialogProps = Readonly<{
  children?: ReactNode;
  groupId: string;
  boardId: string;
  taskId: string;
}>;

export const UpdateTaskDialog = ({
  children,
  groupId,
  boardId,
  taskId,
}: UpdateTaskDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>{t("client.feature.task.update")}</DialogTitle>
        <UpdateTaskForm
          groupId={groupId}
          boardId={boardId}
          taskId={taskId}
          onSuccess={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
UpdateTaskDialog.displayName = "UpdateTaskDialog";
