import { useState } from "react";
import { useTranslation } from "react-i18next";
import i18n from "i18next";
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
import { useSignOut } from "~/features/auth/hooks/use-sign-out";

import { useGroup } from "~/features/groups/hooks/use-group";
import { useGroups } from "~/features/groups/hooks/use-groups";
import { CreateGroupDialog } from "~/features/groups/components/create-group";

import { useChats } from "~/features/chats/hooks/use-chats";
import { useFolders } from "~/features/folders/hooks/use-folders";

import { CreateMemberDialog } from "~/features/members/components/create-member";
import { DeleteMemberDialog } from "~/features/members/components/delete-member";

import { useUser } from "~/features/users/hooks/use-user";
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
              icon={<ChevronsUpDown />}
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
              >
                <HashIcon />
                {t("client.sidebar.category.chats")}
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
                {t("client.sidebar.category.folders")}
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

  const chats = useChats(groupId);

  if (chats.data?.length == 0) {
    return <></>;
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        {t("client.sidebar.category.chats")}
      </SidebarGroupLabel>
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
SidebarChats.displayName = "SidebarChats";

const SidebarFolders = () => {
  const { groupId } = useParams({ from: "/(app)/groups/$groupId" });
  const { t } = useTranslation();

  const folders = useFolders(groupId);

  if (folders.data?.length == 0) {
    return <></>;
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>
        {t("client.sidebar.category.folders")}
      </SidebarGroupLabel>
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
SidebarFolders.displayName = "SidebarFolders";

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
            {t("client.feature.group.leave")}
          </Button>
        </DeleteMemberDialog>
      </SidebarContent>
    </SidebarGroup>
  );
};
SidebarLeave.displayName = "SidebarLeave";

const SidebarUser = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { uid } = useAuth();
  const { mutate: signOut } = useSignOut();

  const { data: user } = useUser(uid);

  const { theme, setTheme } = useTheme();
  const [language, setLanguage] = useState(i18n.language);

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
                value={language}
                onValueChange={(value) => {
                  i18n.changeLanguage(value);
                  setLanguage(value);
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
          <DropdownMenuItem onClick={() => navigate({ to: "/" }).then(signOut)}>
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
            <SidebarFolders />
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
