import { demonAnimations } from "@/data/characters/Demon";
import { mannequinAnimations } from "@/data/characters/Mannequin";

export enum GraphicKey {
  // Characters:
  mannequin,
  demon,
  // Props:

  // Others:
}

export const graphicMap = new Map();
graphicMap.set(GraphicKey.mannequin, mannequinAnimations);
graphicMap.set(GraphicKey.demon, demonAnimations);
