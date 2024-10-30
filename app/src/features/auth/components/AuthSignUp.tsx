import { useSignUp } from "../hooks";

export const _AuthSignUp = () => {
  const { signUp, loading, error } = useSignUp();

  return (
    <div>
      <h1>Sign up</h1>
    </div>
  );
};
