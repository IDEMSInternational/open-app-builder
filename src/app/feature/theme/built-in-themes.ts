import { AppTheme } from './theme.model';

export const BASE_THEME: AppTheme = {
    name: "PLH Teens Default",
    editable: false,
    colors: {
        primary: {
            id: "primary",
            name: "Primary",
            lightValue: "#0d4060",
            darkValue: "#0d4060"
        },
        secondary: {
            id: "secondary",
            name: "Secondary",
            lightValue: "#f3d668",
            darkValue: "#f3d668"
        },
        tertiary: {
            id: "tertiary",
            name: "Tertiary",
            lightValue: "#00a1cd",
            darkValue: "#00a1cd"
        },
        success: {
            id: "success",
            name: "Success",
            lightValue: "#2dd36f",
            darkValue: "#2dd36f"
        },
        warning: {
            id: "warning",
            name: "Warning",
            lightValue: "#ffc409",
            darkValue: "#ffc409"
        },
        danger: {
            id: "danger",
            name: "Danger",
            lightValue: "#eb445a",
            darkValue: "#eb445a"
        },
        dark: {
            id: "danger",
            name: "Dark",
            lightValue: "#222428",
            darkValue: "#222428"
        },
        medium: {
            id: "medium",
            name: "Medium",
            lightValue: "#92949c",
            darkValue: "#92949c"
        },
        light: {
            id: "light",
            name: "Light",
            lightValue: "#f4f5f8",
            darkValue: "#f4f5f8"
        },
        background: {
            id: "background",
            name: "Background",
            lightValue: "#eee",
            darkValue: "#222"
        },
        itemBackground: {
            id: "itemBackground",
            name: "Item Background",
            lightValue: "#eee",
            darkValue: "#222"
        },
        chatButton: {
            id: "chatButton",
            name: "Home - Chat Button",
            lightValue: "#29A327"
        },
        guideButton: {
            id: "guideButton",
            name: "Home - Guide Button",
            lightValue: "#F8AF00"
        },
        toolboxButton: {
            id: "toolboxButton",
            name: "Home - Toolbox Button",
            lightValue: "#5550A9"
        },
        activitiesButton: {
            id: "activitiesButton",
            name: "Home - Activities Button",
            lightValue: "#5FC4D2"
        },
        galleryButton: {
            id: "galleryButton",
            name: "Home - Gallery Button",
            lightValue: "#dc8900"
        },
        remindersButton: {
            id :"remindersButton",
            name: "Home - Reminders Button",
            lightValue: "#E81C51"
        }
    }
};

export const THEME_1: AppTheme = {
    name: "PLH Teens 1",
    editable: true,
    colors: {
        primary: {
            name: "Primary",
            lightValue: "#0d4060",
            darkValue: "#0d4060"
        }
    }
};


export const THEME_2: AppTheme = {
    name: "PLH Teens 2",
    editable: true,
    colors: {
        primary: {
            name: "Primary",
            lightValue: "#ff4060",
            darkValue: "#ff4060"
        }
    }
};

export const BUILT_IN_EDITABLE_THEMES = [THEME_1, THEME_2];