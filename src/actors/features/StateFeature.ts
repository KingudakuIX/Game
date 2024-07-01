import { ExActor } from "@/actors/core/ExtendedActor";
import { Feature } from "@/actors/features/Feature";
import { Features } from "@/data/Features";
import { state } from "@/game/Game";
import { Action, Direction } from "@/utils/Common";
import { Timer, coroutine } from "excalibur";

export interface State {
  action: Action;
  direction: Direction;
}

/**
 * @description Track current actor state, which includes current action, direction, etc...
 */
export class StateFeature extends Feature {
  action: Action;
  queueAction: Action | null = null;
  actionClock: Timer | null = null;
  direction: Direction;
  queueDirection: Direction | null = null;
  directionClock: Timer | null = null;
  isDead: boolean = false;
  isBusy: boolean = false; // Used to stop the actor from doing certain actions.
  directionPromise: Promise<any> | null = null;
  actionPromise: Promise<any> | null = null;
  // clock: StandardClock;
  constructor(actor: ExActor, state: State) {
    super({
      key: Features.state,
      actor,
    });

    const { action, direction } = state;
    this.action = action;
    this.direction = direction;

    // this.clock = new StandardClock({ maxFps: 30, tick: () => {} });
    // this.clock.start();
  }
  async setAction(action: Action) {
    if (this.actionPromise) {
      return;
    }
    var feature = this;
    var _action = action;
    this.actionPromise = coroutine(state.instance!, function* () {
      yield 100;
      feature.action = _action;
      feature.actionPromise = null;
    });
  }
  async setDirection(direction: Direction) {
    if (this.directionPromise) {
      return;
    }
    var feature = this;
    var _direction = direction;
    this.directionPromise = coroutine(state.instance!, function* () {
      yield 100;
      feature.direction = _direction;
      feature.directionPromise = null;
    });
  }
}
