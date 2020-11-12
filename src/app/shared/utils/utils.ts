/**
 * Generate a random string of characters in base-36 (a-z and 0-9 characters)
 * @returns uxokjq8co1n
 * Adapted from https://gist.github.com/6174/6062387
 */
export function generateRandomId() {
  return Math.random().toString(36).substring(2);
}
