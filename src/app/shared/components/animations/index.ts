import { Component, Type } from "@angular/core";
import { RelaxAnim1Component } from "./relax1/relax-anim1";

export const ANIMATION_COMPONENTS = [
    RelaxAnim1Component
];

export interface AnimationMetadata {
    id: AnimationId;
    name: string;
    description?: string;
    component?: Type<Component>
    svgAssetPath?: string;
}

export type AnimationId = 
    "relax1"
    | "waving-blob1"
    | "elder-waving1"
    | "neighbour-jumping1";

export const ANIMATION_METADATA_BY_ID: Record<AnimationId, AnimationMetadata> = {
    "relax1": {
        id: "relax1",
        name: "Relaxing blob with rings 1 ",
        description: "Blue blub that's smiling with eyes closed whilst lighter blue rings of light expand in and out around it :)",
        component: RelaxAnim1Component
    },
    "waving-blob1": {
        id: "waving-blob1",
        name: "Waving blob 1",
        svgAssetPath: "assets/images/chat-characters/egg_character1.svg"
    },
    "elder-waving1": {
        id: "elder-waving1",
        name: "Elder blob waving 1",
        svgAssetPath: "assets/images/Elder_Large.svg"
    },
    "neighbour-jumping1": {
        id: "neighbour-jumping1",
        name: "Neighbour Jumping 1",
        svgAssetPath: "assets/images/anim-blobs/neighbour_large.svg"
    }
};