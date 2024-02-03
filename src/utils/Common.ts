import { Animation } from "excalibur";

export interface AnimationData {
  [action: string]: {
    [direction: string]: Animation;
  };
}

interface Frame {
  x: number;
  y: number;
  duration: number;
}

export const generateFramesCoordinates = (
  direction: "horizontal" | "vertical",
  initialPos: number,
  range: number[],
  duration: number
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
      duration: duration,
    });
  }
  return frames;
};
