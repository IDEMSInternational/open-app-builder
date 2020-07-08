export type FamilyMemberAgeRange = "baby" | "child" | "teen" | "adult";

export interface FamilyMember {
    name: string;
    age?: number; // Age in years
    ageRange: FamilyMemberAgeRange;
    avatarProperties: AvatarProperties;
}

export interface AvatarProperties {
    height?: number // Between 0.1 and 1
    bodyColor?: string; // Color of blob body
    hasGlasses?: boolean;
}