import { ExActor } from "@/actors/core/ExtendedActor";
import { Feature } from "@/actors/features/Feature";
import { createCollision } from "@/actors/misc/Collision";
import { Features } from "@/data/Features";
import { Actor, Engine, Vector } from "excalibur";

export class DebugFeature extends Feature {
  collision: Actor | undefined;
  constructor(actor: ExActor, engine: Engine) {
    super({
      key: Features.debug,
      actor,
    });
    engine.on("debug_collision", (enable) => {
      if (enable) {
        console.log("this.actor", this.actor);
        // const collision =  new Actor({
        //   width: actor.width,
        //   height: actor.height,
        //   radius: this.actor.collisionObject.radius,
        //   color: Color.Red,
        // });
        const collision = createCollision({
          offset: new Vector(0, 0),
          radius: this.actor.collisionObject.radius,
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
