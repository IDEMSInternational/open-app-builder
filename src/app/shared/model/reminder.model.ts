export interface Reminder {
    id: string;
    what: string;
    whenEpoch: number;
    recurranceTimeMs?: number;
    complete: boolean;
}