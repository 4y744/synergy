import { useTranslation } from "react-i18next";
import { Link, useNavigate, useParams } from "@tanstack/react-router";
import {
  ChevronsUpDownIcon,
  ClipboardListIcon,
  FolderIcon,
  HashIcon,
  LogOutIcon,
  MailPlusIcon,
  SettingsIcon,
  UsersIcon,
  Volume2Icon,
} from "lucide-react";

import { auth } from "@synergy/libs/firebase";

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
  useTheme,
} from "@synergy/ui";

import { LANGUAGES } from "@synergy/i18n";
import { abbreviate, cn } from "@synergy/utils";

import { useAuth } from "~/features/auth/hooks/use-auth";
import { useSignOut } from "~/features/auth/api/sign-out";

import { useGroup, useGroups } from "~/features/groups/api/get-group";
import { CreateGroupDialog } from "~/features/groups/components/create-group";

import { useChats } from "~/features/chats/api/get-chats";
import { useCalls } from "~/features/calls/api/get-calls";

import { ParticipantsList } from "~/features/participants/components/participants-list";
import { CreateParticipant } from "~/features/participants/components/create-participant";

import { useFolders } from "~/features/folders/api/get-folders";

import { CreateMemberDialog } from "~/features/members/components/create-member";
import { DeleteMemberDialog } from "~/features/members/components/delete-member";

import { useBoards } from "~/features/boards/api/get-boards";

import { useUser } from "~/features/users/api/get-user";
import { UpdateUserDialog } from "~/features/users/components/update-user";

import { Logo } from "../logo";

const SidebarGroups = () => {
  const { groupId } = useParams({ from: "/(app)/groups/$groupId" });
  const { t } = useTranslation();

  const groups = useGroups();
  const selectedGroup = useGroup(groupId);

  return (
    <SidebarGroup>
      <DropdownMenu>
        <DropdownMenuTrigger
          asChild
          onFocus={(event) => event.target.blur()}
        >
          {/* Trigger can't take components as direct children for some reason. */}
          <div>
            <SidebarCard
              primary={selectedGroup.data!.name}
              image={selectedGroup.data?.icon}
              icon={<ChevronsUpDownIcon />}
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
          <DropdownMenuLabel className="font-semibold text-xs text-muted-foreground">
            {t("client.sidebar.category.groups")}
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
                      <AvatarImage src={group?.icon} />
                      <AvatarFallback className="rounded-lg">
                        {abbreviate(group!.name)}
                      </AvatarFallback>
                    </Avatar>
                    <span>{group!.name}</span>
                  </Link>
                </DropdownMenuItem>
              ))}
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup className="flex flex-col gap-1">
            <CreateMemberDialog>
              <Button>{t("client.feature.group.join")}</Button>
            </CreateMemberDialog>
            <CreateGroupDialog>
              <Button>{t("client.feature.group.create")}</Button>
            </CreateGroupDialog>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarGroup>
  );
};
SidebarGroups.displayName = "SidebarGroups";

const SidebarNoGroups = () => {
  const { t } = useTranslation();

  return (
    <SidebarGroup>
      <SidebarContent>
        <CreateMemberDialog>
          <Button>{t("client.feature.group.join")}</Button>
        </CreateMemberDialog>
        <CreateGroupDialog>
          <Button>{t("client.feature.group.create")}</Button>
        </CreateGroupDialog>
      </SidebarContent>
    </SidebarGroup>
  );
};
SidebarNoGroups.displayName = "SidebarNoGroups";

const SidebarAdmin = () => {
  const { groupId } = useParams({ from: "/(app)/groups/$groupId" });
  const { t } = useTranslation();

  const { uid } = useAuth();
  const { data: group } = useGroup(groupId);

  if (group?.createdBy != uid) {
    return <></>;
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        {t("client.sidebar.category.administration")}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                to="/groups/$groupId/admin/invites"
                params={{ groupId }}
                activeProps={{ className: "bg-sidebar-accent" }}
              >
                <MailPlusIcon />
                {t("client.sidebar.category.invites")}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                to="/groups/$groupId/admin/members"
                params={{ groupId }}
                activeProps={{ className: "bg-sidebar-accent" }}
              >
                <UsersIcon />
                {t("client.sidebar.category.members")}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                to="/groups/$groupId/admin/chats"
                params={{ groupId }}
                activeProps={{ className: "bg-sidebar-accent" }}
              >
                <HashIcon />
                {t("client.sidebar.category.chats")}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                to="/groups/$groupId/admin/calls"
                params={{ groupId }}
                activeProps={{ className: "bg-sidebar-accent" }}
              >
                <Volume2Icon />
                {t("client.sidebar.category.calls")}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                to="/groups/$groupId/admin/folders"
                params={{ groupId }}
                activeProps={{ className: "bg-sidebar-accent" }}
              >
                <FolderIcon />
                {t("client.sidebar.category.folders")}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                to="/groups/$groupId/admin/boards"
                params={{ groupId }}
                activeProps={{ className: "bg-sidebar-accent" }}
              >
                <ClipboardListIcon />
                {t("client.sidebar.category.boards")}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                to="/groups/$groupId/admin/settings"
                params={{ groupId }}
                activeProps={{ className: "bg-sidebar-accent" }}
              >
                <SettingsIcon />
                {t("client.sidebar.category.settings")}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
SidebarAdmin.displayName = "SidebarAdmin";

const SidebarChats = () => {
  const { groupId } = useParams({ from: "/(app)/groups/$groupId" });
  const { t } = useTranslation();

  const { data: chats } = useChats(groupId);

  if (chats?.length == 0) {
    return <></>;
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        {t("client.sidebar.category.chats")}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {chats?.map((chat) => (
            <SidebarMenuItem key={chat.id}>
              <SidebarMenuButton asChild>
                <Link
                  to="/groups/$groupId/chats/$chatId"
                  params={{ groupId, chatId: chat.id }}
                  activeProps={{ className: "bg-sidebar-accent" }}
                >
                  <HashIcon />
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
SidebarChats.displayName = "SidebarChats";

const SidebarCalls = () => {
  const { groupId } = useParams({ from: "/(app)/groups/$groupId" });
  const { t } = useTranslation();

  const { data: calls } = useCalls(groupId);

  if (calls?.length == 0) {
    return <></>;
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        {t("client.sidebar.category.calls")}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {calls?.map((call) => (
            <SidebarMenuItem
              className="space-y-2"
              key={call.id}
            >
              <CreateParticipant
                groupId={groupId}
                callId={call.id}
              >
                <SidebarMenuButton
                  onClick={(event) => event.preventDefault()}
                  closeSidebar={false}
                >
                  <Volume2Icon />
                  {call.name}
                </SidebarMenuButton>
              </CreateParticipant>
              <ParticipantsList
                groupId={groupId}
                callId={call.id}
              />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
SidebarCalls.displayName = "SidebarCalls";

const SidebarFolders = () => {
  const { groupId } = useParams({ from: "/(app)/groups/$groupId" });
  const { t } = useTranslation();

  const { data: folders } = useFolders(groupId);

  if (folders?.length == 0) {
    return <></>;
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        {t("client.sidebar.category.folders")}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {folders?.map((folder) => (
            <SidebarMenuItem key={folder.id}>
              <SidebarMenuButton asChild>
                <Link
                  to="/groups/$groupId/folders/$folderId"
                  params={{ groupId, folderId: folder.id }}
                  activeProps={{ className: "bg-sidebar-accent" }}
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
SidebarFolders.displayName = "SidebarFolders";

const SidebarBoards = () => {
  const { groupId } = useParams({ from: "/(app)/groups/$groupId" });
  const { t } = useTranslation();

  const { data: boards } = useBoards(groupId);

  if (boards?.length == 0) {
    return <></>;
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        {t("client.sidebar.category.boards")}
      </SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {boards?.map((board) => (
            <SidebarMenuItem key={board.id}>
              <SidebarMenuButton asChild>
                <Link
                  to="/groups/$groupId/boards/$boardId"
                  params={{ groupId, boardId: board.id }}
                  activeProps={{ className: "bg-sidebar-accent" }}
                >
                  <ClipboardListIcon />
                  {board.name}
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
SidebarBoards.displayName = "SidebarBoards";

const SidebarLeave = () => {
  const { groupId } = useParams({ from: "/(app)/groups/$groupId" });
  const { t } = useTranslation();

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
            {t("client.feature.member.leave")}
          </Button>
        </DeleteMemberDialog>
      </SidebarContent>
    </SidebarGroup>
  );
};
SidebarLeave.displayName = "SidebarLeave";

const SidebarUser = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();

  const { uid } = useAuth();
  const { mutate: signOut } = useSignOut();

  const { data: user, isPending } = useUser(uid);

  const { theme, setTheme } = useTheme();

  if (isPending) {
    return <></>;
  }

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
            icon={<SettingsIcon />}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width]">
        <DropdownMenuGroup>
          {auth.currentUser?.isAnonymous && (
            <DropdownMenuItem asChild>
              <Link to="/upgrade">{t("client.sidebar.settings.upgrade")}</Link>
            </DropdownMenuItem>
          )}
          <UpdateUserDialog>
            <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
              {t("client.sidebar.settings.account")}
            </DropdownMenuItem>
          </UpdateUserDialog>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              {t("client.sidebar.settings.theme")}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={theme}
                onValueChange={(value) => setTheme(value as Theme)}
              >
                <DropdownMenuRadioItem value="dark">
                  {t("client.theme.dark")}
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="light">
                  {t("client.theme.light")}
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              {t("client.sidebar.settings.language")}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={i18n.language}
                onValueChange={(value) => {
                  i18n.changeLanguage(value);
                }}
              >
                {LANGUAGES.map(({ id, name }) => (
                  <DropdownMenuRadioItem
                    value={id}
                    key={id}
                  >
                    {name}
                  </DropdownMenuRadioItem>
                ))}
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => navigate({ to: "/signin" }).then(signOut)}
          >
            {t("client.feature.auth.sign_out")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
SidebarUser.displayName = "SidebarUser";

export const AppSidebar = () => {
  const { groupId } = useParams({ strict: false });

  return (
    <Sidebar>
      <SidebarHeader className="h-12 border-b border-b-border">
        <Logo />
      </SidebarHeader>
      <SidebarContent>
        {groupId ? (
          <>
            <SidebarGroups />
            <SidebarAdmin />
            <SidebarChats />
            <SidebarCalls />
            <SidebarFolders />
            <SidebarBoards />
            <SidebarLeave />
          </>
        ) : (
          <SidebarNoGroups />
        )}
      </SidebarContent>
      <SidebarFooter className="border-t border-t-border">
        <SidebarUser />
      </SidebarFooter>
    </Sidebar>
  );
};
AppSidebar.displayName = "AppSidebar";
