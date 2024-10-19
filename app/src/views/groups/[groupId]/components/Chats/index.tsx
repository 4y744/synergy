//Components
import { _Chats } from "./Chats";
import { _ChatsLink } from "./ChatsLink";

const index = Object.assign(_Chats, {
  Link: _ChatsLink,
});

export { index as Chats };
