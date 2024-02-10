import { Actor, Engine } from "excalibur";

export interface ExtendedActor extends Actor {
  [key: string]: any
}

interface IBehaviour {
  condition: (actor: ExtendedActor) => boolean,
  enterCallback?: (actor: ExtendedActor, delta: number) => void,
  callback: (actor: ExtendedActor, engine: Engine, delta: number) => void,
  exitCallback?: (actor: ExtendedActor, delta: number) => void,
}

export class Behaviour implements IBehaviour {
  running = false;
  _enterCallback: ((actor: ExtendedActor, delta: number) => void) | undefined;
  _exitCallback: ((actor: ExtendedActor, delta: number) => void) | undefined;
  constructor({ condition, enterCallback, callback, exitCallback }: IBehaviour) {
    this.condition = condition;
    this._enterCallback = enterCallback
    this.callback = callback;
    this._exitCallback = exitCallback;
  }

  condition: (actor: ExtendedActor) => boolean;

  callback: (actor: ExtendedActor, engine: Engine, delta: number) => void;

  enterCallback(actor: ExtendedActor, delta: number) {
    this.running = true;
    if (this._enterCallback) this._enterCallback(actor, delta);
  }

  exitCallback(actor: ExtendedActor, delta: number) {
    this.running = false;
    if (this._exitCallback) this._exitCallback(actor, delta);
  }
}