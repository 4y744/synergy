import { AuthProvider } from "./AuthProvider";
import { _AuthSignUp } from "./AuthSignUp";
import { _AuthSignIn } from "./AuthSignIn";
import { _AuthSignOut } from "./AuthSignOut";

export const Auth = {
  Provider: AuthProvider,
  SignUp: _AuthSignUp,
  SignIn: _AuthSignIn,
  SignOut: _AuthSignOut,
};
