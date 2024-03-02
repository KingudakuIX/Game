import { PlayerMovementBehavior } from "@/actors/behaviors/PlayerMovementBehavior";
import { CharacterActor } from "@/actors/core/CharacterActor";
import { InputFeature } from "@/actors/features/InputFeature";
import { Features } from "@/data/Features";
import { GraphicKey } from "@/data/Graphics";
import { Engine } from "excalibur";

export class PlayerActor extends CharacterActor {
  constructor() {
    super({
      stats: {
        hp: 100,
      },
      graphicKey: GraphicKey.mannequin,
    });
  }

  onInitialize(engine: Engine): void {
    super.onInitialize(engine);
    this.features[Features.input] = new InputFeature(this, engine);
    this.behaviors.push(new PlayerMovementBehavior());
  }
}
