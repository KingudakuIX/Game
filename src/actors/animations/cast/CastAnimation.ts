import { ImageSource, SpriteSheet } from "excalibur";
import { state } from "../../../game/Game";
import { Grid, generateAnimationsFromFramesCoordinates, generateFramesCoordinates } from "../../../utils/Common";
import { Projectile, ProjectileProps } from "../../effects/Projectile";
import { ExtendedActor } from "../../misc/Behaviour";

export const getCastAnimation = (imageSource: ImageSource, frameCount: number, grid: Grid, projectileData: ProjectileProps) => {
  const animationSpriteSheet = SpriteSheet.fromImageSource({
    image: imageSource,
    grid: grid
  });

  // @ts-ignore
  return {
    frames: Array.from(new Array(frameCount)).map((_, index) => {
      return {
        x: 0,
        y: 0,
        duration: index === 5 ? 500 : 150,
        callbackFn: (object: ExtendedActor, index: number) => {
          if (index === 5) {
            createProjectile(object, projectileData);
          }
          // @ts-ignore
          const frames = generateAnimationsFromFramesCoordinates(animationSpriteSheet, castAnimationsFrames[object.direction]);
          object.graphics.use(frames[index]);
        }
      }
    })
  };
}

// const createAnimationFx = (actor: ExtendedActor) => {
//   var rotation = 0, x = 4, y = 4, width = 32, height = 48, flipVertical = false, flipHorizontal = false;
//   switch (actor.direction) {
//     case Direction.up: {
//       flipVertical = true;
//       rotation = -Math.PI / 2;
//       height = 56;
//       // width = 48;
//       y = -32;
//       break;
//     }
//     case Direction.left: {
//       // height = 48;
//       x = -32;
//       break;
//     }
//     case Direction.down: {
//       rotation = -Math.PI / 2;
//       // width = 48;
//       height = 56;
//       y = 32;
//       break;
//     }
//     case Direction.right: {
//       flipHorizontal = true;
//       // height = 48;
//       x = 32;
//       break;
//     }
//   }
//   const animationFx = new BaseEffect({
//     imageSource: images.impact_01,
//     initialPos: 15,
//     range: [0, 6],
//     frameDuration: 100,
//     rotation: rotation,
//     grid: {
//       columns: 6,
//       rows: 24,
//       spriteWidth: 32,
//       spriteHeight: 32,
//     },
//     x: x,
//     y: y,
//     width: width,
//     height: height,
//     hitTag: [TAG_PLAYER],
//     damage: 1,
//   })
//   animationFx.graphics.flipVertical = flipVertical;
//   animationFx.graphics.flipHorizontal = flipHorizontal;
//   return animationFx
// }

const createProjectile = (actor: ExtendedActor, projectileData: ProjectileProps) => {
  const projectile = new Projectile({ ...projectileData, x: actor.pos.x, y: actor.pos.y });
  projectile.setDirection(actor.direction);
  state.instance?.add(projectile);
}

export const castAnimationsFrames = {
  up: generateFramesCoordinates("horizontal", 0, [0, 7], 150),
  left: generateFramesCoordinates("horizontal", 1, [0, 7], 150),
  down: generateFramesCoordinates("horizontal", 2, [0, 7], 150),
  right: generateFramesCoordinates("horizontal", 3, [0, 7], 150),
}