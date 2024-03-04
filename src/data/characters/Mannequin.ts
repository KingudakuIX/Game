import { images } from "@/game/Resources";
import { AnimationData, generateFramesCoordinates } from "@/utils/Common";
import { Animation, SpriteSheet } from "excalibur";

/* Sprite sheets */
const mannequinIdle = SpriteSheet.fromImageSource({
  image: images.mannequin_idle,
  grid: {
    columns: 10,
    rows: 8,
    spriteWidth: 128,
    spriteHeight: 128,
  },
});
const mannequinRun = SpriteSheet.fromImageSource({
  image: images.mannequin_run,
  grid: {
    columns: 7,
    rows: 8,
    spriteWidth: 128,
    spriteHeight: 128,
  },
});

export const mannequinAnimations: AnimationData = {
  idle: {
    down: Animation.fromSpriteSheetCoordinates({
      spriteSheet: mannequinIdle,
      frameCoordinates: generateFramesCoordinates("horizontal", 0, [0, 9], 100),
    }),
    down_right: Animation.fromSpriteSheetCoordinates({
      spriteSheet: mannequinIdle,
      frameCoordinates: generateFramesCoordinates("horizontal", 1, [0, 9], 100),
    }),
    right: Animation.fromSpriteSheetCoordinates({
      spriteSheet: mannequinIdle,
      frameCoordinates: generateFramesCoordinates("horizontal", 2, [0, 9], 100),
    }),
    up_right: Animation.fromSpriteSheetCoordinates({
      spriteSheet: mannequinIdle,
      frameCoordinates: generateFramesCoordinates("horizontal", 3, [0, 9], 100),
    }),
    up: Animation.fromSpriteSheetCoordinates({
      spriteSheet: mannequinIdle,
      frameCoordinates: generateFramesCoordinates("horizontal", 4, [0, 9], 100),
    }),
    up_left: Animation.fromSpriteSheetCoordinates({
      spriteSheet: mannequinIdle,
      frameCoordinates: generateFramesCoordinates("horizontal", 5, [0, 9], 100),
    }),
    left: Animation.fromSpriteSheetCoordinates({
      spriteSheet: mannequinIdle,
      frameCoordinates: generateFramesCoordinates("horizontal", 6, [0, 9], 100),
    }),
    down_left: Animation.fromSpriteSheetCoordinates({
      spriteSheet: mannequinIdle,
      frameCoordinates: generateFramesCoordinates("horizontal", 7, [0, 9], 100),
    }),
  },
  running: {
    down: Animation.fromSpriteSheetCoordinates({
      spriteSheet: mannequinRun,
      frameCoordinates: generateFramesCoordinates("horizontal", 0, [0, 6], 100),
    }),
    down_right: Animation.fromSpriteSheetCoordinates({
      spriteSheet: mannequinRun,
      frameCoordinates: generateFramesCoordinates("horizontal", 1, [0, 6], 100),
    }),
    right: Animation.fromSpriteSheetCoordinates({
      spriteSheet: mannequinRun,
      frameCoordinates: generateFramesCoordinates("horizontal", 2, [0, 6], 100),
    }),
    up_right: Animation.fromSpriteSheetCoordinates({
      spriteSheet: mannequinRun,
      frameCoordinates: generateFramesCoordinates("horizontal", 3, [0, 6], 100),
    }),
    up: Animation.fromSpriteSheetCoordinates({
      spriteSheet: mannequinRun,
      frameCoordinates: generateFramesCoordinates("horizontal", 4, [0, 6], 100),
    }),
    up_left: Animation.fromSpriteSheetCoordinates({
      spriteSheet: mannequinRun,
      frameCoordinates: generateFramesCoordinates("horizontal", 5, [0, 6], 100),
    }),
    left: Animation.fromSpriteSheetCoordinates({
      spriteSheet: mannequinRun,
      frameCoordinates: generateFramesCoordinates("horizontal", 6, [0, 6], 100),
    }),
    down_left: Animation.fromSpriteSheetCoordinates({
      spriteSheet: mannequinRun,
      frameCoordinates: generateFramesCoordinates("horizontal", 7, [0, 6], 100),
    }),
  },
};
