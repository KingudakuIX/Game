import { Aura, AuraProps } from "@/actors/effects/Aura";
import {
  Actor,
  CollisionType,
  Color,
  Engine,
  Shape,
  SpriteSheet,
  Vector,
} from "excalibur";
import { CharacterKeys, characterMap } from "../data/characters/Characters";
import { state } from "../game/Game";
import { AnimationData } from "../utils/Common";
import { SCALE_VEC, SPEED_IDLE } from "../utils/Constants";
import { Direction } from "../utils/InputManager";
import { SpriteSequence } from "./animations/SpriteSequence";
import { Behaviour } from "./behaviors/Behavior";
import { Skill } from "./behaviors/SkillsBehaviour";
import { Collision, createCollision } from "./misc/Collision";

export class BaseCharacter extends Actor {
  isDying = false;
  isPain = false;
  action = "idle";
  direction = Direction.down;
  spriteSheet: SpriteSheet | null = null;
  animations: AnimationData | null = null;
  protected actionAnimation: SpriteSequence<any> | null = null;
  collision: Collision | null = null;
  behaviours: Behaviour[] = [];
  skills: Skill[] = [];
  characterName = "";
  characterKey: CharacterKeys;
  auras: Aura[] = [];

  constructor(x: number, y: number, characterKey: CharacterKeys) {
    super({
      x: x,
      y: y,
      collider: Shape.Box(24, 24, undefined, new Vector(0, 8)),
      scale: SCALE_VEC,
      collisionType: CollisionType.Active,
      color: Color.Violet,
    });
    this.characterKey = characterKey;
  }

  onInitialize(engine: Engine): void {
    this.animations = characterMap.get(this.characterKey);

    // @ts-ignore
    this.graphics.use(this.animations.idle.down);

    this.graphics.onPreDraw = async (ctx, delta) => {
      ctx.tint = this.isPain ? Color.Red : Color.White;
    };

    if (state.debug.collision) {
      const collision = createCollision({
        offset: new Vector(0, 8),
        width: this.width,
        height: this.height,
      });
      state.instance?.add(collision);
      this.collision = collision;
    }
  }

  onPreUpdate(engine: Engine, delta: number): void {
    if (this.actionAnimation) {
      this.body.collisionType = CollisionType.Fixed;
    } else {
      this.body.collisionType = CollisionType.Active;
    }

    const camera = engine.currentScene.camera;
    // Check if the actor is off-screen
    if (
      camera.viewport.left <= this.pos.x &&
      camera.viewport.right >= this.pos.x &&
      camera.viewport.top <= this.pos.y &&
      camera.viewport.bottom >= this.pos.y
    ) {
      this.graphics.visible = true;
    } else {
      this.graphics.visible = false;
    }

    this.progressThroughActionAnimation(delta);

    this.handleAnimation();

    this.behaviours.forEach((behaviour) => {
      if (behaviour.condition(this)) {
        if (!behaviour.running) behaviour.enterCallback(this, delta);
        behaviour.callback(this, engine, delta);
      } else if (behaviour.running && behaviour.exitCallback) {
        behaviour.exitCallback(this, delta);
      }
    });

    if (state.debug.collision && !this.collision) {
      const collision = createCollision({
        offset: new Vector(0, 8),
        width: this.width,
        height: this.height,
      });
      this.addChild(collision);
      this.collision = collision;
    }

    if (!state.debug.collision) {
      this.collision?.kill();
      this.collision = null;
    }
  }

  handleAnimation() {
    if (!this.isDying && !this.actionAnimation) {
      const animation =
        // @ts-ignore
        this.animations[this.action][this.direction] ??
        // @ts-ignore
        this.animations[this.action];
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

  setActionAnimation<T>(actionAnimation: SpriteSequence<T>) {
    // Execute the cleanUpFn if the current SpriteSequence have one.
    if (this.actionAnimation && this.actionAnimation.cleanUpFn) {
      this.actionAnimation.cleanUpFn();
    }
    this.actionAnimation = actionAnimation;
  }

  setAction(action: string) {
    this.action = action;
  }

  setDirection(direction: Direction) {
    this.direction = direction;
  }

  addAura(aura: AuraProps) {
    this.auras.push(new Aura(aura));
  }

  removeAura(auraName: string) {
    this.auras = this.auras.filter((aura) => aura.name !== auraName);
  }
}
