import { SpriteSequence } from "../animations/SpriteSequence";
import { Behaviour, ExtendedActor } from "../misc/Behaviour";

export interface Skill {
  key?: string,
  execute?: boolean,
  isOnCooldown: boolean,
  cooldownProgress: number,
  cooldown: number,
  range: number,
  getActionAnimation: (actor: ExtendedActor) => SpriteSequence<any>,
}

export const skillsBehaviour = () => {
  return new Behaviour({
    condition: (actor) => {
      return !actor.isDying && actor.target;
    },
    callback: (actor, _, delta) => {
      if (!actor.actionAnimation) {
        // Loop through the actor skills to seek for one...
        var currentSkill: Skill | any = null;
        actor.skills.every((skill: Skill) => {
          if (checkSkillAvailable(actor, skill)) {
            currentSkill = skill;
            return false;
          }
        });
        if (currentSkill) {
          currentSkill.isOnCooldown = true;
          const actionAnimation = currentSkill.getActionAnimation(actor);
          actor.actionAnimation = actionAnimation;
        }
        handleCooldown(actor, delta);
      }
    }
  });
}

const checkSkillAvailable = (actor: ExtendedActor, skill: Skill) => {
  if (skill.isOnCooldown) return false;
  const targetPos = actor.target.pos;
  const distance = Math.round(targetPos.distance(actor.pos));
  return distance <= skill.range;
}

const handleCooldown = (actor: ExtendedActor, delta: number) => {
  actor.skills.every((skill: Skill) => {
    if (skill.isOnCooldown) {
      skill.cooldownProgress += delta;
      if (skill.cooldownProgress > skill.cooldown) {
        skill.isOnCooldown = false;
        skill.cooldownProgress = 0;
      }
    }
  });
}