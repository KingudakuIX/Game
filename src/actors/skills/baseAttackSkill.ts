import { MELEE_ATTACK } from "../../utils/Constants";
import { ActionFrame, SpriteSequence } from "../animations/SpriteSequence";
import { Skill } from "../behaviors/SkillsBehaviour";

export const getBaseAttackSkill = (
  name: string,
  cooldown: number,
  range: number,
  frames: ActionFrame<any>[],
  cleanUpFn?: () => void
): Skill => {
  return {
    name: name,
    isOnCooldown: false,
    cooldownProgress: 0,
    cooldown: cooldown,
    range: range,
    getActionAnimation: (actor) => {
      const actionAnimation = new SpriteSequence(
        MELEE_ATTACK,
        frames,
        () => {
          if (actor.forceDirection) {
            actor.forceDirection = false;
          }
          actor.setActionAnimation(null);
        },
        cleanUpFn
      );
      actionAnimation.actorObject = actor;
      return actionAnimation;
    },
  };
};
