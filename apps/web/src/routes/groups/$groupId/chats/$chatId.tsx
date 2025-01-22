import { createFileRoute } from "@tanstack/react-router";
import { chatRouteOptions } from "@synergy/core";

export const Route = createFileRoute("/groups/$groupId/chats/$chatId")(
  chatRouteOptions
);
