import { EffectKeys } from "../../../data/effects/Effects";
import { ExtendedActor } from "../../behaviors/Behavior";
import { EffectProps } from "../../effects/BaseEffect";
import { ProjectileProps } from "../../effects/Projectile";
import { HitBoxProps } from "../../misc/HitBox";
import { getCastSkill } from "../../skills/castAttackSkill";
import { createAblaze } from "./Ablaze";

interface FireballProps {
  tags: string[];
}

export const createFireBall01 = ({ tags }: FireballProps) => {
  const hitbox: HitBoxProps = {
    x: 0,
    y: 0,
    width: 64,
    height: 64,
    hitTag: tags,
    damage: 2,
    timing: {
      oneTime: true,
    },
  };
  const effect: EffectProps = {
    effectKey: EffectKeys.fireball_01,
    ...hitbox,
  };
  const fireBall: ProjectileProps = {
    speed: 400,
    duration: 5000,
    onCollision: (actor: ExtendedActor) => {
      // Create an ablaze effect on the target:
      const empty = createAblaze();
      empty.z = actor.z + 1;
      actor.addChild(empty);
    },
    killOnHit: true,
    ...effect,
  };
  const fireBallSkill = getCastSkill({
    name: "fireBall",
    frameCount: 6,
    projectileData: fireBall,
    cooldown: 750,
  });
  fireBallSkill.target = true;
  return fireBallSkill;
};
