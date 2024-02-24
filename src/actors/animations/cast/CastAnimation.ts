import { Animation } from "excalibur";
import { state } from "../../../game/Game";
import { Projectile, ProjectileProps } from "../../effects/Projectile";
import { ExtendedActor } from "../../misc/Behaviour";

export const getCastAnimation = (
  frameCount: number,
  projectileData: ProjectileProps
) => {
  return {
    frames: Array.from(new Array(frameCount)).map((_, index) => {
      return {
        duration: index === 5 ? 500 : 150,
        callbackFn: (actor: ExtendedActor, index: number) => {
          if (index === 5) {
            createProjectile(actor, projectileData);
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

  // projectile.setDirection(actor.direction);

  const lastPos = state.instance!.input.pointers.primary.lastWorldPos;
  projectile.rotation = Math.atan2(
    lastPos.y - actor.pos.y,
    lastPos.x - actor.pos.x
  );
  console.log(projectile.rotation);

  state.instance?.add(projectile);
};
