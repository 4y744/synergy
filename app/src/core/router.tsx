//React Router
import {
  createBrowserRouter,
  createHashRouter,
  RouteObject,
} from "react-router-dom";

//Configs
import { ENV_PLATFORM } from "../config/env";

const routes: RouteObject[] = [
  {
    path: "",
    lazy: () => import("../views"),
    children: [
      {
        path: "",
        lazy: () => import("../views/default"),
      },
      {
        path: "groups",
        lazy: () => import("../views/groups"),
        children: [
          {
            path: "",
            lazy: () => import("../views/groups/default"),
          },
          {
            path: ":groupId",
            lazy: () => import("../views/groups/[groupId]"),
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
