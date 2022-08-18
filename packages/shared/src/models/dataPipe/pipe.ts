import { DataFrame, toJSON } from "danfojs";
import { OPERATORS } from "./operators";

export interface IDataPipeOperation {
  operation: keyof typeof OPERATORS;
  args: any;
  input_source?: string;
  output_target?: string;
}

export class DataPipe {
  private df = new DataFrame([]);
  public outputTargets: { [key: string]: any } = {};

  constructor(private steps: IDataPipeOperation[], private inputSources = {}) {}

  run() {
    for (const step of this.steps) {
      // assign input if specified (default to previous output)
      if (step.input_source) {
        this.setInputSource(step.input_source);
      }
      // validate operator
      const operator = OPERATORS[step.operation];
      if (!operator) {
        throw new Error(`No pipeline operator exists: ${step.operation}`);
      }
      // apply operation
      const instance = new operator(this.df, step.args);
      console.log(step.operation, instance.args);
      const output = instance.apply();
      // Assign output as next input. Populate as named input/output if specified
      this.df = output;
      if (step.output_target) {
        this.setOutputTarget(step.output_target);
      }
    }
  }

  setOutputTarget(target: string) {
    const [name, localOnly] = target.split(":").map((v) => v.trim());
    const jsonOutput = toJSON(this.df);
    this.inputSources[name] = jsonOutput;
    if (!localOnly) {
      this.outputTargets[name] = jsonOutput;
    }
  }

  setInputSource(name: string) {
    if (!this.inputSources.hasOwnProperty(name)) {
      throw new Error(`Data source not found: ${name}`);
    }
    this.df = new DataFrame(this.inputSources[name]);
  }
}
