import { Outlet } from "react-router-dom";

export const Root = () => {
  return (
    <>
      <h1>Synergy app</h1>
      <Outlet />
    </>
  );
};
