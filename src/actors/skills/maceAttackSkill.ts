import { getMaceAnimation } from "../animations/melee/MaceAnimations";
import { Skill } from "../behaviors/SkillsBehaviour";
import { getBaseAttackSkill } from "./baseAttackSkill";

export const getMaceAttackSkill = (tags: string[]): Skill => {
  const { frames, cleanUpFn } = getMaceAnimation(6, tags);

  return getBaseAttackSkill("maceAttack", 500, 45, frames, cleanUpFn);
};
