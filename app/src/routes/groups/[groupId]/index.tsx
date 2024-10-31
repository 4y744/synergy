import { Outlet } from "react-router-dom";
import { Sidebar } from "@/features/sidebar/components";
import { HashtagIcon, AudioIcon, FolderIcon } from "@/components/icons";

export const loader = () => {
  return new Promise((resolve) => setTimeout(() => resolve(null), 2000));
};

export const Component = () => {
  return (
    <>
      <Sidebar>
        <Sidebar.Section title="Chats">
          <Sidebar.Link
            to="chats/a"
            icon={<HashtagIcon />}
          >
            chat a
          </Sidebar.Link>
          <Sidebar.Link
            to="chats/b"
            icon={<HashtagIcon />}
          >
            chat b
          </Sidebar.Link>
          <Sidebar.Link
            to="chats/c"
            icon={<HashtagIcon />}
          >
            chat c
          </Sidebar.Link>
        </Sidebar.Section>
        <Sidebar.Section title="Calls">
          <Sidebar.Link
            to="calls/a"
            icon={<AudioIcon />}
          >
            call a
          </Sidebar.Link>
          <Sidebar.Link
            to="calls/b"
            icon={<AudioIcon />}
          >
            call b
          </Sidebar.Link>
          <Sidebar.Link
            to="calls/c"
            icon={<AudioIcon />}
          >
            call c
          </Sidebar.Link>
        </Sidebar.Section>
        <Sidebar.Section title="Folders">
          <Sidebar.Link
            to="folders/a"
            icon={<FolderIcon />}
          >
            folder a
          </Sidebar.Link>
          <Sidebar.Link
            to="folders/b"
            icon={<FolderIcon />}
          >
            folder b
          </Sidebar.Link>
          <Sidebar.Link
            to="folders/c"
            icon={<FolderIcon />}
          >
            folder c
          </Sidebar.Link>
        </Sidebar.Section>
      </Sidebar>
      <Outlet />
    </>
  );
};
