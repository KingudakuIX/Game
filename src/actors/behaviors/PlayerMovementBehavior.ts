import { Behavior } from "@/actors/behaviors/Behavior";
import { InputFeature } from "@/actors/features/InputFeature";
import { StateFeature } from "@/actors/features/StateFeature";
import { StatsFeature } from "@/actors/features/StatsFeature";
import { Features } from "@/data/Features";
import { Action, Direction } from "@/utils/Common";
import {
  SPEED_DOWN,
  SPEED_IDLE,
  SPEED_LEFT,
  SPEED_RIGHT,
  SPEED_UP,
} from "@/utils/Constants";
import { Vector } from "excalibur";

export class PlayerMovementBehavior extends Behavior {
  constructor() {
    super({
      condition: (actor) => {
        return !actor.isDying && !actor.actionAnimation;
      },
      callback: (actor) => {
        const inputManager = actor.getFeature<InputFeature>(Features.input);
        const stats = actor.getFeature<StatsFeature>(Features.stats);
        const state = actor.getFeature<StateFeature>(Features.state);
        if (!inputManager || !stats || !state) return;

        const { inputs, lastDirection } = inputManager;

        // console.log("Inputs", inputs.directions.right);

        var vel = getVel(inputs.directions, lastDirection);
        const moving = vel.x !== 0 || vel.y !== 0;
        actor.vel = moving ? vel.normalize().scale(stats.speed) : vel;

        state.action = moving ? Action.running : Action.idle;
        state.direction = getDirection(state.direction, vel);
      },
    });
  }
}

const getVel = (
  directions: { [key in Direction]: boolean },
  lastDirection?: Direction
) => {
  var vel = SPEED_IDLE.clone();
  if (directions[Direction.up] && lastDirection !== Direction.down) {
    vel.addEqual(SPEED_UP);
  }
  if (directions[Direction.left] && lastDirection !== Direction.right) {
    vel.addEqual(SPEED_LEFT);
  }
  if (directions[Direction.down] && lastDirection !== Direction.left) {
    vel.addEqual(SPEED_DOWN);
  }
  if (directions[Direction.right] && lastDirection !== Direction.up) {
    vel.addEqual(SPEED_RIGHT);
  }
  return vel;
};

const getDirection = (initialDirection: Direction, vel: Vector) => {
  var direction = initialDirection;
  if (vel.x === 1 && vel.y === 1) {
    direction = Direction.down_right;
  } else if (vel.x === 1 && vel.y === -1) {
    direction = Direction.up_right;
  } else if (vel.x === 1) {
    direction = Direction.right;
  } else if (vel.x === -1 && vel.y === 1) {
    direction = Direction.down_left;
  } else if (vel.x === -1 && vel.y === -1) {
    direction = Direction.up_left;
  } else if (vel.x === -1) {
    direction = Direction.left;
  } else if (vel.y === -1) {
    direction = Direction.up;
  } else {
    direction = Direction.down;
  }
  return direction;
};
