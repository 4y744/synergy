import { useState, ReactNode, ComponentProps, useRef } from "react";
import { FileUpIcon, Loader2 } from "lucide-react";

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

import { useUpdateUser } from "../hooks/use-update-user";
import { UpdateUserInput, updateUserInputSchema } from "../types/update-user";

import { useAuth } from "~/auth";
import { useUser } from "../hooks/use-user";

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

  const { mutateAsync: updateUser, isPending } = useUpdateUser({
    onSuccess,
  });

  const { uid } = useAuth();
  const { data: user } = useUser(uid);

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
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="John Doe"
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
            Upload a profile picture
          </Button>
        </div>
        <Button
          disabled={isPending}
          type="submit"
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin" />
              Saving
            </>
          ) : (
            <>Save</>
          )}
        </Button>
      </form>
    </Form>
  );
};

type UpdateUserDialogProps = Readonly<{
  children?: ReactNode;
}>;

export const UpdateUserDialog = ({ children }: UpdateUserDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Edit your profile</DialogTitle>
        <UpdateUserForm onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
