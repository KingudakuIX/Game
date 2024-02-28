import { ANCHOR_TOP_LEFT, SCALE_VEC } from "@/utils/Constants";
import { Actor, Engine, ImageSource } from "excalibur";

interface MapProps {
  image: ImageSource;
}

export class Map extends Actor {
  constructor({ image }: MapProps) {
    super({
      anchor: ANCHOR_TOP_LEFT,
      scale: SCALE_VEC,
    });

    const mapSprite = image.toSprite();
    this.graphics.use(mapSprite);
  }
  onInitialize(_: Engine): void {}
}
