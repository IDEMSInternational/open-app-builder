export type IRGBA = [r: number, g: number, b: number, a: number];

/** Parse a computed css colour, e.g. `rgb(10, 20, 30)`, `rgba(10, 20, 30, 0.5)` or `rgb(10 20 30 / 50%)` */
export function parseCssColour(value: string): IRGBA | null {
  const match = value?.match(/^rgba?\((.+)\)$/);
  if (!match) return null;
  const parts = match[1].split(/[\s,/]+/).filter((v) => v !== "");
  if (parts.length < 3) return null;
  const [r, g, b] = parts.slice(0, 3).map((v) => parseFloat(v));
  let a = 1;
  if (parts[3] !== undefined) {
    a = parts[3].endsWith("%") ? parseFloat(parts[3]) / 100 : parseFloat(parts[3]);
  }
  if ([r, g, b, a].some((v) => Number.isNaN(v))) return null;
  return [r, g, b, a];
}

/** Combine colours listed from the top layer down into the single colour that is seen */
export function flattenColours(layers: IRGBA[], base: IRGBA = [255, 255, 255, 1]): IRGBA {
  const result = [0, 0, 0];
  let remaining = 1;
  for (const [r, g, b, a] of [...layers, base]) {
    const weight = remaining * a;
    result[0] += r * weight;
    result[1] += g * weight;
    result[2] += b * weight;
    remaining -= weight;
    if (remaining <= 0.01) break;
  }
  return [result[0], result[1], result[2], 1];
}

/** WCAG relative luminance, from 0 (black) to 1 (white) */
export function relativeLuminance([r, g, b]: IRGBA): number {
  const [lr, lg, lb] = [r, g, b].map((v) => {
    const c = v / 255;
    return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * lr + 0.7152 * lg + 0.0722 * lb;
}

/**
 * Whether dark text and icons are easier to read than white ones on a colour,
 * i.e. their contrast ratio with it is higher
 */
export function isLightColour(colour: IRGBA): boolean {
  return relativeLuminance(colour) > 0.179;
}
