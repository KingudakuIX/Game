import { Actor, Collider, CollisionContact, Color, Side } from "excalibur";
import { state } from "../../game/Game";
import { DEBUG, TAG_PLAYER } from "../../utils/Constants";
import { Enemy } from "./Enemy";

const _DEBUG = false;

const DEBUG_AREA = _DEBUG && DEBUG;

interface EnemyAreaGroupProps {
  enemies: Enemy[],
  inner: EnemyArea,
  outer: EnemyArea,
}

interface EnemyAreaProps {
  width?: number,
  height?: number,
  radius?: number
  color?: Color,
}

export class EnemyAreaGroup {
  constructor({ enemies, inner, outer }: EnemyAreaGroupProps) {
    inner.setEnemies(enemies);
    inner.enableCollisionStart = true;
    inner.z = 41;
    state.instance?.add(inner);

    outer.setEnemies(enemies);
    outer.enableCollisionEnd = true;
    outer.z = 40;
    state.instance?.add(outer);
  }
}

export class EnemyArea extends Actor {
  enemies: Enemy[] = [];
  enableCollisionStart = false;
  enableCollisionEnd = false;
  constructor({ width, height, radius, color = Color.Red }: EnemyAreaProps) {
    super({
      x: 244,
      y: 244,
      width: width,
      height: height,
      radius: radius,
      color: color,
    });
    this.graphics.opacity = DEBUG_AREA ? 0.5 : 0;
  }
  onCollisionStart(self: Collider, other: Collider, side: Side, contact: CollisionContact): void {
    if (!this.enableCollisionStart) return;
    if (other.owner.hasTag(TAG_PLAYER)) {
      this.enemies.forEach(enemy => {
        // @ts-ignore
        enemy.target = other.owner;
      })
    }
  }
  onCollisionEnd(self: Collider, other: Collider): void {
    if (!this.enableCollisionEnd) return;
    if (other.owner.hasTag(TAG_PLAYER)) {
      this.enemies.forEach(enemy => {
        enemy.target = null;
      })
    }
  }
  setEnemies(enemies: Enemy[]) {
    this.enemies = enemies;
  }
}