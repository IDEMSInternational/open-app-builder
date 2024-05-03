import { FlowTypes } from "../../models";
import { TemplateRowService } from "./template-row.service";

/**
 * Placeholder TemplateRowService
 *
 * TODO - implement full mock methods
 */
export class MockTemplateRowService extends TemplateRowService {
  constructor() {
    super(
      null as any,
      {
        name: "",
        template: {
          rows: [],
        },
        row: {
          rows: [],
        },
      } as any
    );
  }
  public async processContainerTemplateRows(): Promise<FlowTypes.TemplateRow[]> {
    // HACK - skip processing and just return as rows
    return this.container.template.rows;
  }
}

// TODO - spec tests
