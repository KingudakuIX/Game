import { ExActor } from "@/actors/core/ExtendedActor";
import { Feature } from "@/actors/features/Feature";
import { Features } from "@/data/Features";
import { Actor, Color, Engine } from "excalibur";

export class DebugFeature extends Feature {
  collision: Actor | undefined;
  constructor(actor: ExActor, engine: Engine) {
    super({
      key: Features.debug,
      actor,
    });

    engine.on("debug_collision", (enable) => {
      if (enable) {
        const collision = new Actor({
          width: actor.width,
          height: actor.height,
          color: Color.Red,
        });
        collision.graphics.opacity = 0.5;
        actor.addChild(collision);
        this.collision = collision;
      } else {
        this.collision?.kill();
      }
    });
  }
}
