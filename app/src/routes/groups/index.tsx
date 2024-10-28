import { Navbar } from "@/features/navbar/components";
import { Outlet } from "react-router-dom";

export const Component = () => {
  return (
    <>
      <Navbar>
        <Navbar.Link to="a">group a</Navbar.Link>
        <Navbar.Link to="b">group b</Navbar.Link>
        <Navbar.Link to="c">group c</Navbar.Link>
        <Navbar.Link to="d">group d</Navbar.Link>
      </Navbar>
      <div className="flex h-[calc(100%-48px)]">
        <Outlet />
      </div>
    </>
  );
};
