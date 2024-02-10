import { Actor, Collider, CollisionContact, Color, Side } from "excalibur";

export interface HitBoxProps {
  x: number,
  y: number,
  width?: number,
  height?: number,
  radius?: number,
  hitTag: string[]
  damage: number;
}

export class HitBox extends Actor {
  damage: number;
  hitTag: string[] = [];
  constructor({ x, y, width, height, radius, hitTag, damage }: HitBoxProps) {
    super({
      x: x,
      y: y,
      color: Color.Red,
      width: width,
      height: height,
      radius: radius,
    });
    // this.graphics.opacity = DEBUG ? 0.5 : 0;
    this.hitTag = hitTag;
    this.damage = damage;
  }
  onCollisionStart(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
    if (other.owner.tags.some(tag => this.hitTag?.includes(tag))) {
      // @ts-ignore
      other.owner.handleTakeDamage && other.owner.handleTakeDamage(this.damage);
      // this.kill();
    }
  }
}