import { useEffect, useState } from "react";
import { SetupGameCanvas } from "./game/Game";
import { Level } from "./game/Level";
import Debug from "./ui/Debug";

export const App = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(SetupGameCanvas());
  }, []);

  return (
    <div className="w-screen h-screen grid place-content-center">
      <div className="w-[600px] h-[400px] m-auto">
        <canvas id="game" />
      </div>
      <div className="absolute top-2 left-2 flex flex-col gap-2">
        <div id="mouse_pos" className="rounded-sm p-4"></div>
        <div id="character_pos" className="rounded-sm p-4"></div>
        <div id="angle" className="rounded-sm p-4"></div>
        <div id="enemyCount" className="rounded-sm p-4"></div>
      </div>
      <div className="absolute top-2 right-2 flex flex-col gap-2 p-4">
        <Debug />
      </div>
      {loaded && <Level />}
    </div>
  );
};
