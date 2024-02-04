export enum Direction {
  up = "up",
  down = "down",
  left = "left",
  right = "right",
}

interface Input {
  directions: { [direction: string]: boolean };
  // lastDirection: string;
  // lastPressedMovement: string | null;
}

const directionalKeys = ["w", "a", "s", "d"];

const getDirectionFromKey = (key: string) => {
  if (key === "w") return Direction.up;
  if (key === "a") return Direction.left;
  if (key === "s") return Direction.down;
  if (key === "d") return Direction.right;
  return "";
};

export class InputManager {
  inputs: Input = {
    directions: {
      up: false,
      left: false,
      down: false,
      rigth: false,
    },
  };
  directionsStack: string[] = [];
  lastDirection: string = "";
  constructor() { }
  enable() {
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      this.onKeyDown(e.key);
    });
    window.addEventListener("keyup", (e: KeyboardEvent) => {
      this.onKeyUp(e.key);
    });
  }
  disable() {
    window.removeEventListener("keydown", (e: KeyboardEvent) => {
      this.onKeyDown(e.key);
    });
    window.removeEventListener("keyup", (e: KeyboardEvent) => {
      this.onKeyUp(e.key);
    });
    // Stop all inputs:
    for (const direction in this.inputs.directions) {
      this.inputs.directions[direction] = false;
    }
  }
  onKeyDown(key: string) {
    // engine.input.keyboard.isHeld(ex.Input.Keys.ArrowRight)
    if (directionalKeys.includes(key)) {
      const direction = getDirectionFromKey(key);
      if (!this.inputs.directions[direction.toString()]) {
        this.inputs.directions[direction.toString()] = true;
        this.directionsStack.push(direction);
        if (this.lastDirection !== direction) {
          this.lastDirection = direction;
        }
      }
    }
  }
  onKeyUp(key: string) {
    if (directionalKeys.includes(key)) {
      const direction = getDirectionFromKey(key);
      this.inputs.directions[direction.toString()] = false;
      this.directionsStack = this.directionsStack.filter(
        (x) => x !== direction
      );
      if (this.lastDirection === direction) {
        this.lastDirection =
          this.directionsStack.length > 0
            ? this.directionsStack[this.directionsStack.length - 1]
            : this.lastDirection;
      }
    }
  }
}

export const inputManager = new InputManager();
