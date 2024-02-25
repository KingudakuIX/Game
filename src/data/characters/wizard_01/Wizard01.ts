import { Animation } from "excalibur";
import {
  AnimationData,
  generateFramesCoordinates,
} from "../../../utils/Common";
import { SpriteKeys, spritesMap } from "../../Spritesheet";

const sprite = spritesMap.get(SpriteKeys.wizard_01);

export const wizard01Animations: AnimationData = {
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
  cast: {
    up: Animation.fromSpriteSheetCoordinates({
      spriteSheet: sprite,
      frameCoordinates: generateFramesCoordinates("horizontal", 0, [0, 7], 150),
    }),
    left: Animation.fromSpriteSheetCoordinates({
      spriteSheet: sprite,
      frameCoordinates: generateFramesCoordinates("horizontal", 1, [0, 7], 150),
    }),
    down: Animation.fromSpriteSheetCoordinates({
      spriteSheet: sprite,
      frameCoordinates: generateFramesCoordinates("horizontal", 2, [0, 7], 150),
    }),
    right: Animation.fromSpriteSheetCoordinates({
      spriteSheet: sprite,
      frameCoordinates: generateFramesCoordinates("horizontal", 3, [0, 7], 150),
    }),
  },
  death: Animation.fromSpriteSheetCoordinates({
    spriteSheet: sprite,
    frameCoordinates: generateFramesCoordinates("horizontal", 20, [0, 6], 300),
  }),
};
