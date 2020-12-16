export interface AnimSummary {
    id: string;
    lottieAssetPath?: string;
    lottieFilesUrl?: string;
    svgAssetPath?: string;
    loop?: boolean;
}

export const REWARD_ANIMATIONS: AnimSummary[] = [
    {
        id: "fireworks",
        loop: true,
        lottieAssetPath: "assets/lottie-animations/38474-firework-icon.json",
        lottieFilesUrl: "https://lottiefiles.com/38474-firework-icon"
    },
    {
        id: "trophy",
        loop: false,
        lottieAssetPath: "assets/lottie-animations/35683-trophy.json",
        lottieFilesUrl: "https://lottiefiles.com/35683-trophy"
    },
    {
        id: "waving",
        svgAssetPath: "assets/images/chat-characters/egg_character1.svg"
    },
    {
        id: "elder-waving",
        svgAssetPath: "assets/images/Elder_Large.svg"
    }
]