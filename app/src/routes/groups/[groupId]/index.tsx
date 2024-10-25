import { Outlet } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { Icons } from "@/components/Icons";

export const Component = () => {
  // const { groupId } = useParams();
  return (
    <div className="flex h-[calc(100%-48px)]">
      <Sidebar>
        <Sidebar.Section title="Chats">
          <Sidebar.Link
            to="chats/a"
            icon={<Icons.Hashtag />}
          >
            chat a
          </Sidebar.Link>
          <Sidebar.Link
            to="chats/b"
            icon={<Icons.Hashtag />}
          >
            chat b
          </Sidebar.Link>
          <Sidebar.Link
            to="chats/c"
            icon={<Icons.Hashtag />}
          >
            chat c
          </Sidebar.Link>
        </Sidebar.Section>
        <Sidebar.Section title="Calls">
          <Sidebar.Link
            to="calls/a"
            icon={<Icons.Audio />}
          >
            call a
          </Sidebar.Link>
          <Sidebar.Link
            to="calls/b"
            icon={<Icons.Audio />}
          >
            call b
          </Sidebar.Link>
          <Sidebar.Link
            to="calls/c"
            icon={<Icons.Audio />}
          >
            call c
          </Sidebar.Link>
        </Sidebar.Section>
        <Sidebar.Section title="Folders">
          <Sidebar.Link
            to="folders/a"
            icon={<Icons.Folder />}
          >
            folder a
          </Sidebar.Link>
          <Sidebar.Link
            to="folders/b"
            icon={<Icons.Folder />}
          >
            folder b
          </Sidebar.Link>
          <Sidebar.Link
            to="folders/c"
            icon={<Icons.Folder />}
          >
            folder c
          </Sidebar.Link>
        </Sidebar.Section>
      </Sidebar>
      <Outlet />
    </div>
  );
};
