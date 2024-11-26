"use client";

import { useState } from "react";
import { SignUpForm } from "@/features/auth/components/sign-up-form";
import { SignInForm } from "@/features/auth/components/sign-in-form";
import { cn } from "@/utils/cn";
import { Badge } from "@/components/ui/badge";

type Method = "signup" | "signin";

type Props = Readonly<{
  initial: Method;
}>;

export const AuthFormSwitch = ({ initial }: Props) => {
  const [method, setMethod] = useState<Method>(initial);

  return (
    <>
      <div className="grid grid-cols-2 place-content-center">
        <div className={cn("flex justify-center items-center", "h-screen")}>
          <SignUpForm
            onSwitchToSignIn={() => {
              setMethod("signin");
              history.replaceState(null, "", "/signin");
            }}
          />
        </div>
        <div className={cn("flex justify-center items-center", "h-screen")}>
          <SignInForm
            onSwitchToSignUp={() => {
              setMethod("signup");
              history.replaceState(null, "", "/signup");
            }}
          />
        </div>
      </div>
      <div
        className={cn(
          "fixed top-0 h-screen w-full",
          "bg-foreground text-background",
          "transition-all duration-500 ease-in-out",
          method == "signin" ? "-left-1/2 pl-[50vw]" : "left-1/2 pr-[50vw]"
        )}
      >
        <div
          className={cn(
            "flex flex-col justify-center items-center",
            "w-[50vw] h-full px-4 py-2"
          )}
        >
          <div className={cn("flex items-center gap-2")}>
            <h1 className="text-2xl font-bold">synergy</h1>
            <Badge
              variant="secondary"
              className="h-fit"
            >
              v0.1
            </Badge>
          </div>
          <span className="text-sm">Teamwork made simple.</span>
        </div>
      </div>
    </>
  );
};
