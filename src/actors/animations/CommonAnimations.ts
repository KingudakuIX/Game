import { Animation, ImageSource, SpriteSheet } from "excalibur";
import { AnimationData, generateFramesCoordinates } from "../../utils/Common";

export const getCharacterAnimation = (imageSource: ImageSource) => {
  // Load sprite
  const characterSpriteSheet = SpriteSheet.fromImageSource({
    image: imageSource,
    grid: {
      columns: 13,
      rows: 21,
      spriteWidth: 64,
      spriteHeight: 64,
    },
  });

  // Generate common animations
  const characterAnimations: AnimationData = {
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
    die: Animation.fromSpriteSheetCoordinates({
      spriteSheet: characterSpriteSheet,
      frameCoordinates: generateFramesCoordinates("horizontal", 8, [0, 7], 100),
    }),
  };

  // Retrun previously generated animations
  return characterAnimations;
}
