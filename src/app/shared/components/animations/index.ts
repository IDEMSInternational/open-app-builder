import { Component, Type } from "@angular/core";
import { RelaxAnim1Component } from "./relax1/relax-anim1";

export const ANIMATION_COMPONENTS = [
    RelaxAnim1Component
];

export interface AnimationMetadata {
    id: string;
    name: string;
    description?: string;
    component: Type<Component>
}

export const ANIMATION_METADATA_BY_ID: Record<string, AnimationMetadata> = {
    "relax1": {
        id: "relax1",
        name: "Relaxing blob with rings 1 ",
        description: "Blue blub that's smiling with eyes closed whilst lighter blue rings of light expand in and out around it :)",
        component: RelaxAnim1Component
    }
}