import { useEffect } from "react";
import {
  ChevronsUpDown,
  FolderIcon,
  Hash,
  HashIcon,
  LogOutIcon,
  MailPlusIcon,
  Settings,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";

import { Link, useNavigate, useParams } from "@tanstack/react-router";

import { useTranslation } from "react-i18next";

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
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
  Separator,
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
  Theme,
  useSidebar,
  useTheme,
} from "@synergy/ui";

import { useAuth, useSignOut } from "@synergy/features/auth";
import {
  CreateGroupDialog,
  useGroup,
  useGroups,
} from "@synergy/features/groups";
import { useChats } from "@synergy/features/chats";
import { useFolders } from "@synergy/features/folders";
import {
  CreateMemberDialog,
  DeleteMemberDialog,
} from "@synergy/features/members";
import { UpdateUserDialog, useUser } from "@synergy/features/users";

import { abbreviate, cn } from "@synergy/utils";

const SidebarGroups = () => {
  const { groupId } = useParams({ from: "/groups/$groupId" });

  const groups = useGroups();
  const selectedGroup = useGroup(groupId);

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
                  className="flex items-center gap-2 w-full"
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

const SidebarLeave = () => {
  const { groupId } = useParams({ from: "/groups/$groupId" });

  const { uid } = useAuth();

  const { data: group } = useGroup(groupId);

  if (group?.createdBy == uid) {
    return <></>;
  }

  return (
    <SidebarGroup className="mt-auto">
      <SidebarContent>
        <DeleteMemberDialog
          groupId={groupId}
          memberId={uid}
          type="leave"
        >
          <Button variant="destructive">
            <LogOutIcon />
            Leave group
          </Button>
        </DeleteMemberDialog>
      </SidebarContent>
    </SidebarGroup>
  );
};

const SidebarUser = () => {
  const navigate = useNavigate();

  const { uid } = useAuth();
  const { mutate: signOut } = useSignOut();

  const { data: user } = useUser(uid);

  const { theme, setTheme } = useTheme();
  const { i18n } = useTranslation();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        onFocus={(event) => event.target.blur()}
        asChild
      >
        {/* Trigger can't take components as direct children for some reason. */}
        <div>
          <SidebarCard
            primary={user!.username}
            image={user!.pfp}
            icon={<Settings />}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
        <DropdownMenuGroup>
          <DropdownMenuLabel>Settings</DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <UpdateUserDialog>
            <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
              Account
            </DropdownMenuItem>
          </UpdateUserDialog>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Theme</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={theme}
                onValueChange={(value) => setTheme(value as Theme)}
              >
                <DropdownMenuRadioItem value="dark">Dark</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="light">
                  Light
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Language</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={i18n.language}
                onValueChange={(value) => i18n.changeLanguage(value)}
              >
                <DropdownMenuRadioItem value="en">
                  English
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="bg">
                  Български
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => {
              //@ts-ignore
              navigate({ to: "/" });
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
  const { groupId } = useParams({ strict: false });
  const { isMobile, setOpen } = useSidebar();

  useEffect(() => {
    if (!isMobile) {
      setOpen(true);
    }
  }, [isMobile]);

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
            <SidebarLeave />
          </>
        )}
      </SidebarContent>
      <div className="px-2">
        <Separator />
      </div>
      <SidebarFooter>
        <SidebarUser />
      </SidebarFooter>
    </Sidebar>
  );
};
