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
            children: [
              {
                path: "chats",
                lazy: () => import("../views/groups/[groupId]/chats"),
                children: [
                  {
                    path: ":chatId",
                    lazy: () =>
                      import("../views/groups/[groupId]/chats/[chatId]"),
                  },
                ],
              },
              {
                path: "calls",
                lazy: () => import("../views/groups/[groupId]/calls"),
                children: [
                  {
                    path: ":callId",
                    lazy: () =>
                      import("../views/groups/[groupId]/calls/[callId]"),
                  },
                ],
              },
              {
                path: "folders",
                lazy: () => import("../views/groups/[groupId]/folders"),
                children: [
                  {
                    path: ":folderId",
                    lazy: () =>
                      import("../views/groups/[groupId]/folders/[folderId]"),
                  },
                ],
              },
            ],
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
