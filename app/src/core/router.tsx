import {
  createBrowserRouter,
  createHashRouter,
  RouteObject,
} from "react-router-dom";

import { queryClient } from "@/libs/react-query";

import { ENV_PLATFORM } from "@/config/env";

const routes: RouteObject[] = [
  {
    path: "",
    lazy: () => import("@/routes/home"),
  },
  {
    path: "groups",
    lazy: () => import("@/routes/groups"),
    children: [
      {
        path: "",
        lazy: () => import("@/routes/groups/default"),
      },
      {
        path: ":groupId",
        lazy: () => import("@/routes/groups/[groupId]"),
        children: [
          {
            path: "",
            lazy: () => import("@/routes/groups/[groupId]/default"),
          },
          {
            path: "chats/:chatId",
            lazy: () => import("@/routes/groups/[groupId]/chats/[chatId]"),
          },
          {
            path: "calls/:callId",
            lazy: () => import("@/routes/groups/[groupId]/calls/[callId]"),
          },
          {
            path: "folders/:folderId",
            lazy: () => import("@/routes/groups/[groupId]/folders/[folderId]"),
          },
        ],
      },
    ],
  },
  {
    path: "settings",
    lazy: () => import("@/routes/settings"),
  },
  {
    path: "invite",
    lazy: () => import("@/routes/invite"),
  },
  {
    path: "join",
    lazy: () => import("@/routes/join"),
  },
];

export const router =
  ENV_PLATFORM == "electron"
    ? createHashRouter(routes)
    : createBrowserRouter(routes);
