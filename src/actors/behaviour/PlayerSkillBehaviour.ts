import { Keys } from "excalibur";
import { Behaviour, ExtendedActor } from "../misc/Behaviour";
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
          console.log("Button 1 - pressed");
          currentSkill = actor.skills.find(
            (skill: Skill) => skill.key === "Num1"
          );
        }
        if (currentSkill && !currentSkill.isOnCooldown) {
          currentSkill.isOnCooldown = true;
          const actionAnimation = currentSkill.getActionAnimation(actor);
          console.log("actionAnimation", actionAnimation);
          actor.actionAnimation = actionAnimation;
        }
        handleCooldown(actor, delta);
      }
    },
  });
};

const handleCooldown = (actor: ExtendedActor, delta: number) => {
  actor.skills.every((skill: Skill) => {
    if (skill.isOnCooldown) {
      skill.cooldownProgress += delta;
      if (skill.cooldownProgress > skill.cooldown) {
        skill.isOnCooldown = false;
        skill.cooldownProgress = 0;
      }
    }
  });
};
