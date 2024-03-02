import { ExActor } from "@/actors/core/ExtendedActor";
import { Feature } from "@/actors/features/Feature";
import { Features } from "@/data/Features";
import { Action, Direction } from "@/utils/Common";

export interface State {
  action: Action;
  direction: Direction;
}

/**
 * @description Track current actor state, which includes current action, direction, etc...
 */
export class StateFeature extends Feature {
  action: Action;
  direction: Direction;
  constructor(actor: ExActor, state: State) {
    super({
      key: Features.state,
      actor,
    });

    const { action, direction } = state;
    this.action = action;
    this.direction = direction;
  }
}
