import { getMaceAttackSkill } from "../../skills/maceAttackSkill";
import { Enemy, EnemyProps } from "../Enemy";

export class Blunt extends Enemy {
  constructor({ x, y, imageSource, name, hp }: EnemyProps) {
    super({ x, y, imageSource, name, hp });

    const skill = getMaceAttackSkill(imageSource);

    this.skills.push(skill);
  }
}