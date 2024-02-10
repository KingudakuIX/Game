import { ImageSource } from "excalibur";
import { getMaceAnimation } from "../animations/melee/MaceAnimations";
import { Skill } from "../behaviour/SkillsBehaviour";
import { getMeleeAttackSkill } from "./meleeAttackSkill";

export const getMaceAttackSkill = (imageSource: ImageSource): Skill => {
  const { frames, hitBox } = getMaceAnimation(imageSource, 6, {
    columns: 6,
    rows: 11,
    spriteHeight: 192,
    spriteWidth: 192,
  })

  return getMeleeAttackSkill(500, 45, frames);
}