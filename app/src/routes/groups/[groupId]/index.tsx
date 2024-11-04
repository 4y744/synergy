import { Outlet } from "react-router-dom";
import {
  Sidebar,
  SidebarLink,
  SidebarSection,
} from "@/features/sidebar/components";
import { HashtagIcon, AudioIcon, FolderIcon } from "@/components/icons";

// export const loader = () => {
//   return new Promise((res) => setTimeout(() => res(0), 1000));
// };

export const Component = () => {
  return (
    <div className="flex h-full">
      <Sidebar>
        <SidebarSection title="Chats">
          <SidebarLink
            to="chats/a"
            icon={<HashtagIcon />}
          >
            chat a
          </SidebarLink>
          <SidebarLink
            to="chats/b"
            icon={<HashtagIcon />}
          >
            chat b
          </SidebarLink>
          <SidebarLink
            to="chats/c"
            icon={<HashtagIcon />}
          >
            chat c
          </SidebarLink>
        </SidebarSection>
        <SidebarSection title="Calls">
          <SidebarLink
            to="calls/a"
            icon={<AudioIcon />}
          >
            call a
          </SidebarLink>
          <SidebarLink
            to="calls/b"
            icon={<AudioIcon />}
          >
            call b
          </SidebarLink>
          <SidebarLink
            to="calls/c"
            icon={<AudioIcon />}
          >
            call c
          </SidebarLink>
        </SidebarSection>
        <SidebarSection title="Folders">
          <SidebarLink
            to="folders/a"
            icon={<FolderIcon />}
          >
            folder a
          </SidebarLink>
          <SidebarLink
            to="folders/b"
            icon={<FolderIcon />}
          >
            folder b
          </SidebarLink>
          <SidebarLink
            to="folders/c"
            icon={<FolderIcon />}
          >
            folder c
          </SidebarLink>
        </SidebarSection>
      </Sidebar>
      <Outlet />
    </div>
  );
};
