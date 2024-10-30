import { useSignOut } from "../hooks";

export const _AuthSignOut = () => {
  const { signOut, loading, error } = useSignOut();

  return (
    <div>
      <h1>Sign out</h1>
    </div>
  );
};
