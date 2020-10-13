import "jasmine";
import * as xlsx from "xlsx";
import * as path from "path";
import { processWorkbook } from "./process-content-sheet";
import { mockWorkbook1 } from './workbook';

describe("Process Content Sheet", () => {

    it("should run without throwing an error", () => {
        expect(function() {
            processWorkbook(mockWorkbook1, path.join(__dirname, "output"))
        }).not.toThrow();
    });
});