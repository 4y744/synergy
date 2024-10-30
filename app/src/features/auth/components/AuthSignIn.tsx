import { useRef } from "react";
import { useSignIn } from "../hooks";
import { useNavigate } from "react-router-dom";
import { SignInCredentials } from "../types";

export const _AuthSignIn = () => {
  const credentials = useRef<SignInCredentials>({} as SignInCredentials);
  const navigate = useNavigate();
  const { signIn, loading, error } = useSignIn();

  return (
    <div
      className="bg-dark-900
      flex flex-col gap-4
      p-6 rounded-md shadow-md
      border border-dark-700"
    >
      <h2>Sign in</h2>
      <div className="flex flex-col gap-2">
        <span className="font-medium">Email</span>
        <input
          type="text"
          placeholder="john.doe@gmail.com"
          className={`bg-dark-800
          rounded-md px-4 h-12
          focus:outline outline-4
          transition-outline duration-100
          ${error ? "outline outline-red-800" : "outline-cyan-800"}`}
          onChange={(event) => (credentials.current.email = event.target.value)}
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="font-medium">Password</span>
        <input
          type="password"
          placeholder="Enter your password"
          className={`bg-dark-800
          rounded-md px-4 h-12
          focus:outline outline-4
          transition-outline duration-100
          ${error ? "outline outline-red-800" : "outline-cyan-800 outline-4 "}`}
          onChange={(event) =>
            (credentials.current.password = event.target.value)
          }
        />
      </div>
      <span
        className="h-6
        font-bold text-red-800"
      >
        {error}
      </span>
      <button
        className="bg-cyan-800
        hover:bg-cyan-900
        active:bg-cyan-950
        transition-button duration-200
        rounded-md px-4 h-12"
        onClick={() => {
          signIn(
            credentials.current.email,
            credentials.current.password,
            () => {
              navigate("/groups");
            }
          );
        }}
      >
        Sign in
      </button>
    </div>
  );
};
