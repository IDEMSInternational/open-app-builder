import { FlowTypes } from "packages/data-models/flowTypes";
import { VariableStore } from "../stores/variable-store";
import { Injectable } from "@angular/core";
import { AppDataEvaluator } from "packages/shared/src/models/appDataEvaluator/appDataEvaluator";

@Injectable({ providedIn: "root" })
export class RowService {
  private evaluator = new AppDataEvaluator();

  constructor(private variableStore: VariableStore) {}

  public getDependencies(row: FlowTypes.TemplateRow, type: string): string[] {
    const dynamicFields = row._dynamicFields?.value;

    if (!Array.isArray(dynamicFields)) return [];

    return dynamicFields
      .filter((field: any) => field.type === type)
      .map((field: any) => field.fieldName);
  }

  public createExecutionContext(row: FlowTypes.TemplateRow): any {
    const context = { local: {} };
    const dependantVariables = this.getDependencies(row, "local");

    dependantVariables.forEach((fieldName) => {
      context.local[fieldName] = this.variableStore.get(fieldName);
    });

    return context;
  }

  public evaluate(row: FlowTypes.TemplateRow): any {
    this.evaluator.setExecutionContext(this.createExecutionContext(row));
    return this.evaluator.evaluate(row.value);
  }

  public evaluateCondition(row: FlowTypes.TemplateRow): boolean {
    this.evaluator.setExecutionContext(this.createExecutionContext(row));
    let condition = row.condition ?? true;

    return this.evaluator.evaluate(condition);
  }

  public evaluateParameter(row: FlowTypes.TemplateRow, parameterName: string): any {
    if (!row.parameter_list || !row.parameter_list[parameterName]) {
      return null;
    }

    const parameterValue = row.parameter_list[parameterName];
    if (!parameterValue) return null;

    this.evaluator.setExecutionContext(this.createExecutionContext(row));
    return this.evaluator.evaluate(parameterValue);
  }
}
