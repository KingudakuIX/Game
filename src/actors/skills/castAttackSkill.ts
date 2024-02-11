import { getCastAnimation } from "../animations/cast/CastAnimation";
import { Skill } from "../behaviour/SkillsBehaviour";
import { ProjectileProps } from "../effects/Projectile";
import { getMeleeAttackSkill } from "./meleeAttackSkill";

export const getCastSkill = (projectileData: ProjectileProps): Skill => {
  const { frames } = getCastAnimation(6, projectileData);
  return getMeleeAttackSkill(1500, 300, frames);
};
