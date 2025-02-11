import {
  ChevronsUpDown,
  FolderIcon,
  Hash,
  HashIcon,
  MailPlusIcon,
  Settings,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";

import { Link, Navigate, useNavigate, useParams } from "@tanstack/react-router";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  Sidebar,
  SidebarCard,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@synergy/ui";

import { useAuth, useSignOut } from "@synergy/features/auth";
import {
  CreateGroupDialog,
  useGroup,
  useGroups,
} from "@synergy/features/groups";
import { useChats } from "@synergy/features/chats";
import { useFolders } from "@synergy/features/folders";
import { CreateMemberDialog } from "@synergy/features/members";

import { abbreviate, cn } from "@synergy/utils";
import { useEffect } from "react";

const SidebarGroups = () => {
  const { groupId } = useParams({ from: "/groups/$groupId" });

  const groups = useGroups();
  const selectedGroup = useGroup(groupId);

  if (!groups.find(({ data }) => data?.id == groupId)) {
    // Reached when the selected group is deleted.
    return <Navigate to="/groups" />;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        onFocus={(event) => event.target.blur()}
      >
        {/* Trigger can't take components as direct children for some reason. */}
        <div>
          <SidebarCard
            primary={selectedGroup.data!.name}
            icon={<ChevronsUpDown />}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
        <DropdownMenuLabel className="font-semibold text-xs text-muted-foreground">
          Groups
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          {groups
            .filter(({ isPending }) => !isPending)
            .map(({ data: group }) => (
              <DropdownMenuItem
                key={group!.id}
                asChild
              >
                <Link
                  to="/groups/$groupId"
                  params={{ groupId: group!.id }}
                >
                  <Avatar
                    className={cn(
                      "h-8 w-8 rounded-lg",
                      "flex items-center justify-center"
                    )}
                  >
                    <AvatarImage />
                    <AvatarFallback className="rounded-lg">
                      {abbreviate(group!.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span>{group!.name}f</span>
                </Link>
              </DropdownMenuItem>
            ))}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup className="flex flex-col gap-1">
          <CreateMemberDialog>
            <Button className="w-full">Join a group</Button>
          </CreateMemberDialog>
          <CreateGroupDialog>
            <Button className="w-full">Create a group</Button>
          </CreateGroupDialog>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const SidebarAdmin = () => {
  const { groupId } = useParams({ from: "/groups/$groupId" });
  const { data: group } = useGroup(groupId);

  const { uid } = useAuth();

  if (group?.createdBy != uid) {
    return <></>;
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Administration</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                to="/groups/$groupId/admin/invites"
                params={{ groupId }}
              >
                <MailPlusIcon />
                Invites
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                to="/groups/$groupId/admin/members"
                params={{ groupId }}
              >
                <UsersIcon />
                Members
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                to="/groups/$groupId/admin/chats"
                params={{ groupId }}
              >
                <HashIcon />
                Chats
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                to="/groups/$groupId/admin/folders"
                params={{ groupId }}
              >
                <FolderIcon />
                Folders
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                to="/groups/$groupId/admin/settings"
                params={{ groupId }}
              >
                <SettingsIcon />
                Settings
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

const SidebarChats = () => {
  const { groupId } = useParams({ from: "/groups/$groupId" });
  const chats = useChats(groupId);

  if (chats.data?.length == 0) {
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
                <Link
                  to="/groups/$groupId/chats/$chatId"
                  params={{ groupId, chatId: chat.id }}
                >
                  <Hash />
                  {chat.name}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

const SidebarFolders = () => {
  const { groupId } = useParams({ from: "/groups/$groupId" });
  const folders = useFolders(groupId);

  if (folders.data?.length == 0) {
    return <></>;
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Folders</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {folders.data?.map((folder) => (
            <SidebarMenuItem key={folder.id}>
              <SidebarMenuButton asChild>
                <Link
                  to="/groups/$groupId/folders/$folderId"
                  params={{ groupId, folderId: folder.id }}
                >
                  <FolderIcon />
                  {folder.name}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

const SidebarUser = () => {
  const navigate = useNavigate();

  const { username } = useAuth();
  const { mutate: signOut } = useSignOut();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        onFocus={(event) => event.target.blur()}
        asChild
      >
        {/* Trigger can't take components as direct children for some reason. */}
        <div>
          <SidebarCard
            primary={username}
            image=""
            icon={<Settings />}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
        <DropdownMenuLabel>My account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>Account</DropdownMenuItem>
          <DropdownMenuItem>Settings</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              navigate({ to: ".." });
              signOut();
            }}
          >
            Sign out
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const AppSidebar = () => {
  const { isMobile, setOpen } = useSidebar();

  useEffect(() => {
    if (!isMobile) {
      setOpen(true);
    }
  }, [isMobile]);

  const { groupId } = useParams({ strict: false });
  const groups = useGroups();

  if (!groupId && groups.length > 0 && groups[0]?.data) {
    return (
      <Navigate
        to="/groups/$groupId"
        params={{ groupId: groups[0].data!.id }}
      />
    );
  }

  return (
    <Sidebar>
      <SidebarHeader>
        {groupId ? (
          <SidebarGroups />
        ) : (
          <>
            <CreateMemberDialog>
              <Button className="w-full">Join a group</Button>
            </CreateMemberDialog>
            <CreateGroupDialog>
              <Button className="w-full">Create a group</Button>
            </CreateGroupDialog>
          </>
        )}
      </SidebarHeader>
      <SidebarContent>
        {groupId && (
          <>
            <SidebarAdmin />
            <SidebarChats />
            <SidebarFolders />
          </>
        )}
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser />
      </SidebarFooter>
    </Sidebar>
  );
};
