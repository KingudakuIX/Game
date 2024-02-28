import { Behavior } from "@/actors/behaviors/Behavior";
import { Feature } from "@/actors/features/Feature";
import { Actor, Engine } from "excalibur";

export interface ExActor extends Actor {
  behaviors: Behavior[];
  features: { [key: string]: Feature };
  [key: string]: any;
}

export class ExtendedActor extends Actor {
  behaviors: Behavior[] = [];
  features: { [key: string]: Feature } = {};

  constructor() {
    super();
  }

  onInitialize(_: Engine): void {}

  onPreUpdate(engine: Engine, delta: number): void {
    this.handleBehaviors(engine, delta);
  }

  handleBehaviors(engine: Engine, delta: number) {
    // Handle behaviors:
    this.behaviors.forEach((behavior) => {
      // Check if the condition is met or there is no condition:
      if (!behavior.condition || behavior.condition(this)) {
        // Enter behavior:
        if (!behavior.running) behavior.enterCallback(this, delta);
        // Run behavior:
        behavior.callback(this, engine, delta);
      } else if (behavior.running && behavior.exitCallback) {
        // Exit behavior:
        behavior.exitCallback(this, delta);
      }
    });
  }
}
