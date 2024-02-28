import { state } from "@/game/Game";
import { Direction } from "@/utils/InputManager";
import { Keys } from "excalibur";
import { Behaviour, ExtendedActor } from "./Behavior";
import { Skill } from "./SkillsBehaviour";

export const playerSkillsBehaviour = () => {
  return new Behaviour({
    condition: (actor) => {
      return !actor.isDying;
    },
    callback: (actor, engine, delta) => {
      if (!actor.actionAnimation) {
        var currentSkill: Skill | any = null;
        if (
          engine.input.keyboard.wasPressed(Keys.Num1) ||
          engine.input.keyboard.wasPressed(Keys.Numpad1) ||
          engine.input.keyboard.wasPressed(Keys.Key1)
        ) {
          currentSkill = actor.skills.find(
            (skill: Skill) => skill.key === "Num1"
          );
        }
        if (
          engine.input.keyboard.wasPressed(Keys.Num2) ||
          engine.input.keyboard.wasPressed(Keys.Numpad2) ||
          engine.input.keyboard.wasPressed(Keys.Key2)
        ) {
          currentSkill = actor.skills.find(
            (skill: Skill) => skill.key === "Num2"
          );
        }
        if (currentSkill && !currentSkill.isOnCooldown) {
          // Is a skill is a toggle type and it's currently active, i deactivate it instead of the default flow:
          if (currentSkill.toggle && currentSkill.isActive) {
            actor.removeAura(currentSkill.name);
            return;
          }
          // If the speel is a targeted one, check for mouse position and change character direction based on that:
          if (currentSkill.target) {
            actor.mousePos =
              state.instance!.input.pointers.primary.lastScreenPos;
            // Update player rotation based on mouse position:
            const rotation =
              Math.atan2(
                actor.mousePos.y - state.instance!.halfDrawHeight,
                actor.mousePos.x - state.instance!.halfDrawWidth
              ) + Math.PI;
            var direction = "";
            if (rotation <= Math.PI / 4 || rotation > Math.PI * 1.75) {
              direction = Direction.left;
            } else if (rotation > Math.PI / 4 && rotation <= Math.PI / 1.25) {
              direction = Direction.up;
            } else if (
              rotation > Math.PI / 1.25 &&
              rotation <= Math.PI * 1.25
            ) {
              direction = Direction.right;
            } else if (
              rotation > Math.PI * 1.25 &&
              rotation <= Math.PI * 1.75
            ) {
              direction = Direction.down;
            }
            actor.setDirection(direction);
            actor.forceDirection = true; // Avoid override of direction
          }
          currentSkill.isOnCooldown = true;
          // Set action animation:
          const actionAnimation = currentSkill.getActionAnimation(actor);
          actor.setActionAnimation(actionAnimation);
        }
        handleCooldown(actor, delta);
      }
    },
  });
};

const handleCooldown = (actor: ExtendedActor, delta: number) => {
  actor.skills.every((skill: Skill) => {
    if (skill.isOnCooldown) {
      console.log("skill.cooldown", skill.cooldown);
      skill.cooldownProgress += delta;
      if (skill.cooldownProgress > skill.cooldown) {
        skill.isOnCooldown = false;
        skill.cooldownProgress = 0;
      }
    }
  });
};
