import { blunt01Animations } from "./blunt_01/Blunt01";
import { wizard01Animations } from "./wizard_01/Wizard01";

export const characterMap = new Map();

export enum CharacterKeys {
  wizard_01,
  blunt_01,
}

characterMap.set(CharacterKeys.wizard_01, wizard01Animations);
characterMap.set(CharacterKeys.blunt_01, blunt01Animations);
