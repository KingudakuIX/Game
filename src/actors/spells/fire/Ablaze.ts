import { AnimationKeys, animationsMap } from "../../../data/FixedAnimations";
import { BaseCharacter } from "../../BaseCharacter";
import { Empty } from "../../Empty";
import { SpriteSequence } from "../../animations/SpriteSequence";

export const createAblaze = () => {
  const ablaze = new Empty();
  const ablazeFrames = animationsMap.get(AnimationKeys.ablaze_01);
  ablaze.actionAnimation = new SpriteSequence(
    "EXPLOSION",
    Array.from(new Array(18)).map((_) => {
      return {
        duration: 100,
        callbackFn: (object: BaseCharacter, index: number) => {
          // Repeat the animation every 6th index.
          const idx = index % 6;
          object.graphics.use(ablazeFrames[idx]);
        },
      };
    }),
    () => {
      // At the end of the animation clear the object.
      ablaze.kill();
    }
  );
  ablaze.actionAnimation.actorObject = ablaze;
  return ablaze;
};
