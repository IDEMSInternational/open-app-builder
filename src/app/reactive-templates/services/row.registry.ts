import { Injectable } from "@angular/core";
import { Parameters } from "../reactive-components/parameters";
import { FlowTypes } from "packages/data-models/flowTypes";

export interface IRow {
  name(): string;
  value(): any;
  params: Parameters;
  setExpression(expression: any): void;
  row(): FlowTypes.TemplateRow;
}

@Injectable({
  providedIn: "root",
})
export class RowRegistry {
  private readonly rows = new Map<string, IRow>();

  constructor() {}

  register(row: IRow) {
    const name = row.name();
    if (!name) {
      throw new Error("RowRegistry.register: row.name() is empty");
    }
    // Last write wins; warn if replacing a different instance
    const existing = this.rows.get(name);
    if (existing && existing !== row) {
      console.warn(`RowRegistry.register: replacing existing row '${name}'`);
    }
    this.rows.set(name, row);
  }

  get(name: string): IRow {
    const row = this.rows.get(name);
    if (!row) {
      throw new Error(`RowRegistry.get: no row registered with name '${name}'`);
    }
    return row;
  }

  has(name: string): boolean {
    return this.rows.has(name);
  }

  unregister(name: string) {
    this.rows.delete(name);
  }
}
