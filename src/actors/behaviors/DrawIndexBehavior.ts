import { Behavior } from "@/actors/behaviors/Behavior";

export class DrawIndexBehavior extends Behavior {
  constructor() {
    super({
      condition: () => true,
      callback: (actor) => {
        if (actor.isDead) actor.z = 1; // Low index for dead actors.
        actor.z = actor.pos.y;
      },
    });
  }
}
