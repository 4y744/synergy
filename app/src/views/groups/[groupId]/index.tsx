import { useParams } from "react-router-dom";

export const Component = () => {
  const { groupId } = useParams();
  return <div>group page {groupId}</div>;
};
