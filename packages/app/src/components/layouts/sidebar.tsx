import { Link, Navigate, useNavigate, useParams } from "@tanstack/react-router";
import {
  ChevronsUpDown,
  Hash,
  HashIcon,
  MailPlusIcon,
  Settings,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";

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
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@synergy/ui";

import { abbreviate, cn } from "@synergy/utils";

import { useAuth, useSignOut } from "@synergy/features/auth";

import {
  CreateGroupDialog,
  useGroup,
  useGroups,
} from "@synergy/features/groups";

import { useChats } from "@synergy/features/chats";

import { CreateMemberDialog } from "@synergy/features/members";
import { ReactNode } from "react";

const SidebarGroups = () => {
  const params = useParams({ strict: false });
  const groups = useGroups();

  if (!params.groupId && groups.length > 0) {
    return (
      <Navigate
        to="/groups/$groupId"
        params={{ groupId: groups[0]?.data?.id! }}
      />
    );
  }

  const selectedGroup = groups.find(
    ({ data }) => data?.id == params.groupId
  )?.data;

  return groups.length == 0 || !selectedGroup ? (
    <>
      <CreateMemberDialog>
        <Button className="w-full">Join a group</Button>
      </CreateMemberDialog>
      <CreateGroupDialog>
        <Button className="w-full">Create a group</Button>
      </CreateGroupDialog>
    </>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger
        asChild
        onFocus={(event) => event.target.blur()}
      >
        {/* Trigger can't take components as direct children for some reason. */}
        <div>
          <SidebarCard
            primary={selectedGroup.name}
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
                  params={{ groupId: params.groupId! }}
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
  const params = useParams({ strict: false });
  const chats = useChats(params.groupId!);

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
                  params={{ groupId: params.groupId!, chatId: chat.id }}
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

const SidebarUser = () => {
  const navigate = useNavigate();

  const { username, email } = useAuth();
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
            secondary={email}
            image=""
            icon={<Settings />}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
        <DropdownMenuLabel>My account</DropdownMenuLabel>
        <DropdownMenuGroup></DropdownMenuGroup>
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
  const { groupId } = useParams({ strict: false });
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarGroups />
      </SidebarHeader>
      <SidebarContent>
        {groupId && (
          <>
            <SidebarAdmin />
            <SidebarChats />
          </>
        )}
      </SidebarContent>
      <SidebarFooter>
        <SidebarUser />
      </SidebarFooter>
    </Sidebar>
  );
};

type SidebarLayoutProps = Readonly<{ children?: ReactNode }>;

export const SidebarLayout = ({ children }: SidebarLayoutProps) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
};
