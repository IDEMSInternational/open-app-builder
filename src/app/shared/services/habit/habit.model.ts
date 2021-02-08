export interface IHabit {
    habitId: string;
    weeklyAim?: number;
}

export interface IHabitActivityIdea {
    flowName: string;
    ideaTitle: string;
}

export interface IHabitOccurrence {
    id: number;
    habitId: string;
    created: Date;
}