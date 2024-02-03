import { useEffect, useState } from "react";
import { SetupGameCanvas } from "./game/Game";
import { Level } from "./game/Level";

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
      {loaded && <Level />}
    </div>
  );
};
