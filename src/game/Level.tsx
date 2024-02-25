import { useEffect } from "react";
import { Enemy } from "../actors/Enemies/Enemy";
import { Player } from "../actors/Player";
import { Blunt } from "../actors/enemies/Blunt/Blunt";
import { CharacterKeys } from "../data/characters/Characters";
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
    state.dynamicEntities.push(player);

    var enemies: Enemy[] = [];

    const enemyCount = document.getElementById("enemyCount");

    setInterval(() => {
      if (enemies.length < 1) {
        const randX = Math.round(Math.random() * 1000) - 500;
        const randY = Math.round(Math.random() * 1000) - 500;
        const enemy = new Blunt({
          x: randX,
          y: randY,
          characterKey: CharacterKeys.blunt_01,
          name: `Bruto`,
          hp: 10,
        });
        enemy.target = player;
        state.instance && state.instance.add(enemy);
        enemies.push(enemy);
        state.dynamicEntities.push(enemy);

        if (enemyCount) {
          enemyCount.innerText = enemies.length.toString();
        }
      }
    }, 200)

    // for (var i = 0; i < 10; i++) {
    //   const randX = Math.round(Math.random() * 1000) - 500;
    //   const randY = Math.round(Math.random() * 1000) - 500;
    //   const enemy = new Blunt({
    //     x: randX,
    //     y: randY,
    //     characterKey: CharacterKeys.blunt_01,
    //     name: `Bruto ${i}`,
    //     hp: 10,
    //   });
    //   enemy.target = player;
    //   state.instance.add(enemy);
    //   enemies.push(enemy);
    //   state.dynamicEntities.push(enemy);
    // }

    // const enemy2 = new Blunt({
    //   x: -364,
    //   y: 164,
    //   imageSource: images.character_02,
    //   name: "Bruto ferito",
    //   hp: 6,
    // });
    // const enemy3 = new Blunt({
    //   x: 264,
    //   y: 264,
    //   imageSource: images.character_02,
    //   name: "Bruto cattivo",
    //   hp: 10,
    // });
    // enemy2.target = player;
    // enemy3.target = player;

    // const enemyAreaInner = new EnemyArea({ radius: 100, color: Color.Orange });

    // const enemyAreaOuter = new EnemyArea({ radius: 200 });

    // new EnemyAreaGroup({
    //   enemies: [enemy],
    //   // enemies: [enemy, enemy2, enemy3],
    //   inner: enemyAreaInner,
    //   outer: enemyAreaOuter,
    // })

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
      // enemies.forEach((enemy) => {
      //   enemy.checkForZIndex(player.pos);
      // });
    };

    // start the game
    state.instance.start(loader);
  }, []);

  return null;
};
