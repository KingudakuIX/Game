import { DrawIndexBehavior } from "@/actors/behaviors/DrawIndexBehavior";
import { DrawOnScreenBehavior } from "@/actors/behaviors/DrawOnScreenBehavior";
import { ExtendedActor } from "@/actors/characters/ExtendedActor";
import { Engine } from "excalibur";

/**
 * @description (Extends "ExtendedActor" class. Provides by default the two Behaviors "DrawIndexBehavior" and "DrawOnScreenBehavior")
 */
export class BaseActor extends ExtendedActor {
  constructor() {
    super();
  }
  onInitialize(engine: Engine): void {
    super.onInitialize(engine);
    this.behaviors.push(new DrawIndexBehavior());
    this.behaviors.push(new DrawOnScreenBehavior());
  }
}
