import { Engine } from "excalibur";
import { getMaceAttackSkill } from "../../skills/maceAttackSkill";
import { Enemy, EnemyProps } from "../Enemy";

export class Blunt extends Enemy {
  constructor({ x, y, imageSource, name, hp }: EnemyProps) {
    super({ x, y, imageSource, name, hp });
  }

  onInitialize(engine: Engine): void {
    super.onInitialize(engine);

    const skill = getMaceAttackSkill(this.imageSource);

    this.skills.push(skill);
  }
}