import { DrawIndexBehavior } from "@/actors/behaviors/DrawIndexBehavior";
import { DrawOnScreenBehavior } from "@/actors/behaviors/DrawOnScreenBehavior";
import { ExtendedActor } from "@/actors/core/ExtendedActor";
import { StateFeature } from "@/actors/features/StateFeature";
import { Features } from "@/data/Features";
import { GraphicKey, graphicMap } from "@/data/Graphics";
import { Action, AnimationData, Direction } from "@/utils/Common";
import { Engine, Graphic } from "excalibur";

export interface BaseActorProps {
  graphicKey: GraphicKey;
}

/**
 * @description (Extends "ExtendedActor" class. Provides by default the two Behaviors "DrawIndexBehavior" and "DrawOnScreenBehavior")
 */
export class BaseActor extends ExtendedActor {
  animations: AnimationData;

  constructor({ graphicKey }: BaseActorProps) {
    super();
    this.animations = graphicMap.get(graphicKey);
  }

  onInitialize(engine: Engine): void {
    super.onInitialize(engine);
    this.behaviors.push(new DrawIndexBehavior());
    this.behaviors.push(new DrawOnScreenBehavior());

    this.features[Features.state] = new StateFeature(this, {
      action: Action.idle,
      direction: Direction.down,
    });
  }

  onPreUpdate(engine: Engine, delta: number): void {
    super.onPreUpdate(engine, delta);

    this.handleAnimation();
  }

  handleAnimation() {
    const state = this.getFeature<StateFeature>(Features.state);
    if (state) {
      const { action, direction } = state;
      const animation: Graphic | undefined = this.animations[action]
        ? // @ts-ignore
          this.animations[action][direction]
        : this.animations[action];
      animation && this.graphics.use(animation);
    }
  }
}
