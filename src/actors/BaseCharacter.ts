import { Actor, CollisionType, Color, Engine, ImageSource, Shape, SpriteSheet } from "excalibur";
import { AnimationData, DYING, generateAnimationsFromFramesCoordinates } from "../utils/Common";
import { SCALE_VEC, SPEED_IDLE } from "../utils/Constants";
import { Direction } from "../utils/InputManager";
import { animationsFrames, getCharacterAnimation } from "./animations/CommonAnimations";
import { SpriteSequence } from "./animations/SpriteSequence";

// const SPEED = 6;
// const SPEED_IDLE = new Vector(0, 0);
// const SPEED_RIGHT = new Vector(1, 0);
// const SPEED_LEFT = new Vector(-1, 0);
// const SPEED_UP = new Vector(0, -1);
// const SPEED_DOWN = new Vector(0, 1);

export class BaseCharacter extends Actor {
  isDying = false;
  action = "idle";
  direction = Direction.down;
  spriteSheet: SpriteSheet;
  animations: AnimationData;
  actionAnimation: SpriteSequence<any> | null = null;
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

    const { characterSpriteSheet, characterAnimations } = getCharacterAnimation(imageSource);
    this.spriteSheet = characterSpriteSheet;
    this.animations = characterAnimations;

    // @ts-ignore
    this.graphics.use(this.animations.idle.down);
  }

  onPreUpdate(engine: Engine, delta: number): void {
    this.progressThroughActionAnimation(delta);
    this.handleAnimation();
  }

  handleAnimation() {
    // console.log("animation", this.action, this.direction);    
    if (!this.isDying) {
      // @ts-ignore
      const animation = this.animations[this.action][this.direction] ?? this.animations[this.action];
      this.graphics.use(animation);
    }
  }

  // Pass delta time into the actionAnimation looping this way the animation frames.
  progressThroughActionAnimation(delta: number) {
    if (this.actionAnimation) {
      this.vel = SPEED_IDLE;
      this.actionAnimation.update(delta);
    }
  }

  handleDying() {
    this.isDying = true;

    const dyingAnimationFrames = generateAnimationsFromFramesCoordinates(this.spriteSheet, animationsFrames.dying);

    this.actionAnimation = new SpriteSequence(
      DYING,
      dyingAnimationFrames.map(frame => {
        return {
          x: 0,
          y: 0,
          duration: frame.frameDuration ?? 0,
          callbackFn: (object: BaseCharacter, index: number) => {
            object.graphics.use(dyingAnimationFrames[index]);
          }
        }
      }),
      () => {
        this.graphics.use(dyingAnimationFrames[dyingAnimationFrames.length - 1]);
        this.actionAnimation = null;
      }
    );

    this.actionAnimation.actorObject = this;
  }

  setAction(action: string) {
    this.action = action;
  }

  setDirection(direction: Direction) {
    this.direction = direction;
  }
}
