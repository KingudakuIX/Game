import { getMaceAnimation } from "../animations/melee/MaceAnimations";
import { Skill } from "../behaviour/SkillsBehaviour";
import { getMeleeAttackSkill } from "./meleeAttackSkill";

export const getMaceAttackSkill = (tags: string[]): Skill => {
  const { frames } = getMaceAnimation(6, tags);

  return getMeleeAttackSkill(500, 45, frames);
};
