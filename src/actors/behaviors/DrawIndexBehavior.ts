import { Behavior } from "@/actors/behaviors/Behavior";
import { ExActor } from "@/actors/core/ExtendedActor";
import { StateFeature } from "@/actors/features/StateFeature";
import { Features } from "@/data/Features";

export class DrawIndexBehavior extends Behavior {
  constructor(actor: ExActor) {
    super({
      actor,
      condition: () => true,
      callback: () => {
        const state = this.actor.getFeature<StateFeature>(Features.state);
        if (!state) return;
        if (state.isDead) this.actor.z = 1; // Low index for dead actors.
        this.actor.z = this.actor.pos.y;
      },
    });
  }
}
