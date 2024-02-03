import {
  Actor,
  CollisionType,
  Color,
  Engine,
  Shape,
  Text,
  Vector,
} from "excalibur";
import { SCALE_VEC } from "../utils/Constants";
import { Direction, inputManager } from "../utils/InputManager";
import { characterAnimations } from "./Animations";

const SPEED = 6;
const SPEED_IDLE = new Vector(0, 0);
const SPEED_RIGHT = new Vector(1, 0);
const SPEED_LEFT = new Vector(-1, 0);
const SPEED_UP = new Vector(0, -1);
const SPEED_DOWN = new Vector(0, 1);

export class Player extends Actor {
  moving = false;
  action = "idle";
  nameUi: Text | null = null;
  constructor(x: number, y: number) {
    super({
      x: x,
      y: y,
      width: 16,
      height: 16,
      collider: Shape.Box(16, 16),
      scale: SCALE_VEC,
      collisionType: CollisionType.Active,
      color: Color.Violet,
    });

    this.graphics.use(characterAnimations.idle.down);

    this.nameUi = new Text({
      text: "Player",
      color: Color.White,
      height: 32,
      width: 54,
    });
  }
  onPreUpdate(engine: Engine, delta: number): void {
    var vel = SPEED_IDLE.clone();
    if (inputManager.inputs.directions[Direction.up]) {
      vel.addEqual(SPEED_UP);
    }
    if (inputManager.inputs.directions[Direction.left]) {
      vel.addEqual(SPEED_LEFT);
    }
    if (inputManager.inputs.directions[Direction.down]) {
      vel.addEqual(SPEED_DOWN);
    }
    if (inputManager.inputs.directions[Direction.right]) {
      vel.addEqual(SPEED_RIGHT);
    }
    const moving = vel.x !== 0 || vel.y !== 0;
    this.vel = moving ? vel.normalize().scale(SPEED * delta) : vel;

    this.nameUi?.transform.setPosition(this.pos.x, this.pos.y);

    this.action = moving ? "walk" : "idle";
    this.handleAnimation();
  }
  handleAnimation() {
    if (inputManager.lastDirection) {
      // console.log(characterAnimations[this.action][inputManager.lastDirection]);
      this.graphics.use(
        characterAnimations[this.action][inputManager.lastDirection]
      );
    }
  }
}
