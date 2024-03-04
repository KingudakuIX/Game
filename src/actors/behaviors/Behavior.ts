import { ExActor } from "@/actors/core/ExtendedActor";
import { Engine } from "excalibur";

interface BehaviorArgs {
  actor: ExActor;
  condition?: () => boolean;
  enterCallback?: (delta: number) => void;
  callback: (engine: Engine, delta: number) => void;
  exitCallback?: (delta: number) => void;
}

export class Behavior implements BehaviorArgs {
  running = false;
  actor: ExActor;
  condition?: () => boolean;
  callback: (engine: Engine, delta: number) => void;
  enterCallbackFn?: (delta: number) => void;
  exitCallbackFn?: (delta: number) => void;

  constructor({
    actor,
    condition,
    enterCallback,
    callback,
    exitCallback,
  }: BehaviorArgs) {
    this.actor = actor;
    this.condition = condition;
    this.enterCallbackFn = enterCallback;
    this.callback = callback;
    this.exitCallbackFn = exitCallback;
  }

  enterCallback(delta: number) {
    this.running = true;
    if (this.enterCallbackFn) this.enterCallbackFn(delta);
  }

  exitCallback(delta: number) {
    this.running = false;
    if (this.exitCallbackFn) this.exitCallbackFn(delta);
  }
}
