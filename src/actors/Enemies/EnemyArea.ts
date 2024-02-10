import { Actor, Collider, CollisionContact, Color, Shape, Side } from "excalibur";
import { TAG_PLAYER } from "../../utils/Constants";
import { Enemy } from "./Enemy";

interface EnemyAreaProps {
  enemies: Enemy[]
}

export class EnemyArea extends Actor {
  enemies: Enemy[];
  constructor({ enemies }: EnemyAreaProps) {
    super({
      x: 244,
      y: 244,
      // width: 200,
      // height: 200,
      radius: 200,
      color: Color.Blue,
      collider: Shape.Circle(200),
    });

    this.enemies = enemies;

    // this.enemies.forEach(enemy => {
    //   this.addChild(enemy);
    // });
  }
  onCollisionStart(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
    if (other.owner.hasTag(TAG_PLAYER)) {
      console.log("Start follow player")
      this.enemies.forEach(enemy => {
        // @ts-ignore
        enemy.target = other.owner;
      })
      // if (evt.other.isUsed) {
      //   return;
      // }
      // evt.other.onDamagedSomething();
      // this.takeDamage(evt.other.direction);
    }
    // else {
    //   this.events.emit(`UNFOLLOW_PLAYER_${this.guid}`);
    // }
  }
  onCollisionEnd(self: Collider, other: Collider): void {
    if (other.owner.hasTag(TAG_PLAYER)) {
      console.log("Stop following player")
      this.enemies.forEach(enemy => {
        // @ts-ignore
        enemy.target = null;
      })
      // if (evt.other.isUsed) {
      //   return;
      // }
      // evt.other.onDamagedSomething();
      // this.takeDamage(evt.other.direction);
    }
  }
}