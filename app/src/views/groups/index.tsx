import { NavLink, Outlet } from "react-router-dom";
import { Navbar } from "./components/Navbar";

export const Component = () => {
  return (
    <>
      <Navbar>
        <Navbar.Link to="a">group a</Navbar.Link>
        <Navbar.Link to="b">group b</Navbar.Link>
        <Navbar.Link to="c">group c</Navbar.Link>
        <Navbar.Link to="d">group d</Navbar.Link>
      </Navbar>
      <Outlet />
    </>
  );
};
