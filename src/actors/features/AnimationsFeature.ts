import { ExActor } from "@/actors/core/ExtendedActor";
import { Feature } from "@/actors/features/Feature";
import { StateFeature } from "@/actors/features/StateFeature";
import { Features } from "@/data/Features";
import { GraphicKey, graphicMap } from "@/data/Graphics";
import { AnimationData } from "@/utils/Common";
import { Animation } from "excalibur";

/**
 * @deprecated Integrated by default on BaseActor.
 */
export class AnimationsFeature extends Feature {
  // Manage the current direction of the actor and update it's graphics accordingly.
  // graphicKey: GraphicKey;
  animations: AnimationData;

  constructor(actor: ExActor, graphicKey: GraphicKey) {
    super({
      key: Features.animations,
      actor,
    });

    this.animations = graphicMap.get(graphicKey);
  }

  onRenderLoop() {
    // Retrieve actor action and direction from StateFeature
    const state = this.actor.getFeature<StateFeature>(Features.state);
    if (state) {
      const { action, direction } = state;
      const animation: Animation | undefined = this.animations[action]
        ? // @ts-ignore
          this.animations[action][direction]
        : this.animations[action];
      animation && this.actor.graphics.use(animation);
    }
  }
}
