import { useEffect } from "react";
import { Enemy } from "../actors/Enemies/Enemy";
import { EnemyArea } from "../actors/Enemies/EnemyArea";
import { Player } from "../actors/Player";
import { Map } from "../map/Map";
import { TAG_NPC, TAG_PLAYER } from "../utils/Constants";
import { inputManager } from "../utils/InputManager";
import { state } from "./Game";
import { images, loader } from "./Resources";

export const Level = () => {
  useEffect(() => {
    if (!state.instance) return;

    inputManager.enable();

    // add map to game
    const map = new Map({
      x: 0,
      y: 0,
      image: images.backgroundImage,
      objects: [],
      limits: [],
    });
    state.instance.add(map);

    // add player to game
    const player = new Player(32, 32);
    state.instance.add(player);

    const enemy = new Enemy({ x: 64, y: 64, imageSource: images.character_02, name: "Bruto", hp: 10 });

    const enemyArea = new EnemyArea({ enemies: [enemy] });

    state.instance.add(enemy);
    state.instance.add(enemyArea);

    state.instance.currentScene.world.queryManager.createQuery([TAG_PLAYER]);
    state.instance.currentScene.world.queryManager.createQuery([TAG_NPC]);

    state.instance.currentScene.camera.strategy.elasticToActor(
      player,
      0.05,
      0.4
    );

    state.instance.onPreDraw = () => {
      enemy.checkForZIndex(player.pos);
    }

    // start the game
    state.instance.start(loader);
  }, []);

  return null;
};
