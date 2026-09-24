export function hasIndexer(expression: string | number | boolean): boolean {
  if (typeof expression !== "string") return false;
  return /\[[^\]]*\]/.test(expression);
}
