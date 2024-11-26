import { createBrowserRouter, RouteObject } from "react-router-dom";

const routes: RouteObject[] = [
  {
    path: "",
    lazy: () => import("@/routes/(home)/page"),
  },
  {
    path: "",
    lazy: () => import("@/routes/(app)/layout"),
    children: [
      {
        path: "groups",
        lazy: () => import("@/routes/(app)/groups/layout"),
        children: [
          {
            path: "",
            lazy: () => import("@/routes/(app)/groups/page"),
          },
          {
            path: ":groupId",
            lazy: () => import("@/routes/(app)/groups/[groupId]/layout"),
            children: [
              {
                path: "",
                lazy: () => import("@/routes/(app)/groups/[groupId]/page"),
              },
              {
                path: "chats/:chatId",
                lazy: () =>
                  import("@/routes/(app)/groups/[groupId]/chats/[chatId]/page"),
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "signin",
    lazy: () => import("@/routes/(auth)/signin/page"),
  },
  {
    path: "signup",
    lazy: () => import("@/routes/(auth)/signup/page"),
  },
  {
    path: "*",
    lazy: () => import("@/routes/not-found"),
  },
];

export const router = createBrowserRouter(routes);
