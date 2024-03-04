import { FollowBehavior } from "@/actors/behaviors/FollowBehavior";
import { CharacterActor } from "@/actors/core/CharacterActor";
import { GraphicKey } from "@/data/Graphics";
import { Engine, Shape, Vector } from "excalibur";

export class EnemyActor extends CharacterActor {
  constructor() {
    super({
      stats: {
        hp: 20,
      },
      graphicKey: GraphicKey.mannequin,
      collider: Shape.Box(24, 24, undefined, new Vector(0, 8)),
    });
  }

  onInitialize(engine: Engine): void {
    super.onInitialize(engine);
    this.behaviors.push(new FollowBehavior(this));
  }
}
