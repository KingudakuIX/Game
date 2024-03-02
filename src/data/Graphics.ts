import { mannequinAnimations } from "@/data/characters/Mannequin";

export enum GraphicKey {
  // Characters:
  mannequin,
  // Props:

  // Others:
}

export const graphicMap = new Map();
graphicMap.set(GraphicKey.mannequin, mannequinAnimations);
