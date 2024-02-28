import { ExActor } from "@/actors/characters/ExtendedActor";

interface FeatureArgs {
  key: string;
  actor: ExActor;
  initFn?: (actor: ExActor) => void;
}

export class Feature {
  key: string;
  actor: ExActor;
  constructor({ key, actor, initFn }: FeatureArgs) {
    this.key = key;
    this.actor = actor;
    initFn && initFn(actor);
  }
}
