import { useParams } from "react-router-dom";

export const _Group = () => {
  const { groupId } = useParams();
  return <div>group page {groupId}</div>;
};
