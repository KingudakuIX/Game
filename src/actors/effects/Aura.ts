import { BaseEffect } from "@/actors/effects/BaseEffect";

export interface AuraProps {
  name: string;
  effect: BaseEffect;
}

export class Aura {
  name: string;
  constructor({
    name,
    effect
  }: AuraProps) {
    this.name = name;
  }
}