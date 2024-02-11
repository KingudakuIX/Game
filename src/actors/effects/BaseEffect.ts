import { Engine, SpriteSheet } from "excalibur";
import { EffectKeys, effectsMap } from "../../data/effects/Effects";
import { HitBox, HitBoxProps } from "../misc/HitBox";

export interface EffectProps extends HitBoxProps {
  effectKey: EffectKeys;
  rotation?: number;
}

export class BaseEffect extends HitBox {
  effectKey: EffectKeys;
  effectSprite: SpriteSheet | null = null;
  constructor({ effectKey, rotation = 0, ...props }: EffectProps) {
    super(props);
    this.effectKey = effectKey;
    this.rotation = rotation;
    this.z = 75;
  }
  onInitialize(engine: Engine): void {
    super.onInitialize(engine);
    console.log("effectKey", this.effectKey);
    console.log("effectsMap", effectsMap);
    // Load effect animation:
    const animation = effectsMap.get(this.effectKey);
    this.graphics.use(animation);
  }
}
