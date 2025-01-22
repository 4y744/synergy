import { createFileRoute } from "@tanstack/react-router";
import { signUpRouteOptions } from "@synergy/core";

export const Route = createFileRoute("/signup")(signUpRouteOptions);
