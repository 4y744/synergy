//React Router
import {
  createBrowserRouter,
  createHashRouter,
  Outlet,
  RouteObject,
} from "react-router-dom";

//Configs
import { ENV_PLATFORM } from "../config/env";
import { Views } from "../views";

const routes: RouteObject[] = [
  {
    path: "",
    element: <Outlet />,
    children: [
      {
        path: "",
        element: <Views.Home />,
      },
      {
        path: "groups",
        element: <Views.Groups />,
        children: [
          {
            path: "",
            element: <Views.Groups.Default />,
          },
          {
            path: ":groupId",
            element: <Views.Groups.Group />,
          },
        ],
      },
    ],
  },
];

export const router =
  ENV_PLATFORM == "electron"
    ? createHashRouter(routes)
    : createBrowserRouter(routes);
