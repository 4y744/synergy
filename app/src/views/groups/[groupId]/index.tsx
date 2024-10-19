import { Outlet, useParams } from "react-router-dom";

export const Component = () => {
  const { groupId } = useParams();
  return (
    <div className="flex">
      <div>
        <div>chats</div>
        <div>calls</div>
        <div>folders</div>
      </div>
      <Outlet />
    </div>
  );
};
