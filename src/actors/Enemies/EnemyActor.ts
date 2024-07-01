import { FollowBehavior } from "@/actors/behaviors/FollowBehavior";
import { CharacterActor } from "@/actors/core/CharacterActor";
import { Behaviors } from "@/data/Behaviors";
import { GraphicKey } from "@/data/Graphics";
import { Engine, Shape, Vector } from "excalibur";

export class EnemyActor extends CharacterActor {
  constructor() {
    super({
      stats: {
        hp: 20,
      },
      graphicKey: GraphicKey.demon,
      collisionObject: Shape.Circle(16, new Vector(0, 8)),
    });
  }

  onInitialize(engine: Engine): void {
    super.onInitialize(engine);
    this.behaviors[Behaviors.follow] = new FollowBehavior(this, engine);
  }
}
