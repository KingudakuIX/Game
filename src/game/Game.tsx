import { Actor, DisplayMode, Engine } from "excalibur";
// import { TAG_PLAYER } from "../utils/Constants";

interface State {
  instance: Engine | null;
  dynamicEntities: Actor[];
  player: Actor | null;
  debug: {
    collision: boolean;
    skill_collision: boolean;
  };
}

export var state: State = {
  instance: null,
  dynamicEntities: [],
  player: null,
  debug: {
    collision: false,
    skill_collision: false,
  },
};

const SCALE = 1;

export const SetupGameCanvas = () => {
  const game = new Engine({
    canvasElementId: "game",
    // width: 600 * SCALE,
    // height: 400 * SCALE,
    displayMode: DisplayMode.FitScreen,
    // pointerScope: PointerScope.Canvas,
    // grabWindowFocus: false,
    // scrollPreventionMode: ScrollPreventionMode.None,
    resolution: {
      width: 600,
      height: 400,
    },
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
    if (!entity.isDying) {
      entity.z = entity.pos.y + 10000;
    } else {
      entity.z = 1;
    }
  });
  // engine.currentScene.world.queryManager.getQuery([TAG_PLAYER]);
};
