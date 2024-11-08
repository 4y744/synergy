import { SignUpForm } from "@/features/auth/components";
import { cn } from "@/utils/cn";

export const Component = () => {
  return (
    <div className={cn("w-full h-screen", "flex justify-center items-center")}>
      <SignUpForm />
    </div>
  );
};
