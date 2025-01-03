import { Link, Navigate, useNavigate, useParams } from "react-router-dom";
import { ChevronsUpDown, Hash, MailPlus, Settings, Users } from "lucide-react";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@synergy/ui";

import { abbreviate, cn } from "@synergy/utils";

import { useAuth, useSignOut } from "@synergy/features/auth";

import {
  CreateGroupDialog,
  GroupInvite,
  GroupSettings,
  JoinGroupDialog,
  MembersList,
  useGroups,
} from "@synergy/features/groups";

import { ChatsSettings, useChats } from "@synergy/features/chats";

const SidebarGroups = () => {
  const { groupId } = useParams();

  const { uid } = useAuth();
  const groups = useGroups(uid);

  if (!groupId && groups.length > 0) {
    return <Navigate to={`/groups/${groups[0]?.data?.id}`} />;
  }

  const selectedGroup = groups.find(({ data }) => data?.id == groupId)?.data;

  return groups.length == 0 || !selectedGroup ? (
    <>
      <JoinGroupDialog uid={uid}>
        <Button className="w-full">Join a group</Button>
      </JoinGroupDialog>
      <CreateGroupDialog uid={uid}>
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
        {groups
          .filter(({ isPending }) => !isPending)
          .map(({ data: group }) => (
            <DropdownMenuItem
              key={group?.id}
              asChild
            >
              <Link to={`/groups/${group!.id}`}>
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

        <DropdownMenuSeparator />
        <DropdownMenuGroup className="flex flex-col gap-1">
          <JoinGroupDialog
            className="w-full"
            uid={uid}
          >
            <Button className="w-full">Join a group</Button>
          </JoinGroupDialog>
          <CreateGroupDialog
            className="w-full"
            uid={uid}
          >
            <Button className="w-full">Create a group</Button>
          </CreateGroupDialog>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const SidebarAdmin = () => {
  const { groupId } = useParams();

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Administration</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Dialog>
              <DialogTrigger
                className="w-full"
                asChild
              >
                <SidebarMenuButton>
                  <MailPlus />
                  <span>Invite</span>
                </SidebarMenuButton>
              </DialogTrigger>
              <DialogContent>
                <DialogTitle>Invite</DialogTitle>
                <DialogDescription>
                  Use the link below to invite people to your group.
                </DialogDescription>
                <GroupInvite groupId={groupId!} />
              </DialogContent>
            </Dialog>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Dialog>
              <DialogTrigger
                className="w-full"
                asChild
              >
                <SidebarMenuButton>
                  <Users />
                  <span>Members</span>
                </SidebarMenuButton>
              </DialogTrigger>
              <DialogContent
                onOpenAutoFocus={(event) => event.preventDefault()}
              >
                <DialogTitle>Members</DialogTitle>
                <DialogDescription>
                  Manage members of the group.
                </DialogDescription>
                <MembersList groupId="" />
              </DialogContent>
            </Dialog>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Dialog>
              <DialogTrigger asChild>
                <SidebarMenuButton>
                  <Settings />
                  <span>Settings</span>
                </SidebarMenuButton>
              </DialogTrigger>
              <DialogContent className="max-w-2xl">
                <DialogTitle>Group settings</DialogTitle>
                <DialogDescription>
                  Manage your group's settings.
                </DialogDescription>
                <Tabs
                  className="mt-2 h-[512px] w-[512px] flex gap-2"
                  defaultValue="general"
                >
                  <TabsList className="flex flex-col items-start w-fit">
                    <TabsTrigger value="general">General</TabsTrigger>
                    <TabsTrigger value="chats">Chats</TabsTrigger>
                  </TabsList>
                  <TabsContent
                    className="flex flex-col gap-2"
                    value="general"
                  >
                    <GroupSettings />
                  </TabsContent>
                  <TabsContent
                    className="flex flex-col gap-2"
                    value="chats"
                  >
                    <ChatsSettings groupId={groupId!} />
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

const SidebarChats = () => {
  const { groupId } = useParams();
  const chats = useChats(groupId!);

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
              signOut();
              navigate("/groups");
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
  const { groupId } = useParams();

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
