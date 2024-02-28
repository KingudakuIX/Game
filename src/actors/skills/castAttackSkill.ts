import { EffectProps } from "@/actors/effects/BaseEffect";
import { getCastAnimation } from "../animations/cast/CastAnimation";
import { Skill } from "../behaviors/SkillsBehaviour";
import { ProjectileProps } from "../effects/Projectile";
import { getBaseAttackSkill } from "./baseAttackSkill";

interface CastSkillProps {
  name: string;
  frameCount: number;
  projectileData?: ProjectileProps;
  effectData?: EffectProps;
  cooldown: number;
}

export const getCastSkill = ({
  name,
  frameCount,
  projectileData,
  effectData,
  cooldown,
}: CastSkillProps): Skill => {
  const { frames } = getCastAnimation({
    frameCount: frameCount,
    projectileData: projectileData,
    effectData: effectData,
  });
  return getBaseAttackSkill(name, cooldown, 300, frames);
};
