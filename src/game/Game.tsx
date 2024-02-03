import {
  DisplayMode,
  Engine,
  PointerScope,
  ScrollPreventionMode,
} from "excalibur";

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

  state.instance = game;

  return true;
};
