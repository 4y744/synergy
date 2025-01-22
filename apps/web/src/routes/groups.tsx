import { createFileRoute } from "@tanstack/react-router";
import { groupRouteOptions } from "@synergy/core";

export const Route = createFileRoute("/groups")(groupRouteOptions);
