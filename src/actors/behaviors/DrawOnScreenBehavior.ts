import { Behavior } from "@/actors/behaviors/Behavior";
import { VIEWPORT_DRAW_MARGIN } from "@/utils/Constants";

export class DrawOnScreenBehavior extends Behavior {
  constructor() {
    super({
      callback: (actor, engine) => {
        const camera = engine.currentScene.camera;
        // Check if the actor is off-screen
        if (
          camera.viewport.left - VIEWPORT_DRAW_MARGIN <= actor.pos.x &&
          camera.viewport.right + VIEWPORT_DRAW_MARGIN >= actor.pos.x &&
          camera.viewport.top - VIEWPORT_DRAW_MARGIN <= actor.pos.y &&
          camera.viewport.bottom + VIEWPORT_DRAW_MARGIN >= actor.pos.y
        ) {
          actor.graphics.visible = true;
        } else {
          actor.graphics.visible = false;
        }
      },
    });
  }
}
