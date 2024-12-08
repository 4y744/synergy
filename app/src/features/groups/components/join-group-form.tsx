import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SubmitHandler, useForm } from "react-hook-form";
import { Invite } from "../types/invite";
import { InviteSchema } from "../types/invite";
import { zodResolver } from "@hookform/resolvers/zod";

type Props = Readonly<{
  onSubmit: () => void;
}>;

export const JoinGroupForm = ({ onSubmit: closeDialog }: Props) => {
  const form = useForm<Invite>({
    resolver: zodResolver(InviteSchema),
    defaultValues: {
      url: "",
    },
  });

  const onSubmit: SubmitHandler<Invite> = (data) => {
    closeDialog();
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Invite link</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="https://synergy.app/my-invite-link"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Join</Button>
      </form>
    </Form>
  );
};
