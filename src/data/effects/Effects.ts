import { Animation } from "excalibur";
import { generateFramesCoordinates } from "../../utils/Common";
import { SpriteKeys, spritesMap } from "../Spritesheet";

export const effectsMap = new Map();

export enum EffectKeys {
  impact_01,
  fireball_01,
  ablaze_01,
}

const impact01 = Animation.fromSpriteSheetCoordinates({
  spriteSheet: spritesMap.get(SpriteKeys.impact_01),
  frameCoordinates: generateFramesCoordinates("horizontal", 15, [0, 6], 100),
});
const fireBall01 = Animation.fromSpriteSheetCoordinates({
  spriteSheet: spritesMap.get(SpriteKeys.flame_01),
  frameCoordinates: generateFramesCoordinates("horizontal", 8, [0, 6], 100),
});
const ablaze01 = Animation.fromSpriteSheetCoordinates({
  spriteSheet: spritesMap.get(SpriteKeys.flame_01),
  frameCoordinates: generateFramesCoordinates("horizontal", 10, [0, 6], 100),
});

effectsMap.set(EffectKeys.impact_01, impact01);
effectsMap.set(EffectKeys.fireball_01, fireBall01);
effectsMap.set(EffectKeys.ablaze_01, ablaze01);
