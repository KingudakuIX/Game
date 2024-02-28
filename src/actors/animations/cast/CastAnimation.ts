import { BaseEffect, EffectProps } from "@/actors/effects/BaseEffect";
import { Animation } from "excalibur";
import { state } from "../../../game/Game";
import { ExtendedActor } from "../../behaviors/Behavior";
import { Projectile, ProjectileProps } from "../../effects/Projectile";

interface CastAnimationProps {
  frameCount: number;
  projectileData?: ProjectileProps;
  effectData?: EffectProps;
}

export const getCastAnimation = ({
  frameCount,
  projectileData,
  effectData,
}: CastAnimationProps) => {
  var animationFx: BaseEffect | null = null;
  return {
    frames: Array.from(new Array(frameCount)).map((_, index) => {
      return {
        duration: index === 5 ? 500 : 150,
        callbackFn: (actor: ExtendedActor, index: number) => {
          if (index === 5) {
            if (projectileData) {
              createProjectile(actor, projectileData);
            } else if (effectData) {
              animationFx = createEffect(actor, effectData);
              actor.addChild(animationFx);
            }
          }
          const animation: Animation = actor.animations.cast[actor.direction];
          actor.graphics.use(animation.frames[index].graphic!);
        },
      };
    }),
  };
};

const createProjectile = (
  actor: ExtendedActor,
  projectileData: ProjectileProps
) => {
  const projectile = new Projectile({
    ...projectileData,
    x: actor.pos.x,
    y: actor.pos.y,
  });

  const mousePos = actor.mousePos;
  projectile.rotation = Math.atan2(
    mousePos.y - state.instance!.halfDrawHeight,
    mousePos.x - state.instance!.halfDrawWidth
  );

  state.instance?.add(projectile);
};

const createEffect = (actor: ExtendedActor, effectData: EffectProps) => {
  const animationFx = new BaseEffect(effectData);
  // animationFx.graphics.flipVertical = flipVertical;
  // animationFx.graphics.flipHorizontal = flipHorizontal;
  return animationFx;
};
