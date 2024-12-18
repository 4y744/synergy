import { MailPlus, Settings, Users } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useParams } from "react-router-dom";
import { useGroup } from "@/features/groups/hooks/use-group";
import { useChats } from "@/features/chats/hooks/use-chats";
import { Button } from "@/components/ui/button";

export const NavAdmin = () => {
  const { groupId } = useParams();

  const group = useGroup(groupId!);
  const chats = useChats(groupId!);

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Administration</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <MailPlus />
              <span>Invite</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Users />
              <span>Members</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Dialog>
              <DialogTrigger asChild>
                <SidebarMenuButton>
                  <Settings />
                  <span>Settings</span>
                </SidebarMenuButton>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>
                    <span>Group settings for </span>
                    <span className="underline">{group.data?.name}</span>
                  </DialogTitle>
                  <DialogDescription>cool description</DialogDescription>
                </DialogHeader>
                <div>
                  <span className="font-medium">Chats</span>
                  <div className="grid grid-cols-1 gap-2">
                    {chats.data?.map((chat) => (
                      <div className="flex">
                        <div>{chat.name}</div>
                        <Button
                          variant="destructive"
                          className="ml-auto"
                        >
                          Delete
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
