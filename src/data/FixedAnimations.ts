import {
  generateAnimationsFromFramesCoordinates,
  generateFramesCoordinates,
} from "../utils/Common";
import { SpriteKeys, spritesMap } from "./Spritesheet";

export const animationsMap = new Map();

export enum AnimationKeys {
  fireball_01,
  ablaze_01,
  cast_01,
}

const fireBall01 = generateAnimationsFromFramesCoordinates(
  spritesMap.get(SpriteKeys.flame_01),
  generateFramesCoordinates("horizontal", 8, [0, 6], 100)
);
const ablaze01 = generateAnimationsFromFramesCoordinates(
  spritesMap.get(SpriteKeys.flame_01),
  generateFramesCoordinates("horizontal", 10, [0, 6], 100)
);

animationsMap.set(AnimationKeys.fireball_01, fireBall01);
animationsMap.set(AnimationKeys.ablaze_01, ablaze01);
