import { ImageSource } from "excalibur";
import { getCastAnimation } from "../animations/cast/CastAnimation";
import { Skill } from "../behaviour/SkillsBehaviour";
import { ProjectileProps } from "../effects/Projectile";
import { getMeleeAttackSkill } from "./meleeAttackSkill";

export const getCastSkill = (imageSource: ImageSource, projectileData: ProjectileProps): Skill => {
  const { frames } = getCastAnimation(imageSource, 6, {
    columns: 13,
    rows: 21,
    spriteWidth: 64,
    spriteHeight: 64,
  }, projectileData)

  return getMeleeAttackSkill(1500, 300, frames);
}