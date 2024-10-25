import { useParams } from "react-router-dom";

export const Component = () => {
  const { folderId } = useParams();
  return <div>folderId: {folderId}</div>;
};
