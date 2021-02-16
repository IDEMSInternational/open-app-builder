export interface AppTheme {
    name: string;
    editable: boolean;
    author?: string;
    colors?: ThemeColors;
    booleans?: ThemeBooleans;
}

export interface ThemeBooleans {
    showCharacterInChat: boolean;
}

export const ionColorNames: (keyof ThemeColors)[] = ["primary", "secondary", "tertiary", "success",
    "warning", "danger", "dark", "medium", "light"];

export interface ThemeColors {
    // Ionic Colors
    primary?: ThemeColor;
    secondary?: ThemeColor;
    tertiary?: ThemeColor;
    success?: ThemeColor;
    warning?: ThemeColor;
    danger?: ThemeColor;
    dark?: ThemeColor;
    medium?: ThemeColor;
    light?: ThemeColor;
    background?: ThemeColor;
    itemBackground?: ThemeColor;

    // Home screen buttons
    myJourneyButton?: ThemeColor;
    toolboxButton?: ThemeColor;
    myParentingMomentsButton?: ThemeColor;
    myPlansButton?: ThemeColor;
    helpMeNowButton?: ThemeColor;

    // Module colors
    ONE_ON_ONE_TIME?: ThemeColor;
    PRAISE_AND_POSITIVE_REINFORCEMENT?: ThemeColor;
    MANAGING_ANGER_AND_STRESS?: ThemeColor;
    FAMILY_BUDGETING?: ThemeColor;
    RULES_AND_ROUTINES?: ThemeColor;
    ACCEPTING_RESPONSIBILITY?: ThemeColor;
    PROBLEM_SOLVING?: ThemeColor;
    RISK_MAPPING_AND_DEALING_WITH_CRISIS?: ThemeColor;

    // Chat colors
    botMsgBubble?: ThemeColor;
    userMsgBubble?: ThemeColor;

    // Workshop templates
    templateActiveBg?: ThemeColor;
    templatePassiveBg?: ThemeColor;
}

export function colorIdToCSSVarName(colorId: keyof ThemeColors) {
    if (ionColorNames.indexOf(colorId) > -1) {
        return "--ion-color-" + colorId;
    } else {
        switch (colorId) {
            case "background": return "--ion-background-color";
            case "itemBackground": return "--ion-item-background";
            default: return "--theme-var-" + colorId;
        }
    }
}

export interface ThemeColor {
    id?: keyof ThemeColors;
    name: string;
    lightValue?: string;
    darkValue?: string;
    description?: string;
}
