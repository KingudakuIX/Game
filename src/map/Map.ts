import { Actor, Engine, ImageSource, Vector } from "excalibur";
import { SCALE_VEC } from "../utils/Constants";

interface MapProps {
  x: number;
  y: number;
  image: ImageSource;
  objects: any[];
  limits: number[];
}

export class Map extends Actor {
  objects: any[] = [];
  constructor({ x, y, image, objects, limits }: MapProps) {
    super({
      pos: new Vector(x, y),
      scale: SCALE_VEC,
    });

    this.objects = objects;

    const mapSprite = image.toSprite();
    this.graphics.use(mapSprite);
  }

  onInitialize(engine: Engine): void {
    // Loop through each game objects such as enemies, pickable, etc...
    this.objects.forEach((obj) => {});
  }
}
