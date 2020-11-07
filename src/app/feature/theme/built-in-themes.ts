import { AppTheme } from './theme.model';

export const DEFAULT_THEME: AppTheme = {
    name: "PLH Teens Default",
    colors: {
        primary: {
            name: "Primary",
            lightValue: "#0d4060",
            darkValue: "#0d4060"
        },
        secondary: {
            name: "Secondary",
            lightValue: "#f3d668",
            darkValue: "#f3d668"
        },
        tertiary: {
            name: "Tertiary",
            lightValue: "#00a1cd",
            darkValue: "#00a1cd"
        },
        success: {
            name: "Success",
            lightValue: "#2dd36f",
            darkValue: "#2dd36f"
        },
        warning: {
            name: "Warning",
            lightValue: "#ffc409",
            darkValue: "#ffc409"
        },
        danger: {
            name: "Danger",
            lightValue: "#eb445a",
            darkValue: "#eb445a"
        },
        dark: {
            name: "Dark",
            lightValue: "#222428",
            darkValue: "#222428"
        },
        medium: {
            name: "Medium",
            lightValue: "#92949c",
            darkValue: "#92949c"
        },
        light: {
            name: "Light",
            lightValue: "#f4f5f8",
            darkValue: "#f4f5f8"
        }
    }
};

export const THEME_2: AppTheme = {
    name: "PLH Teens 2",
    colors: {
        primary: {
            name: "Primary",
            lightValue: "#ff4060",
            darkValue: "#ff4060"
        },
        secondary: {
            name: "Secondary",
            lightValue: "#f3d668",
            darkValue: "#f3d668"
        },
        tertiary: {
            name: "Tertiary",
            lightValue: "#00a1cd",
            darkValue: "#00a1cd"
        },
        success: {
            name: "Success",
            lightValue: "#2dd36f",
            darkValue: "#2dd36f"
        },
        warning: {
            name: "Warning",
            lightValue: "#ffc409",
            darkValue: "#ffc409"
        },
        danger: {
            name: "Danger",
            lightValue: "#eb445a",
            darkValue: "#eb445a"
        },
        dark: {
            name: "Dark",
            lightValue: "#222428",
            darkValue: "#222428"
        },
        medium: {
            name: "Medium",
            lightValue: "#92949c",
            darkValue: "#92949c"
        },
        light: {
            name: "Light",
            lightValue: "#f4f5f8",
            darkValue: "#f4f5f8"
        }
    }
};

export const BUILT_IN_THEMES = [DEFAULT_THEME, THEME_2];