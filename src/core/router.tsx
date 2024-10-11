import { createBrowserRouter } from "react-router-dom";

import { Root } from "../views";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [],
  },
]);
