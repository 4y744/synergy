import { ComponentProps, ReactNode, useState } from "react";
import { Loader2 } from "lucide-react";

import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

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
  const { mutateAsync: createGroup, isPending } = useCreateGroup({ onSuccess });

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
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="School project"
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

type CreateGroupDialogProps = Readonly<{
  children?: ReactNode;
}>;

export const CreateGroupDialog = ({ children }: CreateGroupDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle>Create group</DialogTitle>
        <CreateGroupForm onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
};
