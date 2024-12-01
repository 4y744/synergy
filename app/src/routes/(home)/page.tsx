import { cn } from "@/utils/cn";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getGroups } from "@/features/groups/api/get-groups";
import { authStore } from "@/features/auth/stores/auth";

export const Component = () => {
  return (
    <div
      className={cn(
        "h-screen w-screen",
        "flex flex-col justify-center items-center"
      )}
    >
      <div className={cn("flex items-end gap-2")}>
        <h1 className="text-4xl font-bold">synergy</h1>
        <Badge className="h-fit mb-1">v0.1</Badge>
      </div>
      <span>Teamwork made simple.</span>
      <Button
        className="mt-2"
        asChild
      >
        <Link to="/groups">Get started</Link>
      </Button>
    </div>
  );
};
