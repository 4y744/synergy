import { authenticatedLoader } from "@/features/auth/api/authenticatedLoader";
import { useAuth } from "@/features/auth/hooks";
import { getGroupsQueryOptions } from "@/features/groups/api/getGroups";
import { Navbar, NavbarLink } from "@/features/navbar/components";
import { useQuery } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";

export const loader = authenticatedLoader();

export const Component = () => {
  const { uid, username } = useAuth();
  const groups = useQuery(getGroupsQueryOptions(uid!));
  return (
    <div className="h-[100dvh]">
      <h1>
        {uid} = {username}
      </h1>
      <Navbar>
        {groups.data?.map((group) => (
          <NavbarLink to={`/groups/${group.id}`}>{group.name}</NavbarLink>
        ))}
      </Navbar>
      <Outlet />
    </div>
  );
};
