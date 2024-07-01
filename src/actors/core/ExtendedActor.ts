import { Behavior } from "@/actors/behaviors/Behavior";
import { Feature } from "@/actors/features/Feature";
import { Actor, ActorArgs, Collider, Engine } from "excalibur";

export interface ExtendedActorArgs extends ActorArgs {
  collisionObject?: Collider;
}

export interface ExActor extends Actor {
  behaviors: { [key: string]: Behavior };
  features: { [key: string]: Feature };
  getBehavior: <T>(behaviors: string) => T | undefined;
  getFeature: <T>(feature: string) => T | undefined;
  [key: string]: any;
}

/**
 * @description Class which every objects extends from, it handles all features and behaviors
 */
export class ExtendedActor extends Actor {
  collisionObject: Collider | undefined;
  behaviors: { [key: string]: Behavior } = {};
  features: { [key: string]: Feature } = {};

  constructor({ collisionObject, ...args }: ExtendedActorArgs) {
    super(args);
    this.collisionObject = collisionObject;
    collisionObject && this.collider.set(collisionObject);
  }

  onInitialize(_: Engine): void {}

  onPreUpdate(engine: Engine, delta: number): void {
    this.handleBehaviors(engine, delta);
  }

  handleBehaviors(engine: Engine, delta: number) {
    // Handle behaviors:
    Object.entries(this.behaviors).forEach(([_, behavior]) => {
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

  getBehavior<T>(behavior: string) {
    return this.behaviors[behavior] as T | undefined;
  }

  getFeature<T>(feature: string) {
    return this.features[feature] as T | undefined;
  }
}
