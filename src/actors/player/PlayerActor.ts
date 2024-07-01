import { PlayerMovementBehavior } from "@/actors/behaviors/PlayerMovementBehavior";
import { TrailBehavior } from "@/actors/behaviors/TrailBehavior";
import { CharacterActor } from "@/actors/core/CharacterActor";
import { InputFeature } from "@/actors/features/InputFeature";
import { Behaviors } from "@/data/Behaviors";
import { Features } from "@/data/Features";
import { GraphicKey } from "@/data/Graphics";
import { Engine, Shape, Vector } from "excalibur";

export class PlayerActor extends CharacterActor {
  constructor() {
    super({
      stats: {
        hp: 100,
      },
      graphicKey: GraphicKey.mannequin,
      collisionObject: Shape.Circle(16, new Vector(0, 8)),
    });
  }

  onInitialize(engine: Engine): void {
    super.onInitialize(engine);
    this.features[Features.input] = new InputFeature(this, engine);
    this.behaviors[Behaviors.playerMovement] = new PlayerMovementBehavior(this);
    this.behaviors[Behaviors.trail] = new TrailBehavior(this);
  }
}
