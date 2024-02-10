import { Actor, Collider, CollisionContact, Color, Engine, Side } from "excalibur";
import { DEBUG } from "../../utils/Constants";
import { Collision } from "./Collision";

export interface HitBoxProps {
  x: number,
  y: number,
  width?: number,
  height?: number,
  radius?: number,
  hitTag: string[]
  damage: number;
}

const _DEBUG = true;

const DEBUG_HITBOX = _DEBUG && DEBUG;

export class HitBox extends Actor {
  damage: number;
  hitTag: string[] = [];
  radius?: number;
  constructor({ x, y, width, height, radius, hitTag, damage }: HitBoxProps) {
    super({
      x: x,
      y: y,
      color: Color.Red,
      width: width,
      height: height,
      radius: radius,
    });
    this.hitTag = hitTag;
    this.damage = damage;
    this.radius = radius;
  }
  onInitialize(engine: Engine): void {
    if (DEBUG_HITBOX) {
      console.log("width", this.width)
      console.log("height", this.height)
      const collision = new Collision({
        x: this.pos.x,
        y: this.pos.y,
        width: this.width,
        height: this.height,
        radius: this.radius,
      });
      collision.z = this.z + 1;
      this.addChild(collision);
    }
  }
  onCollisionStart(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
    if (other.owner.tags.some(tag => this.hitTag?.includes(tag))) {
      // @ts-ignore
      other.owner.handleTakeDamage && other.owner.handleTakeDamage(this.damage);
      // this.kill();
    }
  }
}