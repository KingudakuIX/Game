import { Engine } from "excalibur";
import { FPS, SPEED_DOWN, SPEED_IDLE, SPEED_LEFT, SPEED_RIGHT, SPEED_UP } from "../../utils/Constants";
import { Direction } from "../../utils/InputManager";
import { BaseEffect, EffectProps } from "./BaseEffect";

export interface ProjectileProps extends EffectProps {
  // vel: Vector
  speed: number;
}

export class Projectile extends BaseEffect {
  speed = 0;
  direction: Direction | null = null;
  constructor({ speed, ...props }: ProjectileProps) {
    super(props);
    this.speed = speed;
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
        break;
      }
      case Direction.left: {
        vel = SPEED_LEFT;
        break;
      }
      case Direction.down: {
        vel = SPEED_DOWN;
        break;
      }
      case Direction.right: {
        vel = SPEED_RIGHT;
        break;
      }
    }
    this.vel = vel.normalize().scale(this.speed * Math.floor(delta / FPS));
  }

  setDirection(direction: Direction) {
    this.direction = direction;
  }
}