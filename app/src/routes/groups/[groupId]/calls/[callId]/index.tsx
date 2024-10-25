import { useParams } from "react-router-dom";

export const Component = () => {
  const { callId } = useParams();
  return <div>callID: {callId}</div>;
};
