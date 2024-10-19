//Components
import { _Navbar } from "./Navbar";
import { _Navlink } from "./Navlink";

const index = Object.assign(_Navbar, {
  Link: _Navlink,
});

export { index as Navbar };
