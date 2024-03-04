import { ExActor } from "@/actors/core/ExtendedActor";
import { Feature } from "@/actors/features/Feature";
import { Features } from "@/data/Features";
import { Direction } from "@/utils/Common";
import { Engine, KeyEvent } from "excalibur";

interface Input {
  directions: { [key in Direction]: boolean };
}

const directionalKeys = ["KeyW", "KeyA", "KeyS", "KeyD"];

const getDirectionFromKey = (key: string) => {
  if (key === "KeyW") return Direction.up;
  if (key === "KeyA") return Direction.left;
  if (key === "KeyS") return Direction.down;
  if (key === "KeyD") return Direction.right;
};

/**
 * @description Track current actor state, which includes current action, direction, etc...
 */
export class InputFeature extends Feature {
  inputs: Input = {
    directions: {
      up: false,
      up_right: false,
      right: false,
      down_right: false,
      down: false,
      down_left: false,
      left: false,
      up_left: false,
    },
  };
  directionsStack: Direction[] = [];
  lastDirection?: Direction;

  constructor(actor: ExActor, engine: Engine) {
    super({
      key: Features.state,
      actor,
    });

    engine.input.keyboard.on("press", (event) =>
      this.onKeyboardDown(event, this)
    );
    engine.input.keyboard.on("release", (event) =>
      this.onKeyboardUp(event, this)
    );
  }

  onKeyboardDown(event: KeyEvent, feature: InputFeature) {
    if (directionalKeys.includes(event.key)) {
      const direction = getDirectionFromKey(event.key);
      if (!direction) return;
      if (!feature.inputs.directions[direction]) {
        feature.inputs.directions[direction] = true;
        feature.directionsStack.push(direction);
        if (feature.lastDirection !== direction) {
          feature.lastDirection = direction;
        }
      }
    }
  }

  onKeyboardUp(event: KeyEvent, feature: InputFeature) {
    if (directionalKeys.includes(event.key)) {
      const direction = getDirectionFromKey(event.key);
      if (!direction) return;
      feature.inputs.directions[direction] = false;
      feature.directionsStack = feature.directionsStack.filter(
        (x) => x !== direction
      );
      if (feature.lastDirection === direction) {
        feature.lastDirection =
          feature.directionsStack.length > 0
            ? feature.directionsStack[feature.directionsStack.length - 1]
            : feature.lastDirection;
      }
    }
  }
}
