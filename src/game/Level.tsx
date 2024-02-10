import { Color } from "excalibur";
import { useEffect } from "react";
import { Blunt } from "../actors/Enemies/Blunt/Blunt";
import { EnemyArea, EnemyAreaGroup } from "../actors/Enemies/EnemyArea";
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

    const enemy = new Blunt({ x: 64, y: 64, imageSource: images.character_02, name: "Bruto", hp: 10 });
    // const enemy2 = new Blunt({ x: 164, y: 164, imageSource: images.character_02, name: "Bruto ferito", hp: 6 });
    // const enemy3 = new Blunt({ x: 264, y: 264, imageSource: images.character_02, name: "Bruto cattivo", hp: 10 });

    const enemyAreaInner = new EnemyArea({ radius: 100, color: Color.Orange });

    const enemyAreaOuter = new EnemyArea({ radius: 200 });

    new EnemyAreaGroup({
      enemies: [enemy],
      // enemies: [enemy, enemy2, enemy3],
      inner: enemyAreaInner,
      outer: enemyAreaOuter,
    })

    state.instance.add(enemy);
    // state.instance.add(enemy2);
    // state.instance.add(enemy3);

    state.instance.currentScene.world.queryManager.createQuery([TAG_PLAYER]);
    state.instance.currentScene.world.queryManager.createQuery([TAG_NPC]);

    state.instance.currentScene.camera.strategy.elasticToActor(
      player,
      0.05,
      0.4
    );

    state.instance.onPreDraw = () => {
      enemy.checkForZIndex(player.pos);
      // enemy2.checkForZIndex(player.pos);
      // enemy3.checkForZIndex(player.pos);
    }

    // start the game
    state.instance.start(loader);
  }, []);

  return null;
};
