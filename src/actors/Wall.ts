import { Actor, CollisionType, Color, Shape, Vector } from "excalibur";
import { ANCHOR_TOP_LEFT, CELL_SIZE, SCALE, SCALE_VEC } from "../utils/Constants";

export class Wall extends Actor {
  constructor(x: number, y: number, cols: number, rows: number) {
    super({
      width: CELL_SIZE * cols,
      height: CELL_SIZE * rows,
      pos: new Vector(x * CELL_SIZE * SCALE, y * CELL_SIZE * SCALE),
      scale: SCALE_VEC,
      anchor: ANCHOR_TOP_LEFT,
      collider: Shape.Box(CELL_SIZE * cols, CELL_SIZE * rows, Vector.Zero),
      collisionType: CollisionType.Fixed,
      color: Color.Green,
    });
    // this.graphics.opacity = 0.0;
  }
}
