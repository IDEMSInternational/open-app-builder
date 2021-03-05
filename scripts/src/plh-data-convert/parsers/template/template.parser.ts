import { FlowTypes } from "../../../../types";
import { DefaultParser } from "../default/default.parser";

export class TemplateParser extends DefaultParser {
  constructor() {
    super();
    this.groupSuffix = "";
  }
  postProcess(row: FlowTypes.TemplateRow) {
    // set all empty row and nested row types to 'set_variable' type
    if (!row.type) {
      row.type = "set_variable";
    }
    if (row.rows) {
      row.rows = row.rows.map((r) => this.postProcess(r));
    }
    return row;
  }
}
