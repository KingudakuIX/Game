import { DemoMap } from "@/maps/DemoMap";
import { useEffect } from "react";

export const LevelDemo = () => {
  useEffect(() => {
    DemoMap();
  }, []);

  return null;
};
