"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { GroupSchema } from "../schemas/group";
import { Group } from "../types/group";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";

type Props = Readonly<{
  onSubmit: () => void;
}>;

export const CreateGroupForm = ({ onSubmit: closeDialog }: Props) => {
  const form = useForm<Group>({
    resolver: zodResolver(GroupSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit: SubmitHandler<Group> = (data) => {
    closeDialog();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
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
        <Button type="submit">Create</Button>
      </form>
    </Form>
  );
};
