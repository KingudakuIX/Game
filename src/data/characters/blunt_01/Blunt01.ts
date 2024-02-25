import { Animation } from "excalibur";
import {
  AnimationData,
  generateFramesCoordinates,
} from "../../../utils/Common";
import { SpriteKeys, spritesMap } from "../../Spritesheet";

const sprite = spritesMap.get(SpriteKeys.blunt_01);
const spriteBig = spritesMap.get(SpriteKeys.blunt_01_big);

export const blunt01Animations: AnimationData = {
  idle: {
    up: Animation.fromSpriteSheetCoordinates({
      spriteSheet: sprite,
      frameCoordinates: [{ x: 0, y: 8, duration: 100 }],
    }),
    left: Animation.fromSpriteSheetCoordinates({
      spriteSheet: sprite,
      frameCoordinates: [{ x: 0, y: 9, duration: 100 }],
    }),
    down: Animation.fromSpriteSheetCoordinates({
      spriteSheet: sprite,
      frameCoordinates: [{ x: 0, y: 10, duration: 100 }],
    }),
    right: Animation.fromSpriteSheetCoordinates({
      spriteSheet: sprite,
      frameCoordinates: [{ x: 0, y: 11, duration: 100 }],
    }),
  },
  walk: {
    up: Animation.fromSpriteSheetCoordinates({
      spriteSheet: sprite,
      frameCoordinates: generateFramesCoordinates("horizontal", 8, [0, 8], 100),
    }),
    left: Animation.fromSpriteSheetCoordinates({
      spriteSheet: sprite,
      frameCoordinates: generateFramesCoordinates("horizontal", 9, [0, 8], 100),
    }),
    down: Animation.fromSpriteSheetCoordinates({
      spriteSheet: sprite,
      frameCoordinates: generateFramesCoordinates(
        "horizontal",
        10,
        [0, 8],
        100
      ),
    }),
    right: Animation.fromSpriteSheetCoordinates({
      spriteSheet: sprite,
      frameCoordinates: generateFramesCoordinates(
        "horizontal",
        11,
        [0, 8],
        100
      ),
    }),
  },
  melee_attack_01: {
    up: Animation.fromSpriteSheetCoordinates({
      spriteSheet: spriteBig,
      frameCoordinates: generateFramesCoordinates("horizontal", 7, [0, 7], 150),
    }),
    left: Animation.fromSpriteSheetCoordinates({
      spriteSheet: spriteBig,
      frameCoordinates: generateFramesCoordinates("horizontal", 8, [0, 7], 150),
    }),
    down: Animation.fromSpriteSheetCoordinates({
      spriteSheet: spriteBig,
      frameCoordinates: generateFramesCoordinates("horizontal", 9, [0, 7], 150),
    }),
    right: Animation.fromSpriteSheetCoordinates({
      spriteSheet: spriteBig,
      frameCoordinates: generateFramesCoordinates(
        "horizontal",
        10,
        [0, 7],
        150
      ),
    }),
  },
  death: Animation.fromSpriteSheetCoordinates({
    spriteSheet: sprite,
    frameCoordinates: generateFramesCoordinates("horizontal", 20, [0, 6], 300),
  }),
};
