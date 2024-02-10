import { Actor, Color, Engine, Vector } from "excalibur";

interface CollisionProps {
  x: number,
  y: number,
  width?: number,
  height?: number,
  radius?: number,
  offset?: Vector
}

export class Collision extends Actor {
  parentPos = new Vector(0, 0);
  offset: Vector;
  constructor({ x, y, width, height, radius, offset = new Vector(0, 0) }: CollisionProps) {
    super({
      x: x,
      y: y,
      color: Color.Red,
      width: width,
      height: height,
      radius: radius,
    });
    this.offset = offset;
    this.graphics.opacity = 0.5;
  }
  onPreUpdate(engine: Engine, delta: number): void {
    this.pos = this.parentPos.addEqual(this.offset);
  }
}