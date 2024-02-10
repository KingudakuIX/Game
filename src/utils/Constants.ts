import { Vector } from "excalibur";

export const SCALE = 1;
export const SCALE_VEC = new Vector(SCALE, SCALE);
export const CELL_SIZE = 16;

export const ANCHOR_CENTER = new Vector(0.5, 0.5);
export const ANCHOR_TOP_LEFT = new Vector(0, 0);

export const TAG_PLAYER = "TAG_PLAYER";
export const TAG_NPC = "TAG_NPC";
export const TAG_ENEMY = "TAG_ENEMY";

export const FPS = 6;

export const SPEED_IDLE = new Vector(0, 0);
export const SPEED_RIGHT = new Vector(1, 0);
export const SPEED_LEFT = new Vector(-1, 0);
export const SPEED_UP = new Vector(0, -1);
export const SPEED_DOWN = new Vector(0, 1);

export const DEBUG = true;
// export const DEBUG = {
// DEBUG_COLLISION: true,
// ...
// };

export const DYING = "dying";
export const MELEE_ATTACK = "melee_attack";
export const CAST_ATTACK = "melee_attack";