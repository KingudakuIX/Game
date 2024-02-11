import { Collider, CollisionContact, Engine, Side } from "excalibur";
import {
  FPS,
  SPEED_DOWN,
  SPEED_IDLE,
  SPEED_LEFT,
  SPEED_RIGHT,
  SPEED_UP,
} from "../../utils/Constants";
import { Direction } from "../../utils/InputManager";
import { BaseEffect, EffectProps } from "./BaseEffect";

export interface ProjectileProps extends EffectProps {
  killOnHit?: boolean;
  duration: number;
  speed: number;
}

export class Projectile extends BaseEffect {
  speed = 0;
  direction: Direction | null = null;
  lifetimeProgress = 0;
  duration = 0;
  killOnHit = false;
  constructor({ speed, duration, killOnHit, ...props }: ProjectileProps) {
    super(props);
    this.speed = speed;
    this.duration = duration;
    this.killOnHit = killOnHit ?? false;
  }

  onInitialize(engine: Engine): void {
    super.onInitialize(engine);
  }

  onPreUpdate(engine: Engine, delta: number): void {
    super.onPreUpdate(engine, delta);

    var vel = SPEED_IDLE;
    switch (this.direction) {
      case Direction.up: {
        vel = SPEED_UP;
        this.rotation = -Math.PI / 2;
        break;
      }
      case Direction.left: {
        vel = SPEED_LEFT;
        this.graphics.flipHorizontal = true;
        break;
      }
      case Direction.down: {
        vel = SPEED_DOWN;
        this.rotation = Math.PI / 2;
        break;
      }
      case Direction.right: {
        vel = SPEED_RIGHT;
        break;
      }
    }
    this.vel = vel.normalize().scale(this.speed * Math.floor(delta / FPS));

    this.lifetimeProgress += delta;
    if (this.lifetimeProgress > this.duration) {
      this.kill();
    }
  }

  setDirection(direction: Direction) {
    this.direction = direction;
  }

  onCollisionStart(
    self: Collider,
    other: Collider,
    side: Side,
    contact: CollisionContact
  ): void {
    super.onCollisionStart(self, other, side, contact);
    if (
      this.killOnHit &&
      other.owner.tags.some((tag) => this.hitTag?.includes(tag))
    ) {
      this.kill();
    }
  }
}
