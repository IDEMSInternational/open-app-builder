export interface AppTheme {
    name: string;
    schemaVersion: number,
    author?: string;
    colors?: ThemeColors;
    booleans?: ThemeBooleans;
}

export interface ThemeBooleans {
    showCharacterInChat: boolean;
}

export const ionColorNames: (keyof ThemeColors)[] = ["primary", "secondary", "tertiary", "success",
    "warning", "danger", "dark", "medium", "light", "background"];

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
}

export function colorIdToCSSVarName(colorId: keyof ThemeColors) {
    if (ionColorNames.indexOf(colorId) > -1) {
        return "--ion-color-" + colorId;
    } else {
        switch (colorId) {
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
