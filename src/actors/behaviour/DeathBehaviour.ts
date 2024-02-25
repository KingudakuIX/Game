import { Animation } from "excalibur";
import { DYING } from "../../utils/Constants";
import { BaseCharacter } from "../BaseCharacter";
import { SpriteSequence } from "../animations/SpriteSequence";
import { Behaviour } from "../misc/Behaviour";

export const deathBehaviour = () => {
  return new Behaviour({
    condition: (actor) => {
      return !actor.isDying && actor.hp <= 0;
    },
    callback: (actor) => {
      actor.isDying = true;

      actor.collider.clear();

      if (actor.label) {
        actor.label.kill();
        actor.label = null;
      }
      actor.healthbar.kill();
      actor.healthbar = null;

      const animation: Animation = actor.animations.death;

      actor.setActionAnimation(new SpriteSequence(
        DYING,
        animation.frames.map((frame) => {
          return {
            duration: frame.duration ?? 0,
            callbackFn: (object: BaseCharacter, index: number) => {
              object.graphics.use(frame.graphic!);
            },
          };
        }),
        () => {
          actor.graphics.use(
            animation.frames[animation.frames.length - 1].graphic!
          );
          actor.setActionAnimation(null);
        }
      ));

      actor.actionAnimation.actorObject = actor;
    },
  });
};
