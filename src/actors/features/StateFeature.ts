import { ExActor } from "@/actors/core/ExtendedActor";
import { Feature } from "@/actors/features/Feature";
import { Features } from "@/data/Features";
import { Action, Direction } from "@/utils/Common";
import { Timer } from "excalibur";

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
    // if (action === this.queueAction) return;
    // this.queueAction = action;
    this.action = action;
    // await this.actor.actions.delay(300).toPromise();
    // this.action = this.queueAction;
    // this.clock.schedule(() => {
    //   this.action = this.queueAction!;
    // }, 300);
  }
  async setDirection(direction: Direction) {
    // if (direction === this.queueDirection) return;
    // this.queueDirection = direction;
    this.direction = direction;
    // console.log("queueDirection", direction);
    // await this.actor.actions.delay(300).toPromise();
    // this.direction = this.queueDirection;
    // this.clock.schedule(() => {
    //   console.log("schedule - queueDirection", this.queueDirection);
    //   this.direction = this.queueDirection!;
    // }, 300);
  }
}
