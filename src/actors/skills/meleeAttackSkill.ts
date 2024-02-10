import { MELEE_ATTACK } from "../../utils/Constants";
import { ActionFrame, SpriteSequence } from "../animations/SpriteSequence";
import { Skill } from "../behaviour/SkillsBehaviour";

export const getMeleeAttackSkill = (cooldown: number, range: number, frames: ActionFrame<any>[]): Skill => {
  return {
    isOnCooldown: false,
    cooldownProgress: 0,
    cooldown: cooldown,
    range: range,
    getActionAnimation: (actor) => {
      const actionAnimation = new SpriteSequence(
        MELEE_ATTACK,
        frames,
        () => { actor.actionAnimation = null; }
      );
      actionAnimation.actorObject = actor;
      return actionAnimation;
    },
  }
}