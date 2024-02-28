import { SpriteSequence } from "../animations/SpriteSequence";
import { Behaviour, ExtendedActor } from "./Behavior";

export interface Skill {
  name: string;
  key?: string;
  execute?: boolean;
  isOnCooldown: boolean;
  cooldownProgress: number;
  cooldown: number;
  range: number;
  target?: boolean; // Used for spell which are faced on mouse position
  toggle?: boolean; // Used for aura like skills
  isActive?: boolean; // used for aura like skills
  getActionAnimation: (actor: ExtendedActor) => SpriteSequence<any>;
}

export const skillsBehaviour = () => {
  return new Behaviour({
    condition: (actor) => {
      return !actor.isDying && actor.target && !actor.target.isDying;
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
          actor.setActionAnimation(actionAnimation);
        }
        handleCooldown(actor, delta);
      }
    },
  });
};

const checkSkillAvailable = (actor: ExtendedActor, skill: Skill) => {
  if (skill.isOnCooldown) return false;
  const targetPos = actor.target.pos;
  const distance = Math.round(targetPos.distance(actor.pos));
  return distance <= skill.range;
};

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
};
