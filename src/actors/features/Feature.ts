import { ExActor } from "@/actors/core/ExtendedActor";

interface FeatureArgs {
  key: string;
  actor: ExActor;
}

export class Feature {
  key: string;
  actor: ExActor;
  [key: string]: any;
  constructor({ key, actor }: FeatureArgs) {
    this.key = key;
    this.actor = actor;
  }
}
