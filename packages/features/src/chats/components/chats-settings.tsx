import {
  Button,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@synergy/ui";
import { Plus } from "lucide-react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCreateChat } from "../hooks/use-create-chat";
import { NewChat, NewChatShema } from "../types/chat";
import { zodResolver } from "@hookform/resolvers/zod";

type CreateChatButtonProps = Readonly<{
  groupId: string;
}>;

const CreateChatButton = ({ groupId }: CreateChatButtonProps) => {
  const { mutate: createChat } = useCreateChat(groupId);

  const form = useForm<NewChat>({
    resolver: zodResolver(NewChatShema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit: SubmitHandler<NewChat> = (data) => {
    createChat(data);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="w-full">
          <Plus />
          New chat
        </Button>
      </PopoverTrigger>
      <PopoverContent>
        <div>
          <Form {...form}>
            <form
              className="space-y-2"
              onSubmit={form.handleSubmit(onSubmit)}
            >
              <FormField
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="My cool group"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button>Create</Button>
            </form>
          </Form>
        </div>
      </PopoverContent>
    </Popover>
  );
};

type ChatsSettingsProps = Readonly<{
  groupId: string;
}>;

export const ChatsSettings = ({ groupId }: ChatsSettingsProps) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Created at</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>chat1</TableCell>
            <TableCell>date</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <CreateChatButton groupId={groupId} />
    </>
  );
};
