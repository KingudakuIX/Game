import { Actor, Animation, SpriteSheet } from "excalibur";
import { images } from "../../game/Resources";

const heartSprite = SpriteSheet.fromImageSource({
  image: images.heart,
  grid: {
    columns: 1,
    rows: 1,
    spriteWidth: 13,
    spriteHeight: 12,
  },
});

export class Heart extends Actor {
  constructor() {
    super();

    this.graphics.use(Animation.fromSpriteSheet(heartSprite, [0], 100));
    this.z = 101;
  }
}