import { Outlet } from "@tanstack/react-router";
import { SidebarLayout } from "../layouts/sidebar";

export default () => {
  return (
    <SidebarLayout>
      <Outlet />
    </SidebarLayout>
  );
};
