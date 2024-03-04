import { Behavior } from "@/actors/behaviors/Behavior";
import { ExActor } from "@/actors/core/ExtendedActor";
import { VIEWPORT_DRAW_MARGIN } from "@/utils/Constants";

export class DrawOnScreenBehavior extends Behavior {
  constructor(actor: ExActor) {
    super({
      actor,
      callback: (engine) => {
        const camera = engine.currentScene.camera;
        // Check if the actor is off-screen
        if (
          camera.viewport.left - VIEWPORT_DRAW_MARGIN <= this.actor.pos.x &&
          camera.viewport.right + VIEWPORT_DRAW_MARGIN >= this.actor.pos.x &&
          camera.viewport.top - VIEWPORT_DRAW_MARGIN <= this.actor.pos.y &&
          camera.viewport.bottom + VIEWPORT_DRAW_MARGIN >= this.actor.pos.y
        ) {
          this.actor.graphics.visible = true;
        } else {
          this.actor.graphics.visible = false;
        }
      },
    });
  }
}
