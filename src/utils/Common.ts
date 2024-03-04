import { Animation, SpriteSheet } from "excalibur";

export interface Grid {
  columns: number;
  rows: number;
  spriteWidth: number;
  spriteHeight: number;
}

export enum Direction {
  up = "up",
  up_right = "up_right",
  right = "right",
  down_right = "down_right",
  down = "down",
  down_left = "down_left",
  left = "left",
  up_left = "up_left",
}

export enum Action {
  idle = "idle",
  running = "running",
  rolling = "rolling",
  dying = "dying",
  casting_2h = "casting_2h",
}

export type AnimationData = {
  [key in Action]?:
    | {
        [key in Direction]: Animation;
      }
    | Animation
    | undefined;
};

export interface Frame {
  x: number;
  y: number;
  duration: number;
}

export const generateFramesCoordinates = (
  direction: "horizontal" | "vertical",
  initialPos: number,
  range: number[],
  duration: number | number[]
) => {
  const from = range[0];
  const to = range[1];
  if (from > to)
    throw Error(
      "Range first number must be less then or equal to the second number"
    );
  const frames: Frame[] = [];
  for (var i = 0; i < to - from; i++) {
    frames.push({
      x: direction === "horizontal" ? from + i : initialPos,
      y: direction === "vertical" ? from + i : initialPos,
      duration: Array.isArray(duration) ? duration[i] : duration,
    });
  }
  return frames;
};

export const generateAnimationsFromFramesCoordinates = (
  spriteSheet: SpriteSheet,
  frameCoordinates: Frame[]
) => {
  const animations: Animation[] = [];
  for (const frameCoordinate of frameCoordinates) {
    animations.push(
      Animation.fromSpriteSheetCoordinates({
        spriteSheet: spriteSheet,
        frameCoordinates: [frameCoordinate],
      })
    );
  }
  return animations;
};

export const guid = () => {
  const S4 = function () {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  };
  return (
    S4() +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    "-" +
    S4() +
    S4() +
    S4()
  );
};

export const Round = (input: number, decimals: number = 2) => {
  const precision = 10 * decimals;
  return Math.round(input * precision) / precision;
};
