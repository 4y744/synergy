import { SubmitHandler, useForm } from "react-hook-form";
import { GroupSchema } from "../types/group";
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
import { useCreateGroup } from "../hooks/use-create-group";
import { authStore } from "@/features/auth/stores/auth-store";
import { NewGroup, NewGroupSchema } from "../types/group";

type Props = Readonly<{
  onSubmit: () => void;
}>;

export const CreateGroupForm = ({ onSubmit: closeDialog }: Props) => {
  const { mutate: createGroup } = useCreateGroup();
  const form = useForm<NewGroup>({
    resolver: zodResolver(NewGroupSchema),
    defaultValues: {
      name: "",
      uid: authStore.getState()!.uid,
    },
  });

  const onSubmit: SubmitHandler<NewGroup> = (data) => {
    createGroup(data);
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
