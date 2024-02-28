import { ExActor } from "@/actors/characters/ExtendedActor";
import { Feature } from "@/actors/features/Feature";
import { Features } from "@/data/Features";

export interface Stats {
  hp: number;
}

export class StatsFeature extends Feature {
  hp: number;

  constructor(actor: ExActor, stats: Stats) {
    super({
      key: Features.stats,
      actor,
      initFn: (actor: ExActor) => {
        actor.on("receiveDamage", (damage) => {
          console.log("damage received:", damage);
        });
      },
    });

    const { hp } = stats;
    this.hp = hp;
  }
}
