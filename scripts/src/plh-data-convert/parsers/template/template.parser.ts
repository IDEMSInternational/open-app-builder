import { DefaultParser } from "../default/default.parser";

export class TemplateParser extends DefaultParser {
    constructor() {
        super();
        this.groupSuffix = "";
    }
}