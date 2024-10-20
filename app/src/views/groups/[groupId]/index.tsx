import { Outlet, useParams } from "react-router-dom";
import { Sidebar } from "../../../components/Sidebar";

export const Component = () => {
  const { groupId } = useParams();
  return (
    <div className="flex h-full">
      <Sidebar>
        <Sidebar.Section>
          <Sidebar.Link to="a">chat a</Sidebar.Link>
          <Sidebar.Link to="a">chat b</Sidebar.Link>
          <Sidebar.Link to="a">chat c</Sidebar.Link>
        </Sidebar.Section>
        <Sidebar.Section>
          <Sidebar.Link to="a">call a</Sidebar.Link>
          <Sidebar.Link to="a">call b</Sidebar.Link>
          <Sidebar.Link to="a">call c</Sidebar.Link>
        </Sidebar.Section>
        <Sidebar.Section>
          <Sidebar.Link to="a">folder a</Sidebar.Link>
          <Sidebar.Link to="a">folder b</Sidebar.Link>
          <Sidebar.Link to="a">folder c</Sidebar.Link>
        </Sidebar.Section>
      </Sidebar>
      <Outlet />
    </div>
  );
};
