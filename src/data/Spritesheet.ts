import { SpriteSheet } from "excalibur";
import { images } from "../game/Resources";

export const spritesMap = new Map();

// Available sprites:

export enum SpriteKeys {
  // Characters:
  mannequin,

  wizard_01,
  blunt_01,
  blunt_01_big,
  // Fx:
  impact_01,
  flame_01,
}

// Generate spritesheets from images:

const character01SS = SpriteSheet.fromImageSource({
  image: images.character_01,
  grid: {
    columns: 13,
    rows: 21,
    spriteWidth: 64,
    spriteHeight: 64,
  },
});
const blunt01SS = SpriteSheet.fromImageSource({
  image: images.character_02,
  grid: {
    columns: 13,
    rows: 21,
    spriteWidth: 64,
    spriteHeight: 64,
  },
});
const blunt01BigSS = SpriteSheet.fromImageSource({
  image: images.character_02,
  grid: {
    columns: 6,
    rows: 11,
    spriteHeight: 192,
    spriteWidth: 192,
  },
});
const impactSS = SpriteSheet.fromImageSource({
  image: images.impact_01,
  grid: {
    columns: 6,
    rows: 24,
    spriteWidth: 32,
    spriteHeight: 32,
  },
});
const fireEffectsSS = SpriteSheet.fromImageSource({
  image: images.flame_01,
  grid: {
    columns: 9,
    rows: 30,
    spriteWidth: 64,
    spriteHeight: 64,
  },
});

// Update spritesheets mapping:

spritesMap.set(SpriteKeys.wizard_01, character01SS);
spritesMap.set(SpriteKeys.blunt_01, blunt01SS);
spritesMap.set(SpriteKeys.blunt_01_big, blunt01BigSS);

spritesMap.set(SpriteKeys.impact_01, impactSS);
spritesMap.set(SpriteKeys.flame_01, fireEffectsSS);
