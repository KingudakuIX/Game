import { Animation } from "excalibur";
import { EffectKeys } from "../../../data/effects/Effects";
import { Direction } from "../../../utils/InputManager";
import { ExtendedActor } from "../../behaviors/Behavior";
import { BaseEffect, EffectProps } from "../../effects/BaseEffect";
import { HitBoxProps } from "../../misc/HitBox";

export const getMaceAnimation = (frameCount: number, tags: string[]) => {
  var animationFx: BaseEffect | null = null;

  return {
    frames: Array.from(new Array(frameCount)).map((_) => {
      return {
        duration: 150,
        callbackFn: (actor: ExtendedActor, index: number) => {
          if (index >= 3 && index < 5 && !animationFx) {
            animationFx = createAnimationFx(actor, tags);
            actor.addChild(animationFx);
          }
          if (index >= 5 && animationFx) {
            if (!animationFx.isKilled()) animationFx.kill();
            animationFx = null;
          }
          // @ts-ignore
          const animation: Animation =
            actor.animations.melee_attack_01[actor.direction];
          actor.graphics.use(animation.frames[index].graphic!);
        },
      };
    }),
    cleanUpFn: () => {
      if (animationFx) {
        animationFx?.kill();
        animationFx = null;
      }
    },
  };
};

const createAnimationFx = (actor: ExtendedActor, tags: string[]) => {
  var rotation = 0,
    x = 4,
    y = 4,
    width = 32,
    height = 48,
    flipVertical = false,
    flipHorizontal = false;
  switch (actor.direction) {
    case Direction.up: {
      flipVertical = true;
      rotation = -Math.PI / 2;
      height = 56;
      y = -32;
      break;
    }
    case Direction.left: {
      x = -32;
      break;
    }
    case Direction.down: {
      rotation = -Math.PI / 2;
      height = 56;
      y = 32;
      break;
    }
    case Direction.right: {
      flipHorizontal = true;
      x = 32;
      break;
    }
  }
  const hitbox: HitBoxProps = {
    x: x,
    y: y,
    width: width,
    height: height,
    hitTag: tags,
    damage: 1,
    timing: {
      oneTime: true,
    },
  };
  const effect: EffectProps = {
    effectKey: EffectKeys.impact_01,
    rotation: rotation,
    ...hitbox,
  };
  const animationFx = new BaseEffect(effect);
  animationFx.graphics.flipVertical = flipVertical;
  animationFx.graphics.flipHorizontal = flipHorizontal;
  return animationFx;
};
