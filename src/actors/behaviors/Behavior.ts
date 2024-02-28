import { ExActor } from "@/actors/characters/ExtendedActor";
import { Engine } from "excalibur";

interface BehaviorArgs {
  condition?: (actor: ExActor) => boolean;
  enterCallback?: (actor: ExActor, delta: number) => void;
  callback: (actor: ExActor, engine: Engine, delta: number) => void;
  exitCallback?: (actor: ExActor, delta: number) => void;
}

export class Behavior implements BehaviorArgs {
  running = false;
  condition?: (actor: ExActor) => boolean;
  callback: (actor: ExActor, engine: Engine, delta: number) => void;
  enterCallbackFn?: (actor: ExActor, delta: number) => void;
  exitCallbackFn?: (actor: ExActor, delta: number) => void;

  constructor({
    condition,
    enterCallback,
    callback,
    exitCallback,
  }: BehaviorArgs) {
    this.condition = condition;
    this.enterCallbackFn = enterCallback;
    this.callback = callback;
    this.exitCallbackFn = exitCallback;
  }

  enterCallback(actor: ExActor, delta: number) {
    this.running = true;
    if (this.enterCallbackFn) this.enterCallbackFn(actor, delta);
  }

  exitCallback(actor: ExActor, delta: number) {
    this.running = false;
    if (this.exitCallbackFn) this.exitCallbackFn(actor, delta);
  }
}
