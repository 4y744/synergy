import { useAuth } from "@/features/auth/hooks";
import { getGroupsQueryOptions } from "@/features/groups/api/getGroups";
import { useGroups } from "@/features/groups/hooks/useGroups";
import { Navbar, NavbarLink } from "@/features/navbar/components";
import { auth } from "@/libs/firebase";
import { queryClient } from "@/libs/react-query";
import { onAuthStateChanged } from "firebase/auth";
import { Outlet } from "react-router-dom";

export const loader = () => {
  return new Promise((resolve) => {
    onAuthStateChanged(auth, () => {
      const uid = auth.currentUser!.uid;
      resolve(
        queryClient.getQueryData(getGroupsQueryOptions(uid).queryKey) ??
          queryClient.fetchQuery(getGroupsQueryOptions(uid))
      );
    });
  });
};

export const Component = () => {
  const { uid } = useAuth();

  const query = useGroups(uid!);
  console.log(query.data);
  return (
    <div className="h-[100dvh]">
      <h1>{uid}</h1>
      <Navbar>
        <NavbarLink to="a">group a</NavbarLink>
        <NavbarLink to="b">group b</NavbarLink>
        <NavbarLink to="c">group c</NavbarLink>
        <NavbarLink to="d">group d</NavbarLink>
      </Navbar>
      <Outlet />
    </div>
  );
};
