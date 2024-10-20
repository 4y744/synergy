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
    lazy: () => import("../views/home"),
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
        children: [
          {
            path: "chats/:chatId",
            lazy: () => import("../views/groups/[groupId]/chats/[chatId]"),
          },
          {
            path: "calls/:callId",
            lazy: () => import("../views/groups/[groupId]/calls/[callId]"),
          },
          {
            path: "folders/:folderId",
            lazy: () => import("../views/groups/[groupId]/folders/[folderId]"),
          },
        ],
      },
    ],
  },
  {
    path: "settings",
    lazy: () => import("../views/settings"),
  },
  {
    path: "invite",
    lazy: () => import("../views/invite"),
  },
  {
    path: "join",
    lazy: () => import("../views/join"),
  },
];

export const router =
  ENV_PLATFORM == "electron"
    ? createHashRouter(routes)
    : createBrowserRouter(routes);
