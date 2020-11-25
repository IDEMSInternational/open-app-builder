import { addDays } from "date-fns";

/**
 * Pick a random date around today's date
 * @param dayVariation +/- range of days from today
 */
export const randomDate = (dayVariation = 7) => {
  const from = addDays(new Date(), dayVariation * -1).getTime();
  const to = addDays(new Date(), dayVariation).getTime();
  return new Date(from + Math.random() * (to - from));
};

/**
 * Given an array select and return a random element from it
 */
export const randomElement = (arr: any[]) => {
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
};

/**
 * Randomly return a true or false value
 */
export const randomBool = () => Math.random() >= 0.5;
