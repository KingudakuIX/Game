import { Switch } from "antd";
import { state } from "../game/Game";

const Debug = () => {
  return (
    <div className="bg-white flex flex-col gap-2 w-60 p-4 border border-solid rounded">
      <div className="flex gap-2">
        Characters hitbox
        <Switch
          className="ml-auto"
          onChange={(e) => {
            state.instance?.emit("debug_collision", e);
            state.debug.collision = e;
          }}
        ></Switch>
      </div>
      <div className="flex gap-2">
        Spells hitbox
        <Switch
          className="ml-auto"
          onChange={(e) => {
            state.debug.skill_collision = e;
          }}
        ></Switch>
      </div>
    </div>
  );
};

export default Debug;
