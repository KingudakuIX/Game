import { useEffect } from "react";
import { Player } from "../actors/Player";
import { Map } from "../map/Map";
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

    state.instance.currentScene.camera.strategy.elasticToActor(
      player,
      0.05,
      0.4
    );

    // start the game
    state.instance.start(loader);
  }, []);

  return null;
};
