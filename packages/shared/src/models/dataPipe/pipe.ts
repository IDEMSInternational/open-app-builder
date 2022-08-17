import { DataFrame } from "danfojs";
import { OPERATORS } from "./operators";

export interface IDataPipeOperation {
  operation: keyof typeof OPERATORS;
  args: any;
  input_source?: string;
  output_target?: string;
}

export class DataPipe {
  df = new DataFrame([]);

  constructor(private steps: IDataPipeOperation[], private inputSources = {}) {}

  run() {
    for (const step of this.steps) {
      const operator = OPERATORS[step.operation];
      if (!operator) {
        throw new Error(`No pipeline operator exists: ${step.operation}`);
      }
    }
  }

  setInputSource(name: string) {
    if (!this.inputSources.hasOwnProperty(name)) {
      throw new Error(`Data source not found: ${name}`);
    }
    this.df = new DataFrame(this.inputSources[name]);
  }
}
