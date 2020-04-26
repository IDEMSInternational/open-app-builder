export type Song = {
    songTitle: string;
    audioURL: string;
    lyrics: {
        lyric: string,
        startTimeMinute: string,
        startTimeSecond: string,
        endTimeMinute: string,
        endTimeSecond: string,
        person?: string,
        isInstructions?: string,
        danceMove?: string
    }[];
};