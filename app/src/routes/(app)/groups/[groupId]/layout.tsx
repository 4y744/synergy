import { loadChats } from "@/features/chats/api/load-chats";
import { DataLoader } from "@/types/router";
import { Outlet } from "react-router-dom";

export const loader: DataLoader = ({ params }, queryClient) => {
  return loadChats(params.groupId!, queryClient);
};

export default () => {
  return <Outlet />;
};
