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
} from "@synergy/ui";

import { cn } from "@synergy/utils";

import { useBoard } from "../api/get-boards";
import { useUpdateBoard } from "../api/update-board";
import { CreateBoardInput, createBoardInputSchema } from "../api/create-board";

type UpdateBoardProps = Readonly<
  ComponentProps<"form"> & {
    groupId: string;
    boardId: string;
    onSuccess?: () => void;
  }
>;

export const UpdateBoardForm = ({
  groupId,
  boardId,
  onSuccess,
  onSubmit,
  className,
  ...props
}: UpdateBoardProps) => {
  const { t } = useTranslation();

  const { data: board } = useBoard(groupId, boardId);
  const { mutateAsync: updateBoard, isPending } = useUpdateBoard(
    groupId,
    boardId,
    { onSuccess, throwOnError: false }
  );

  const form = useForm<CreateBoardInput>({
    resolver: zodResolver(createBoardInputSchema),
    defaultValues: {
      name: board?.name,
    },
  });

  const _onSubmit: SubmitHandler<CreateBoardInput> = (data) => {
    return updateBoard(data);
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
                {t("client.feature.board.form.fields.name.label")}
              </FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder={t(
                    "client.feature.board.form.fields.name.placeholder"
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
UpdateBoardForm.displayName = "UpdateBoardForm";

type UpdateBoardDialogProps = Readonly<{
  children?: ReactNode;
  groupId: string;
  boardId: string;
}>;

export const UpdateBoardDialog = ({
  children,
  groupId,
  boardId,
}: UpdateBoardDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>{t("client.feature.board.update")}</DialogTitle>
        <UpdateBoardForm
          groupId={groupId}
          boardId={boardId}
          onSuccess={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
};
UpdateBoardDialog.displayName = "UpdateBoardDialog";
