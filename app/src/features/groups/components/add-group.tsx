import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { SidebarMenuButton } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { useState } from "react";
import { CreateGroupForm } from "./create-group-form";
import { JoinGroupForm } from "./join-group-form";

export const AddGroup = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <SidebarMenuButton>
          <Plus />
          <span className="line-clamp-2">Add a group</span>
        </SidebarMenuButton>
      </DialogTrigger>
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
