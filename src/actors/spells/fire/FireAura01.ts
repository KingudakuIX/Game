import { Vector } from "excalibur";
import { EffectKeys } from "../../../data/effects/Effects";
import { EffectProps } from "../../effects/BaseEffect";
import { HitBoxProps } from "../../misc/HitBox";
import { getCastSkill } from "../../skills/castAttackSkill";

interface FireballProps {
  tags: string[];
}

export const createFireAura01 = ({ tags }: FireballProps) => {
  const hitbox: HitBoxProps = {
    x: 0,
    y: 0,
    width: 64,
    height: 64,
    hitTag: tags,
    damage: 1,
    timing: {
      oneTime: false,
      cooldown: 1000,
    }
  };
  const effect: EffectProps = {
    effectKey: EffectKeys.fireaura_01,
    scale: new Vector(1.5, 1.5),
    ...hitbox,
  };
  const auraSkill = getCastSkill({ name: "fireAura", frameCount: 6, effectData: effect, cooldown: 0 });
  auraSkill.toggle = true;
  return auraSkill;
};
