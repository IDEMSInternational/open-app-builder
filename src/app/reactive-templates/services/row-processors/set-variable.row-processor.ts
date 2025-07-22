import { FlowTypes } from "packages/data-models";
import { VariableStore } from "../../stores/variable-store";
import { ITypedRowProcessor } from "./non-display.row-processor";
import { RowService } from "../row-service";

export class SetVariableRowProcessor implements ITypedRowProcessor {
  constructor(
    private variableStore: VariableStore,
    private rowService: RowService
  ) {}

  public processType: FlowTypes.TemplateRowBaseType = "set_variable";

  public processRow(row: FlowTypes.TemplateRow): void {
    this.setVariable(row._nested_name, this.evaluate(row));
  }

  private setVariable(name: string, value: any): void {
    this.variableStore.set(name, value);
  }

  private evaluate(row: FlowTypes.TemplateRow): any {
    return this.rowService.evaluate(row);
  }
}
