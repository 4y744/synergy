import { createFileRoute } from "@tanstack/react-router";
import { signInRouteOptions } from "@synergy/core";

export const Route = createFileRoute("/signin")(signInRouteOptions);
