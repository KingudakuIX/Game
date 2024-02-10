import { Animation, AnimationStrategy, Engine, ImageSource, SpriteSheet } from "excalibur";
import { Grid, generateFramesCoordinates } from "../../utils/Common";
import { HitBox, HitBoxProps } from "../misc/HitBox";

export interface EffectProps extends HitBoxProps {
  imageSource: ImageSource,
  initialPos: number,
  range: number[],
  frameDuration: number,
  rotation?: number,
  grid: Grid
}

export class BaseEffect extends HitBox {
  imageSource: ImageSource;
  grid: Grid;
  initialPos: number;
  range: number[];
  frameDuration: number;
  effectSprite: SpriteSheet | null = null;
  constructor({ imageSource, initialPos, range, frameDuration, rotation = 0, grid, ...props }: EffectProps) {
    super(props);
    this.imageSource = imageSource;
    this.grid = grid;
    this.initialPos = initialPos;
    this.range = range;
    this.frameDuration = frameDuration;
    this.rotation = rotation;
    this.z = 75;
  }
  onInitialize(engine: Engine): void {
    super.onInitialize(engine);
    // Load effect sprite:
    const effectSprite = SpriteSheet.fromImageSource({
      image: this.imageSource,
      grid: this.grid,
    });
    this.effectSprite = effectSprite;
    const animation = Animation.fromSpriteSheetCoordinates({
      spriteSheet: effectSprite,
      frameCoordinates: generateFramesCoordinates(
        "horizontal",
        this.initialPos,
        this.range,
        this.frameDuration
      ),
      strategy: AnimationStrategy.PingPong,
    })
    this.graphics.use(animation);
  }
}