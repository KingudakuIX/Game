import { Actor, Color, Engine, Vector } from "excalibur";

export class Collision extends Actor {
  parentPos = new Vector(0, 0);
  offset: Vector;
  constructor(x: number, y: number, offset: Vector) {
    super({
      x: x,
      y: y,
      color: Color.Red,
      width: 16,
      height: 16,
    });
    this.offset = offset;
    this.graphics.opacity = 0.5;
  }
  onPreUpdate(engine: Engine, delta: number): void {
    this.pos = this.parentPos.addEqual(this.offset);
  }
}