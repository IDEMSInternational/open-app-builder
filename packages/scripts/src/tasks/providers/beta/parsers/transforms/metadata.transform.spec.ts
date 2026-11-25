import { getColumnMetadata, METADATA_ROW_ID, splitMetadataRow } from "./metadata.transform";

/** yarn workspace scripts test -t metadata.transform.spec.ts */
describe("Beta metadata transform", () => {
  describe("splitMetadataRow", () => {
    it("removes a first metadata row", () => {
      const metadataRow = { id: METADATA_ROW_ID, number: "type: number" };
      const rows = [metadataRow, { id: "a", number: 1 }];
      expect(splitMetadataRow(rows)).toEqual({ metadataRow, rows: [{ id: "a", number: 1 }] });
    });

    it("returns rows unchanged without a metadata row", () => {
      const rows = [{ id: "a" }, { id: "b" }];
      expect(splitMetadataRow(rows)).toEqual({ metadataRow: undefined, rows });
    });

    it("removes metadata rows after the first row, without using them", () => {
      const rows = [{ id: "a" }, { id: METADATA_ROW_ID, number: "type: number" }];
      expect(splitMetadataRow(rows)).toEqual({ metadataRow: undefined, rows: [{ id: "a" }] });
    });
  });

  describe("getColumnMetadata", () => {
    it("parses each column of the metadata row, omitting string types", () => {
      const metadataRow = {
        id: METADATA_ROW_ID,
        number: "type: number",
        completed: "type: boolean",
        title: "type: string",
        empty: "",
      };
      expect(getColumnMetadata([], metadataRow)).toEqual({
        number: { type: "number" },
        completed: { type: "boolean" },
      });
    });

    it("removes language suffixes from metadata row columns", () => {
      const metadataRow = { id: METADATA_ROW_ID, "count::eng": "type: number" };
      expect(getColumnMetadata([], metadataRow)).toEqual({ count: { type: "number" } });
    });

    it("uses the metadata row instead of inferring types", () => {
      const rows = [{ id: "a", number: 1, completed: "" }];
      const metadataRow = { id: METADATA_ROW_ID, completed: "type: boolean" };
      expect(getColumnMetadata(rows, metadataRow)).toEqual({ completed: { type: "boolean" } });
    });

    it("infers types from the first row with a value, ignoring strings, lists and _ columns", () => {
      const rows = [
        { id: "a", title: "Hello", tags_list: ["x"], _translatedFields: { title: {} } },
        { id: "b", number: 2, completed: false, time: { hour: 4 } },
        { id: "c", number: "not a number" },
      ];
      expect(getColumnMetadata(rows)).toEqual({
        number: { type: "number" },
        completed: { type: "boolean" },
        time: { type: "object" },
      });
    });
  });
});
