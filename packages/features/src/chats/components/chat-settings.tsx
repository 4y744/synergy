import { useState } from "react";
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
import { NewChat, NewChatSchema } from "../types/chat";
import { zodResolver } from "@hookform/resolvers/zod";
import { useChats } from "../hooks/use-chats";

type CreateChatButtonProps = Readonly<{
  groupId: string;
}>;

const CreateChatButton = ({ groupId }: CreateChatButtonProps) => {
  const { mutate: createChat } = useCreateChat(groupId);

  const [isOpen, setIsOpen] = useState(false);

  const form = useForm<NewChat>({
    resolver: zodResolver(NewChatSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit: SubmitHandler<NewChat> = (data) => {
    createChat(data);
    setIsOpen(false);
  };

  return (
    <Popover
      open={isOpen}
      onOpenChange={(open) => setIsOpen(open)}
    >
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

type ChatSettingsProps = Readonly<{
  groupId: string;
}>;

export const ChatSettings = ({ groupId }: ChatSettingsProps) => {
  const { data: chats } = useChats(groupId);

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
          {chats?.map((chat) => (
            <TableRow key={chat.id}>
              <TableCell>{chat.name}</TableCell>
              <TableCell>{chat.created.toLocaleDateString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CreateChatButton groupId={groupId} />
    </>
  );
};
