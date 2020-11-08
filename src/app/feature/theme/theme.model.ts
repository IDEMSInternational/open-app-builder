export interface AppTheme {
    name: string;
    author?: string;
    colors?: ThemeColors;
    otherVariables?: ThemeVariable[];
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
}

export interface ThemeColor {
    id?: keyof ThemeColors;
    name: string;
    cssVarName?: string;
    lightValue?: string;
    darkValue?: string;
    description?: string;
}

export interface ThemeVariable {
    name: string;
    description?: string;
    type: "boolean" | "number";
    value: string;
}