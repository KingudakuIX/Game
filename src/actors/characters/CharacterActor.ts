import { ExtendedActor } from "@/actors/characters/ExtendedActor";
import { DamageableFeature } from "@/actors/features/DamagableFeature";
import { Stats, StatsFeature } from "@/actors/features/StatsFeature";
import { Features } from "@/data/Features";
import { Engine } from "excalibur";

interface CharacterArgs {
  stats: Stats;
}

export class CharacterActor extends ExtendedActor {
  stats: Stats;

  constructor({ stats }: CharacterArgs) {
    super();

    this.stats = stats;
  }
  onInitialize(engine: Engine): void {
    super.onInitialize(engine);
    this.features[Features.stats] = new StatsFeature(this, this.stats);
    this.features[Features.damageable] = new DamageableFeature(this);
  }
}
