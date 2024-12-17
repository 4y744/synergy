import { Hash } from "lucide-react";
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useChats } from "@/features/chats/hooks/use-chats";
import { Link, useParams } from "react-router-dom";

export const NavChats = () => {
  const { groupId } = useParams();
  const chats = useChats(groupId!);

  if (chats.isError) {
    return <></>;
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Chats</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {chats.data?.map((chat) => (
            <SidebarMenuItem key={chat.id}>
              <SidebarMenuButton asChild>
                <Link to={`/groups/${groupId}/chats/${chat.id}`}>
                  <Hash />
                  <span>{chat.name}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
