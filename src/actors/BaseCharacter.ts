import { Actor, CollisionType, Color, Engine, ImageSource, Shape, SpriteSheet, Vector } from "excalibur";
import { AnimationData } from "../utils/Common";
import { DEBUG, SCALE_VEC, SPEED_IDLE } from "../utils/Constants";
import { Direction } from "../utils/InputManager";
import { getCharacterAnimation } from "./animations/CommonAnimations";
import { SpriteSequence } from "./animations/SpriteSequence";
import { Skill } from "./behaviour/SkillsBehaviour";
import { Behaviour } from "./misc/Behaviour";
import { Collision } from "./misc/Collision";

const _DEBUG = false;

const DEBUG_CHARACTER = _DEBUG && DEBUG;

export class BaseCharacter extends Actor {
  isDying = false;
  isPain = false;
  action = "idle";
  direction = Direction.down;
  spriteSheet: SpriteSheet | null = null;
  animations: AnimationData | null = null;
  actionAnimation: SpriteSequence<any> | null = null;
  collision: Collision | null = null;
  behaviours: Behaviour[] = [];
  skills: Skill[] = [];
  characterName = "";
  imageSource: ImageSource;

  constructor(x: number, y: number, imageSource: ImageSource) {
    super({
      x: x,
      y: y,
      collider: Shape.Box(16, 16, undefined, new Vector(0, 8)),
      scale: SCALE_VEC,
      collisionType: CollisionType.Active,
      color: Color.Violet,
    });

    this.imageSource = imageSource;
  }

  onInitialize(engine: Engine): void {
    const { characterSpriteSheet, characterAnimations } = getCharacterAnimation(this.imageSource);
    this.spriteSheet = characterSpriteSheet;
    this.animations = characterAnimations;

    // @ts-ignore
    this.graphics.use(this.animations.idle.down);

    this.graphics.onPreDraw = async (ctx, delta) => {
      ctx.tint = this.isPain ? Color.Red : Color.White;
    }

    if (DEBUG_CHARACTER) {
      // const collision = new Collision(this.pos.x, this.pos.y, new Vector(0, 8));
      // collision.z = 200;
      // state.instance?.add(collision);
      // this.collision = collision;
    }
  }

  onPreUpdate(engine: Engine, delta: number): void {
    this.progressThroughActionAnimation(delta);

    this.handleAnimation();

    this.behaviours.forEach((behaviour) => {
      if (behaviour.condition(this)) {
        if (!behaviour.running) behaviour.enterCallback(this, delta);
        behaviour.callback(this, engine, delta);
      }
      else if (behaviour.running && behaviour.exitCallback) {
        behaviour.exitCallback(this, delta);
      }
    })

    if (DEBUG_CHARACTER && this.collision) {
      this.collision.parentPos = this.pos.clone();
    }
  }

  handleAnimation() {
    if (!this.isDying && !this.actionAnimation) {
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

  setAction(action: string) {
    this.action = action;
  }

  setDirection(direction: Direction) {
    this.direction = direction;
  }
}
