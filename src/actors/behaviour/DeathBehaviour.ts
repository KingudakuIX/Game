import { generateAnimationsFromFramesCoordinates } from "../../utils/Common";
import { DYING } from "../../utils/Constants";
import { BaseCharacter } from "../BaseCharacter";
import { animationsFrames } from "../animations/CommonAnimations";
import { SpriteSequence } from "../animations/SpriteSequence";
import { Behaviour } from "../misc/Behaviour";

export const deathBehaviour = () => {
  return new Behaviour({
    condition: (actor) => {
      return !actor.isDying && actor.hp <= 0;
    },
    callback: (actor) => {
      actor.isDying = true;

      const dyingAnimationFrames = generateAnimationsFromFramesCoordinates(actor.spriteSheet, animationsFrames.dying);

      actor.actionAnimation = new SpriteSequence(
        DYING,
        dyingAnimationFrames.map(frame => {
          return {
            x: 0,
            y: 0,
            duration: frame.frameDuration ?? 0,
            callbackFn: (object: BaseCharacter, index: number) => {
              console.log("enter here?")
              object.graphics.use(dyingAnimationFrames[index]);
            }
          }
        }),
        () => {
          actor.graphics.use(dyingAnimationFrames[dyingAnimationFrames.length - 1]);
          actor.actionAnimation = null;
        }
      );

      actor.actionAnimation.actorObject = actor;
    }
  });
}