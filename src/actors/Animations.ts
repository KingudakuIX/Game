import { Animation, SpriteSheet } from "excalibur";
import { images } from "../game/Resources";
import { AnimationData, generateFramesCoordinates } from "../utils/Common";

const characterSpriteSheet = SpriteSheet.fromImageSource({
  image: images.character_01,
  grid: {
    columns: 13,
    rows: 21,
    spriteWidth: 64,
    spriteHeight: 64,
  },
});

export const characterAnimations: AnimationData = {
  idle: {
    up: Animation.fromSpriteSheetCoordinates({
      spriteSheet: characterSpriteSheet,
      frameCoordinates: [{ x: 0, y: 8, duration: 100 }],
    }),
    left: Animation.fromSpriteSheetCoordinates({
      spriteSheet: characterSpriteSheet,
      frameCoordinates: [{ x: 0, y: 9, duration: 100 }],
    }),
    down: Animation.fromSpriteSheetCoordinates({
      spriteSheet: characterSpriteSheet,
      frameCoordinates: [{ x: 0, y: 10, duration: 100 }],
    }),
    right: Animation.fromSpriteSheetCoordinates({
      spriteSheet: characterSpriteSheet,
      frameCoordinates: [{ x: 0, y: 11, duration: 100 }],
    }),
  },
  walk: {
    up: Animation.fromSpriteSheetCoordinates({
      spriteSheet: characterSpriteSheet,
      frameCoordinates: generateFramesCoordinates("horizontal", 8, [0, 7], 100),
    }),
    left: Animation.fromSpriteSheetCoordinates({
      spriteSheet: characterSpriteSheet,
      frameCoordinates: generateFramesCoordinates("horizontal", 9, [0, 7], 100),
    }),
    down: Animation.fromSpriteSheetCoordinates({
      spriteSheet: characterSpriteSheet,
      frameCoordinates: generateFramesCoordinates(
        "horizontal",
        10,
        [0, 7],
        100
      ),
    }),
    right: Animation.fromSpriteSheetCoordinates({
      spriteSheet: characterSpriteSheet,
      frameCoordinates: generateFramesCoordinates(
        "horizontal",
        11,
        [0, 7],
        100
      ),
    }),
  },
};
