import { FlowTypes } from "packages/data-models";
import { Inject, Injectable } from "@angular/core";
import { TYPED_ROW_PROCESSORS } from ".";

export interface ITypedRowProcessor extends IRowProcessor {
  processType: FlowTypes.TemplateRowBaseType;
}

export interface IRowProcessor {
  processRow(row: FlowTypes.TemplateRow): void;
}

@Injectable({
  providedIn: "root",
})
export class NonDisplayRowProcessor implements IRowProcessor {
  constructor(@Inject(TYPED_ROW_PROCESSORS) private rowProcessors: ITypedRowProcessor[]) {}

  public processRow(row: FlowTypes.TemplateRow): void {
    this.rowProcessors.filter((p) => p.processType === row.type).forEach((p) => p.processRow(row));
  }
}
