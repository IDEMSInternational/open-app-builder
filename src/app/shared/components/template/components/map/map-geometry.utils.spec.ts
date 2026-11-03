import { toMapPolygon } from "./map-geometry.utils";

describe("map geometry utils", () => {
  const square: [number, number][] = [
    [0, 0],
    [1, 0],
    [1, 1],
    [0, 1],
    [0, 0],
  ];

  it("keeps a GeoJSON polygon", () => {
    const polygon = { type: "Polygon", coordinates: [square] };
    expect(toMapPolygon(polygon)).toEqual({ type: "Polygon", coordinates: [square] });
  });

  it("parses a JSON string of a GeoJSON polygon", () => {
    const value = JSON.stringify({ type: "Polygon", coordinates: [square] });
    expect(toMapPolygon(value)).toEqual({ type: "Polygon", coordinates: [square] });
  });

  it("reads a bare ring string, dropping altitude and closing the ring", () => {
    const value = "[[0,0,350.1],[1,0,351.2],[1,1,352.3]]";
    expect(toMapPolygon(value)).toEqual({
      type: "Polygon",
      coordinates: [
        [
          [0, 0],
          [1, 0],
          [1, 1],
          [0, 0],
        ],
      ],
    });
  });

  it("rounds coordinates to 9 decimal places", () => {
    const result = toMapPolygon([
      [0.1234567891234, 0],
      [1, 0],
      [1, 1],
    ]);
    expect(result.coordinates[0][0][0]).toBe(0.123456789);
  });

  it("removes consecutive duplicate points", () => {
    const result = toMapPolygon([
      [0, 0],
      [0, 0],
      [1, 0],
      [1, 1],
      [0, 0],
    ]);
    expect(result.coordinates[0].length).toBe(4);
  });

  it("returns null for values that are not polygons", () => {
    expect(toMapPolygon("not json")).toBeNull();
    expect(toMapPolygon(undefined)).toBeNull();
    expect(toMapPolygon({ type: "Point", coordinates: [0, 0] })).toBeNull();
    expect(
      toMapPolygon([
        [0, 0],
        [1, 1],
      ])
    ).toBeNull();
  });
});
