import { Engine } from "excalibur";
import { TAG_PLAYER } from "../../../utils/Constants";
import { getMaceAttackSkill } from "../../skills/maceAttackSkill";
import { Enemy, EnemyProps } from "../Enemy";

export class Blunt extends Enemy {
  constructor({ x, y, characterKey, name, hp }: EnemyProps) {
    super({ x, y, characterKey, name, hp });
  }

  onInitialize(engine: Engine): void {
    super.onInitialize(engine);

    const skill = getMaceAttackSkill([TAG_PLAYER]);

    this.skills.push(skill);
  }
}
