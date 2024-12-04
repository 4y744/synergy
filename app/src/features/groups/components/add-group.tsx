import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus } from "lucide-react";
import { JoinGroupForm } from "./join-group-form";
import { Button } from "@/components/ui/button";
import { CreateGroupForm } from "./create-group-form";
import { useState } from "react";

export const AddGroup = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog
      open={open}
      onOpenChange={setOpen}
    >
      <DialogTrigger asChild>
        <Button className="w-full">
          <Plus />
          <span className="line-clamp-2">Add a group</span>
        </Button>
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
