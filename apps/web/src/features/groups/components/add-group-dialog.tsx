import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JoinGroupForm } from "./join-group-form";
import { CreateGroupForm } from "./create-group-form";
import { ReactElement, ReactNode, useState } from "react";
type Props = Readonly<{
  children?: ReactElement;
}>;

export const AddGroupDialog = ({ children }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogTitle className="relative">Add group</DialogTitle>
        <Tabs defaultValue="join">
          <TabsList className="absolute top-4 left-1/2 -translate-x-1/2">
            <TabsTrigger value="join">Join</TabsTrigger>
            <TabsTrigger value="create">Create</TabsTrigger>
          </TabsList>
          <TabsContent value="join">
            <JoinGroupForm onSubmit={() => setOpen(false)} />
          </TabsContent>
          <TabsContent value="create">
            <CreateGroupForm onSubmit={() => setOpen(false)} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};
