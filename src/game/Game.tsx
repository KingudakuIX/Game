import {
  DisplayMode,
  Engine,
  PointerScope,
  ScrollPreventionMode,
} from "excalibur";
import { TAG_PLAYER } from "../utils/Constants";

interface State {
  instance: Engine | null;
}

export var state: State = { instance: null };

const SCALE = 1;

export const SetupGameCanvas = () => {
  const game = new Engine({
    canvasElementId: "game",
    width: 600 * SCALE,
    height: 400 * SCALE,
    displayMode: DisplayMode.FillContainer,
    pointerScope: PointerScope.Canvas,
    grabWindowFocus: false,
    scrollPreventionMode: ScrollPreventionMode.None,
    antialiasing: false,
  });

  game.onPreUpdate = onPreUpdate;

  state.instance = game;

  return true;
};

const onPreUpdate = (engine: Engine, delta: number) => {
  engine.currentScene.world.queryManager.getQuery([TAG_PLAYER]);
}