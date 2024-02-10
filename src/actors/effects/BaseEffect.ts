import { Animation, ImageSource, SpriteSheet } from "excalibur";
import { Grid, generateFramesCoordinates } from "../../utils/Common";
import { HitBox, HitBoxProps } from "../misc/HitBox";

interface EffectProps extends HitBoxProps {
  imageSource: ImageSource,
  initialPos: number,
  range: number[],
  frameDuration: number,
  rotation: number,
  grid: Grid
}

export class BaseEffect extends HitBox {
  effectSprite: SpriteSheet;
  constructor({ imageSource, initialPos, range, frameDuration, rotation, grid, ...props }: EffectProps) {
    super(props);
    // Load effect sprite:
    const effectSprite = SpriteSheet.fromImageSource({
      image: imageSource,
      grid: grid,
    });
    this.effectSprite = effectSprite;
    const animation = Animation.fromSpriteSheetCoordinates({
      spriteSheet: effectSprite,
      frameCoordinates: generateFramesCoordinates(
        "horizontal",
        initialPos,
        range,
        frameDuration
      ),
    })
    this.graphics.use(animation);
    this.rotation = rotation;
    this.z = 75;
  }
}