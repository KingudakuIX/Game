import { Engine, Vector } from "excalibur";
import { CharacterKeys } from "../data/characters/Characters";
import { TAG_NPC } from "../utils/Constants";
import { BaseCharacter } from "./BaseCharacter";
import { Label } from "./Label";

export class Npc extends BaseCharacter {
  label: Label | null = null;
  constructor(x: number, y: number, characterKey: CharacterKeys) {
    super(x, y, characterKey);
  }

  onInitialize(engine: Engine): void {
    super.onInitialize(engine);
    this.addTag(TAG_NPC);

    // const label = new Label(this.characterName);
    // label.pos.y = -30;
    // this.label = label;
    // this.addChild(label);
  }

  onPreUpdate(engine: Engine, delta: number): void {
    super.onPreUpdate(engine, delta);
  }

  checkForZIndex(playerPos: Vector) {
    if (this.isDying) {
      this.z = 49;
      return;
    }
    this.z = playerPos.y > this.pos.y ? 49 : 51;
  }
}
