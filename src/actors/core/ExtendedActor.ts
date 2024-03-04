import { Behavior } from "@/actors/behaviors/Behavior";
import { Feature } from "@/actors/features/Feature";
import { Actor, ActorArgs, Engine } from "excalibur";

export interface ExActor extends Actor {
  behaviors: Behavior[];
  features: { [key: string]: Feature };
  getFeature: <T>(feature: string) => T | undefined;
  [key: string]: any;
}

/**
 * @description Class which every objects extends from, it handles all features and behaviors
 */
export class ExtendedActor extends Actor {
  behaviors: Behavior[] = [];
  features: { [key: string]: Feature } = {};

  constructor(args?: ActorArgs) {
    super(args);
  }

  onInitialize(_: Engine): void {}

  onPreUpdate(engine: Engine, delta: number): void {
    this.handleBehaviors(engine, delta);
  }

  handleBehaviors(engine: Engine, delta: number) {
    // Handle behaviors:
    this.behaviors.forEach((behavior) => {
      // Check if the condition is met or there is no condition:
      if (!behavior.condition || behavior.condition()) {
        // Enter behavior:
        if (!behavior.running) behavior.enterCallback(delta);
        // Run behavior:
        behavior.callback(engine, delta);
      } else if (behavior.running && behavior.exitCallback) {
        // Exit behavior:
        behavior.exitCallback(delta);
      }
    });
  }

  getFeature<T>(feature: string) {
    return this.features[feature] as T | undefined;
  }
}
