import { Engine, SpriteSheet, Vector } from "excalibur";
import { EffectKeys, effectsMap } from "../../data/effects/Effects";
import { HitBox, HitBoxProps } from "../misc/HitBox";

export interface EffectProps extends HitBoxProps {
  effectKey: EffectKeys;
  rotation?: number;
  scale?: Vector;
}

export class BaseEffect extends HitBox {
  effectKey: EffectKeys;
  effectSprite: SpriteSheet | null = null;
  constructor({ effectKey, rotation = 0, scale = new Vector(1, 1), ...props }: EffectProps) {
    super(props);
    this.effectKey = effectKey;
    this.rotation = rotation;
    this.scale = scale;
    this.z = 99998;
  }
  onInitialize(engine: Engine): void {
    super.onInitialize(engine);
    // Load effect animation:
    const animation = effectsMap.get(this.effectKey);
    this.graphics.use(animation);
  }
}
