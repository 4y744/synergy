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

import i18n, { useTranslation } from "@synergy/i18n";

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
  H1,
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

import { abbreviate, cn } from "@synergy/utils";
import { useGroups } from "~/features/groups/hooks/use-groups";
import { useGroup } from "~/features/groups/hooks/use-group";
import { CreateMemberDialog } from "~/features/members/components/create-member";
import { CreateGroupDialog } from "~/features/groups/components/create-group";
import { useAuth } from "~/features/auth/hooks/use-auth";
import { useChats } from "~/features/chats/hooks/use-chats";
import { useFolders } from "~/features/folders/hooks/use-folders";
import { DeleteMemberDialog } from "~/features/members/components/delete-member";
import { useSignOut } from "~/features/auth/hooks/use-sign-out";
import { useUser } from "~/features/users/hooks/use-user";
import { UpdateUserDialog } from "~/features/users/components/update-user";

const SidebarGroups = () => {
  const { groupId } = useParams({ from: "/(app)/groups/$groupId" });

  const groups = useGroups();
  const selectedGroup = useGroup(groupId);

  const { t } = useTranslation();

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
          {t("generic.groups")}
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
            <Button className="w-full">{t("group.join")}</Button>
          </CreateMemberDialog>
          <CreateGroupDialog>
            <Button className="w-full">{t("group.create")}</Button>
          </CreateGroupDialog>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const SidebarAdmin = () => {
  const { groupId } = useParams({ from: "/(app)/groups/$groupId" });
  const { data: group } = useGroup(groupId);

  const { uid } = useAuth();

  const { t } = useTranslation();

  if (group?.createdBy != uid) {
    return <></>;
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{t("generic.administration")}</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                to="/groups/$groupId/admin/invites"
                params={{ groupId }}
              >
                <MailPlusIcon />
                {t("generic.invites")}
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
                {t("generic.members")}
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
                {t("generic.members")}
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
                {t("generic.folders")}
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
                {t("generic.settings")}
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};

const SidebarChats = () => {
  const { groupId } = useParams({ from: "/(app)/groups/$groupId" });
  const chats = useChats(groupId);

  const { t } = useTranslation();

  if (chats.data?.length == 0) {
    return <></>;
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{t("generic.chats")}</SidebarGroupLabel>
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
  const { groupId } = useParams({ from: "/(app)/groups/$groupId" });
  const folders = useFolders(groupId);

  const { t } = useTranslation();

  if (folders.data?.length == 0) {
    return <></>;
  }

  return (
    <SidebarGroup>
      <SidebarGroupLabel>{t("generic.folders")}</SidebarGroupLabel>
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
  const { groupId } = useParams({ from: "/(app)/groups/$groupId" });

  const { uid } = useAuth();

  const { data: group } = useGroup(groupId);

  const { t } = useTranslation();

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
            {t("group.leave")}
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
  const { t } = useTranslation();

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
          <DropdownMenuLabel>{t("generic.settings")}</DropdownMenuLabel>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <UpdateUserDialog>
            <DropdownMenuItem onSelect={(event) => event.preventDefault()}>
              {t("generic.account")}
            </DropdownMenuItem>
          </UpdateUserDialog>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              {t("generic.themes")}
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuRadioGroup
                value={theme}
                onValueChange={(value) => setTheme(value as Theme)}
              >
                <DropdownMenuRadioItem value="dark">
                  {t("theme.dark")}
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="light">
                  {t("theme.light")}
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuSubContent>
          </DropdownMenuSub>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              {t("generic.language")}
            </DropdownMenuSubTrigger>
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
              navigate({ to: "/" }).then(signOut);
            }}
          >
            {t("auth.sign_out")}
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const AppSidebar = () => {
  const { groupId } = useParams({ strict: false });
  const { isMobile, setOpen } = useSidebar();

  const { t } = useTranslation();

  useEffect(() => {
    if (!isMobile) {
      setOpen(true);
    }
  }, [isMobile]);

  return (
    <Sidebar>
      <SidebarHeader>
        <H1 className="font-arcade text-2xl lg:text-2xl text-center">
          synergy
        </H1>
        <Separator />
        {groupId ? (
          <SidebarGroups />
        ) : (
          <>
            <CreateMemberDialog>
              <Button className="w-full">{t("group.join")}</Button>
            </CreateMemberDialog>
            <CreateGroupDialog>
              <Button className="w-full">{t("group.create")}</Button>
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
