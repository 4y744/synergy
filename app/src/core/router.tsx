//React Router
import { createBrowserRouter, createHashRouter } from "react-router-dom";

//Views
import { Root } from "../views";

//Configs
import { ENV_PLATFORM } from "../config/env";

const routes = [
  {
    path: "",
    element: <Root />,
    children: [],
  },
];

export const router =
  ENV_PLATFORM == "electron"
    ? createHashRouter(routes)
    : createBrowserRouter(routes);
