import { Actor, CollisionType, Color, Engine, ImageSource, Shape } from "excalibur";
import { AnimationData } from "../utils/Common";
import { SCALE_VEC } from "../utils/Constants";
import { Direction } from "../utils/InputManager";
import { getCharacterAnimation } from "./animations/CommonAnimations";

// const SPEED = 6;
// const SPEED_IDLE = new Vector(0, 0);
// const SPEED_RIGHT = new Vector(1, 0);
// const SPEED_LEFT = new Vector(-1, 0);
// const SPEED_UP = new Vector(0, -1);
// const SPEED_DOWN = new Vector(0, 1);

export class BaseCharacter extends Actor {
  action = "idle";
  direction = Direction.down;
  animations: AnimationData;
  constructor(x: number, y: number, imageSource: ImageSource) {
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

    this.animations = getCharacterAnimation(imageSource);

    // @ts-ignore
    this.graphics.use(this.animations.idle.down);
  }

  onPreUpdate(engine: Engine, delta: number): void {
    this.handleAnimation();
  }

  handleAnimation() {
    // @ts-ignore
    this.graphics.use(this.animations[this.action][this.direction]);
  }
}
