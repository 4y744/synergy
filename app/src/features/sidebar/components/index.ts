import { _Sidebar } from "./Sidebar";
import { _SidebarSection } from "./SidebarSection";
import { _SidebarLink } from "./SidebaseLink";

export const Sidebar = Object.assign(_Sidebar, {
  Section: _SidebarSection,
  Link: _SidebarLink,
});
