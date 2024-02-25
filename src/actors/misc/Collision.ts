import { Actor, Color, Vector } from "excalibur";

interface CollisionProps {
  offset: Vector
  width?: number,
  height?: number,
  radius?: number,
}

export class Collision extends Actor {
  parentPos = new Vector(0, 0);
  constructor({ offset, width, height, radius }: CollisionProps) {
    super({
      x: offset.x,
      y: offset.y,
      color: Color.Red,
      width: width,
      height: height,
      radius: radius,
    });
    this.graphics.opacity = 0.5;
    this.z = 99999;
  }
}

// Utility for create new collision object
export const createCollision = ({ offset, width, height, radius }: CollisionProps) => {
  return new Collision({
    offset,
    width: width,
    height: height,
    radius: radius,
  });
}