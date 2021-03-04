import { FlowTypes } from "scripts/types";
import { DefaultParser } from "../default/default.parser";

export class TemplateParser extends DefaultParser {
  constructor() {
    super();
    this.groupSuffix = "";
  }
  postProcess(row: FlowTypes.TemplateRow) {
    if (!row.type) {
      row.type = "set_variable";
    }
    return row;
  }
}
