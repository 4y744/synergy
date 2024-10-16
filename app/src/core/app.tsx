import { RouterProvider } from "react-router";

import { router } from "./router";
import { useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebase";

export const App = () => {
  useEffect(() => {
    setDoc(doc(db, "test", "test"), { val: "hello world" });
  }, []);
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
};
