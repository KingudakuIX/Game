import { BaseActor, BaseActorProps } from "@/actors/core/BaseActor";
import { DamageableFeature } from "@/actors/features/DamagableFeature";
import { Stats, StatsFeature } from "@/actors/features/StatsFeature";
import { DamageType } from "@/actors/misc/Damage";
import { Features } from "@/data/Features";
import { Engine, Keys } from "excalibur";

interface CharacterArgs extends BaseActorProps {
  stats: Stats;
}

export class CharacterActor extends BaseActor {
  stats: Stats;

  constructor({ stats, graphicKey }: CharacterArgs) {
    super({
      graphicKey,
    });

    this.stats = stats;
  }

  onInitialize(engine: Engine): void {
    super.onInitialize(engine);
    this.features[Features.stats] = new StatsFeature(this, this.stats);
    this.features[Features.damageable] = new DamageableFeature(this);
  }

  onPreUpdate(engine: Engine, delta: number): void {
    super.onPreUpdate(engine, delta);
    if (engine.input.keyboard.wasPressed(Keys.P)) {
      this.getFeature<DamageableFeature>(Features.damageable)?.handleTakeDamage(
        { quantity: 1, type: DamageType.fire },
        "demo",
        1000
      );
    }
  }
}
