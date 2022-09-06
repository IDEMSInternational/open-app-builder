import { DataFrame, toJSON } from "danfojs";
import { IBaseOperator, OPERATORS } from "./operators";
import type { IDataPipeOperation } from "./types";

export class DataPipe {
  private df = new DataFrame([]);
  public outputTargets: { [key: string]: any } = {};
  public inputSources: { [key: string]: any } = {};

  constructor(private steps: IDataPipeOperation[], inputSources = {}) {
    this.inputSources = inputSources;
  }

  run() {
    const missingInputs = this.checkMissingInputs();
    if (missingInputs) {
      throw new Error("Input sources missing for data pipe: " + missingInputs);
    }
    for (const step of this.steps) {
      // assign input if specified (default to previous output)
      if (step.input_source) {
        this.setInputSource(step.input_source);
      }
      // validate operator
      const operator = OPERATORS[step.operation] as IBaseOperator;
      if (!operator) {
        throw new Error(`No pipeline operator exists: ${step.operation}`);
      }
      // apply operation
      const instance = new operator(this.df, step.args_list, this);
      const output = instance.apply();
      // Assign output as next input. Populate as named input/output if specified
      this.df = output;
      if (step.output_target) {
        this.setOutputTarget(step.output_target);
      }
    }
    return this.outputTargets;
  }

  setOutputTarget(target: string) {
    const [name, localOnly] = target.split("|").map((v) => v.trim());
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

  /** Extract a list of all required input sources and check to see if they already exist or will be generated */
  public checkMissingInputs() {
    const availableInputs = {};
    const missingInputs = {};
    // list existing inputs
    for (const inputSource of Object.keys(this.inputSources)) {
      availableInputs[inputSource] = true;
    }
    // compare required inputs with available inputs (including generated outputs)
    for (const step of this.steps) {
      const { input_source, output_target } = step;
      if (input_source && !availableInputs[input_source]) {
        missingInputs[input_source] = true;
      }
      if (output_target) {
        const [outputName] = step.output_target.split("|").map((v) => v.trim());
        availableInputs[outputName] = true;
      }
    }
    const missingList = Object.keys(missingInputs);
    return missingList.length === 0 ? null : missingList;
  }
}
