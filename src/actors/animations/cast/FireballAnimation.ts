import { ImageSource, SpriteSheet } from "excalibur";
import { images } from "../../../game/Resources";
import { Grid, generateAnimationsFromFramesCoordinates, generateFramesCoordinates } from "../../../utils/Common";
import { TAG_PLAYER } from "../../../utils/Constants";
import { Direction } from "../../../utils/InputManager";
import { BaseEffect } from "../../effects/BaseEffect";
import { ExtendedActor } from "../../misc/Behaviour";

export const getFireballAnimation = (imageSource: ImageSource, frameCount: number, grid: Grid) => {
  const animationSpriteSheet = SpriteSheet.fromImageSource({
    image: imageSource,
    grid: grid
  });

  var animationFx: BaseEffect | null = null;

  // @ts-ignore
  return {
    hitBox: animationFx,
    frames: Array.from(new Array(frameCount)).map(_ => {
      return {
        x: 0,
        y: 0,
        duration: 150,
        callbackFn: (object: ExtendedActor, index: number) => {
          if (index >= 3 && index < 5 && !animationFx) {
            animationFx = createAnimationFx(object);
            object.addChild(animationFx);
          }
          if (index >= 5 && animationFx) {
            if (!animationFx.isKilled()) animationFx.kill();
            animationFx = null;
          }
          // @ts-ignore
          const frames = generateAnimationsFromFramesCoordinates(animationSpriteSheet, maceAnimationsFrames[object.direction]);
          object.graphics.use(frames[index]);
        }
      }
    })
  };
}

const createAnimationFx = (actor: ExtendedActor) => {
  var rotation = 0, x = 4, y = 4, width = 32, height = 48, flipVertical = false, flipHorizontal = false;
  switch (actor.direction) {
    case Direction.up: {
      flipVertical = true;
      rotation = -Math.PI / 2;
      height = 56;
      // width = 48;
      y = -32;
      break;
    }
    case Direction.left: {
      // height = 48;
      x = -32;
      break;
    }
    case Direction.down: {
      rotation = -Math.PI / 2;
      // width = 48;
      height = 56;
      y = 32;
      break;
    }
    case Direction.right: {
      flipHorizontal = true;
      // height = 48;
      x = 32;
      break;
    }
  }
  const animationFx = new BaseEffect({
    imageSource: images.impact_01,
    initialPos: 15,
    range: [0, 6],
    frameDuration: 100,
    rotation: rotation,
    grid: {
      columns: 6,
      rows: 24,
      spriteWidth: 32,
      spriteHeight: 32,
    },
    x: x,
    y: y,
    width: width,
    height: height,
    hitTag: [TAG_PLAYER],
    damage: 1,
  })
  animationFx.graphics.flipVertical = flipVertical;
  animationFx.graphics.flipHorizontal = flipHorizontal;
  return animationFx
}

export const maceAnimationsFrames = {
  up: generateFramesCoordinates("horizontal", 7, [0, 6], 150),
  left: generateFramesCoordinates("horizontal", 8, [0, 6], 150),
  down: generateFramesCoordinates("horizontal", 9, [0, 6], 150),
  right: generateFramesCoordinates("horizontal", 10, [0, 6], 150),
}