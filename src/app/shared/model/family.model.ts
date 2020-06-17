export interface FamilyMember {
    name: string;
    age?: number; // Age in years
    ageRange: "baby" | "child" | "teen" | "adult";
    avatarProperties?: AvatarProperties;
}

export interface AvatarProperties {
    height?: number // Between 0.1 and 1
    bodyColor?: string; // Color of blob body
    hasGlasses?: boolean;
}