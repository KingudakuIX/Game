import { ExActor } from "@/actors/core/ExtendedActor";
import { Feature } from "@/actors/features/Feature";
import { Damage } from "@/actors/misc/Damage";
import { Features } from "@/data/Features";

export interface Stats {
  hp: number;
}

/**
 * @description Track commons statistics for actors, like hp, movement speed, etc...
 */
export class StatsFeature extends Feature {
  hp: number;
  speed: number = 100;

  constructor(actor: ExActor, stats: Stats) {
    super({
      key: Features.stats,
      actor,
    });

    const { hp } = stats;
    this.hp = hp;

    actor.on("receiveDamage", (damage) => {
      this.onReceiveDamage(damage as Damage);
    });
  }

  onReceiveDamage(damage: Damage) {
    console.log("damage received:", damage);
    console.log("hp:", this.hp);
    // @ts-ignore
    this.hp -= damage.quantity;
  }
}
