import { EffectKeys } from "../../../data/effects/Effects";
import { EffectProps } from "../../effects/BaseEffect";
import { ProjectileProps } from "../../effects/Projectile";
import { ExtendedActor } from "../../misc/Behaviour";
import { HitBoxProps } from "../../misc/HitBox";
import { getCastSkill } from "../../skills/castAttackSkill";
import { createAblaze } from "./Ablaze";

interface FireballProps {
  // casterSprite: SpriteSheet,
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
  };
  const effect: EffectProps = {
    effectKey: EffectKeys.fireball_01,
    ...hitbox,
  };
  const fireBall: ProjectileProps = {
    speed: 200,
    duration: 5000,
    onCollision: (actor: ExtendedActor) => {
      // Create an ablaze effect on the target:
      const empty = createAblaze();
      empty.z = actor.z + 1;
      actor.addChild(empty);
    },
    ...effect,
  };
  return getCastSkill(fireBall);
};
