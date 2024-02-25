import {
  Actor,
  DisplayMode,
  Engine,
  PointerScope,
  ScrollPreventionMode,
} from "excalibur";
// import { TAG_PLAYER } from "../utils/Constants";

interface State {
  instance: Engine | null;
  dynamicEntities: Actor[];
  debug: {
    collision: boolean;
    skill_collision: boolean;
  }
}

export var state: State = {
  instance: null,
  dynamicEntities: [],
  debug: {
    collision: false,
    skill_collision: false,
  }
};

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
    enableCanvasTransparency: true,
    maxFps: 60,
  });

  game.onPreUpdate = onPreUpdate;

  state.instance = game;

  // Show FPS and profiler
  // game.debug.showFPS();
  // game.debug.showProfiler();

  return true;
};

const onPreUpdate = (engine: Engine, delta: number) => {
  state.dynamicEntities.forEach((entity) => {
    // @ts-ignore
    if (!entity.isDying) { entity.z = entity.pos.y + 10000; } else { entity.z = 1 }
  })
  // engine.currentScene.world.queryManager.getQuery([TAG_PLAYER]);
}