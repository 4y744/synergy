import { authenticatedLoader } from "@/features/auth/api/authenticatedLoader";
import { useAuth } from "@/features/auth/hooks";
import { useGroups } from "@/features/groups/hooks/useGroups";
import { Navbar, NavbarLink } from "@/features/navbar/components";
import { Outlet } from "react-router-dom";

export const loader = authenticatedLoader(async (auth) => {
  console.log(auth?.uid);
  return 0;
});

export const Component = () => {
  const { uid } = useAuth();

  const query = useGroups(uid!);
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
