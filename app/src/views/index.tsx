import { _Home } from "./default";
import { _Groups } from "./groups";
import { _Group } from "./groups/[groupId]";
import { _GroupsDefault } from "./groups/default";

const index = {
  Home: _Home,
  Groups: Object.assign(_Groups, {
    Default: _GroupsDefault,
    Group: _Group,
  }),
};

export { index as Views };
