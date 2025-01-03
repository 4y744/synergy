import { Link } from "react-router-dom";

import { Button, Badge } from "@synergy/ui";
import { cn } from "@synergy/utils";

export default () => {
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
