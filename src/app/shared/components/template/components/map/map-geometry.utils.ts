/** Max decimal places kept (matches `coordinatePrecision` passed to the TerraDraw adapter) */
export const MAP_COORDINATE_PRECISION = 9;

type LonLat = [number, number];
export type MapPolygon = { type: "Polygon"; coordinates: LonLat[][] };

/**
 * Convert a stored geometry value into a GeoJSON Polygon that TerraDraw will accept.
 * Supports GeoJSON Polygon objects (as written by the map's own save), JSON strings of the same,
 * and bare coordinate lists authored in sheets, e.g. `[[lon,lat,alt],[lon,lat,alt],...]`.
 * Altitude and excess precision are dropped and the ring is closed if needed.
 * Returns null if the value cannot be read as a polygon.
 */
export function toMapPolygon(
  value: unknown,
  precision = MAP_COORDINATE_PRECISION
): MapPolygon | null {
  const parsed = parseJsonString(value);
  let rings: unknown;
  if (Array.isArray(parsed)) {
    // bare ring `[[lon,lat],...]` or list of rings `[[[lon,lat],...]]`
    rings = isPosition(parsed[0]) ? [parsed] : parsed;
  } else if (isObjectLiteral(parsed) && parsed.type === "Polygon") {
    rings = parsed.coordinates;
  } else {
    return null;
  }
  if (!Array.isArray(rings) || rings.length === 0) return null;
  // TerraDraw does not support holes, so keep the outer ring only
  const ring = normaliseRing(rings[0], precision);
  return ring ? { type: "Polygon", coordinates: [ring] } : null;
}

function normaliseRing(ring: unknown, precision: number): LonLat[] | null {
  if (!Array.isArray(ring)) return null;
  const factor = 10 ** precision;
  const round = (n: number) => Math.round(n * factor) / factor;
  const points: LonLat[] = [];
  for (const position of ring) {
    if (!isPosition(position)) return null;
    const point: LonLat = [round(position[0]), round(position[1])];
    // skip consecutive duplicates (common in GPS traces)
    if (!isSamePoint(points[points.length - 1], point)) points.push(point);
  }
  if (points.length > 0 && !isSamePoint(points[0], points[points.length - 1])) {
    points.push([...points[0]]);
  }
  // at least 3 distinct points plus the closing point
  return points.length >= 4 ? points : null;
}

function parseJsonString(value: unknown): unknown {
  if (typeof value !== "string") return value;
  try {
    return JSON.parse(value);
  } catch {
    return undefined;
  }
}

function isPosition(value: unknown): value is number[] {
  return (
    Array.isArray(value) &&
    value.length >= 2 &&
    typeof value[0] === "number" &&
    typeof value[1] === "number"
  );
}

function isSamePoint(a: LonLat | undefined, b: LonLat) {
  return a !== undefined && a[0] === b[0] && a[1] === b[1];
}

function isObjectLiteral(value: unknown): value is Record<string, any> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
