import { ExActor } from "@/actors/core/ExtendedActor";
import { Feature } from "@/actors/features/Feature";
import { Features } from "@/data/Features";

/**
 * @description Track actor available skills
 */
export class SkillsFeature extends Feature {
  skills: Skill[] = [];
  constructor(actor: ExActor) {
    super({
      key: Features.stats,
      actor,
    });
  }
  addSkill(skill: Skill) {
    this.skills.push(skill);
  }
}
