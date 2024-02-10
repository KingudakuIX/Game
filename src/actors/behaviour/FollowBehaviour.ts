import { FPS, SPEED_DOWN, SPEED_IDLE, SPEED_LEFT, SPEED_RIGHT, SPEED_UP } from "../../utils/Constants";
import { Direction } from "../../utils/InputManager";
import { Behaviour, ExtendedActor } from "../misc/Behaviour";

export const followBehaviour = () => {
  return new Behaviour({
    condition: (actor) => {
      return !actor.isDying && actor.actionAnimation === null && actor.target !== null;
    },
    callback: (actor, _, delta) => {
      followTarget(actor, delta);
      faceTarget(actor);
    },
    exitCallback: (actor) => {
      // Stop actor from moving and reset it's speed
      actor.vel = SPEED_IDLE;
      actor.moving = false;
    }
  });
}

const followTarget = (actor: ExtendedActor, delta: number) => {
  // Move towards the target point if far enough away
  const dest = actor.target.pos;
  const distance = Math.round(dest.distance(actor.pos));

  var vel = SPEED_IDLE.clone();
  if (distance > 40) {
    if (actor.pos.x < dest.x) {
      vel.addEqual(SPEED_RIGHT);
    }
    if (actor.pos.x > dest.x) {
      vel.addEqual(SPEED_LEFT);
    }
    if (actor.pos.y < dest.y) {
      vel.addEqual(SPEED_DOWN);
    }
    if (actor.pos.y > dest.y) {
      vel.addEqual(SPEED_UP);
    }
    actor.moving = true;
  } else {
    actor.moving = false;
  }
  actor.vel = actor.moving ? vel.normalize().scale(actor.speed * Math.floor(delta / FPS)) : vel;
}

const faceTarget = (actor: ExtendedActor) => {
  const pos = actor.target.pos;
  const xDiff = Math.abs(actor.pos.x - pos.x);
  const yDiff = Math.abs(actor.pos.y - pos.y);

  var direction;
  if (xDiff > yDiff) {
    direction = actor.pos.x > pos.x ? Direction.left : Direction.right;
  } else {
    direction = actor.pos.y > pos.y ? Direction.up : Direction.down;
  }
  actor.setDirection(direction);
}