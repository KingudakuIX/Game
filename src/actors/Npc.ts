import { Engine, ImageSource, Vector } from "excalibur";
import { TAG_NPC } from "../utils/Constants";
import { BaseCharacter } from "./BaseCharacter";

export class Npc extends BaseCharacter {
  constructor(x: number, y: number, imageSource: ImageSource) {
    super(x, y, imageSource);
  }

  onInitialize(engine: Engine): void {
    super.onInitialize(engine);
    // Periodically query for a new target
    // void this.queryForZIndex();
    this.addTag(TAG_NPC);
  }

  onPreUpdate(engine: Engine, delta: number): void {
    super.onPreUpdate(engine, delta);
  }

  async queryForZIndex() {
    // const playerQuery = this.scene.world.queryManager.getQuery([
    //   TAG_PLAYER,
    // ]);
    // if (playerQuery) {
    //   const player = playerQuery.getEntities()[0];
    //   if (player) {
    //     // @ts-ignore
    //     console.log("player position", player.pos)
    //     console.log("npc position", this.pos)
    //     // @ts-ignore
    //     if (player.pos.y > this.pos.y) { this.z = 49 } else { this.z = 51 }
    //   }

    //   await this.actions.delay(1500).toPromise();
    //   void this.queryForZIndex();
    // }
  }

  checkForZIndex(playerPos: Vector) {
    this.z = playerPos.y > this.pos.y ? 49 : 51;
  }
}
