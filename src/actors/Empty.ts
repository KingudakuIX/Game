import { Actor, Engine } from "excalibur";
import { DEBUG } from "../utils/Constants";
import { SpriteSequence } from "./animations/SpriteSequence";

const _DEBUG = false;

const DEBUG_EMPTY = _DEBUG && DEBUG;

export class Empty extends Actor {
  actionAnimation: SpriteSequence<any> | null = null;

  constructor() {
    super();
  }

  onInitialize(): void {
    if (DEBUG_EMPTY) {
      // const collision = new Collision(this.pos.x, this.pos.y, new Vector(0, 8));
      // collision.z = 200;
      // state.instance?.add(collision);
      // this.collision = collision;
    }
  }

  onPreUpdate(engine: Engine, delta: number): void {
    this.progressThroughActionAnimation(delta);
  }

  // Pass delta time into the actionAnimation looping this way the animation frames.
  progressThroughActionAnimation(delta: number) {
    if (this.actionAnimation) {
      this.actionAnimation.update(delta);
    }
  }
}
