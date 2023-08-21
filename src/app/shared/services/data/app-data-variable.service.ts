import { Injectable } from "@angular/core";
import { ITemplatedDataContextList, JSEvaluator, TemplatedData } from "shared";
import { AsyncServiceBase } from "../asyncService.base";
import { DbService } from "../db/db.service";
import { LocalStorageService } from "../local-storage/local-storage.service";
import { FieldEvaluator } from "./variable-evaluators";
import { AppDataEvaluatorBase } from "./variable-evaluators/base";

// Support both @field and @fields
type IVariableContext = "field" | "fields";

@Injectable({ providedIn: "root" })
/**
 * Handle processing of app data context variables, such as @field syntax
 *
 * NOTE - ideally this should be extended to provide full functionality required by templating service
 * and used to replace template-variable service
 */
export class AppDataVariableService extends AsyncServiceBase {
  /**
   * List of available evaluators
   * TODO - consider registration functionality like in template actions
   **/
  public evaluators: { [context in IVariableContext]: AppDataEvaluatorBase };

  constructor(private localStorageService: LocalStorageService, private DBService: DbService) {
    super("App Data Evaluator");
    this.registerInitFunction(this.initialise);
  }

  private async initialise() {
    this.ensureSyncServicesReady([this.localStorageService]);
    await this.ensureAsyncServicesReady([this.DBService]);
    this.evaluators = {
      field: new FieldEvaluator(this.localStorageService, this.DBService),
      fields: new FieldEvaluator(this.localStorageService, this.DBService),
    };
  }

  public async get(context: IVariableContext, key: any) {
    const evaluator = this.evaluators[context];
    if (!evaluator) {
      console.error(`[AppDataVariable] @${context} expressions not supported`);
      return undefined;
    }
    return evaluator.get(key);
  }

  public async set(context: IVariableContext, key: string, value: any) {
    const evaluator = this.evaluators[context];
    if (!evaluator) {
      console.error(`[AppDataVariable] @${context} expressions not supported`);
      return;
    }
    return evaluator.set(key, value);
  }

  /**
   * Evaluate an expression that may or may not contain context variables,
   * E.g. `@field.some_field > 2`
   *
   * As part of the evaluation process all context expressions are parsed,
   * and the final result evaluated from within a sandboxed JavaScript environment
   */
  public async evaluateExpression(expression: string) {
    const parser = new TemplatedData();
    const prefixes = Object.keys(this.evaluators);
    // Step 0 - extract list of all context variables used as part of expression
    // TODO - ideally should be extracted in parser
    const contextVariables = parser.listContextVariables(expression, prefixes);

    // Step 1 - populate context variable values
    const { evaluatedContext, isRecursive } = await this.processContextVariables(contextVariables);

    // Step 2 - Parse expression, replacing with dynamic variables with populated values
    parser.updateContext(evaluatedContext);
    const parsed = parser.parse(expression);

    // Step 2a - Evaluate recursive expression if detected
    if (isRecursive) {
      return this.evaluateExpression(parsed);
    }

    // Step 3 - Evaluate parsed expression
    // NOTE - method called standalone instead of using appStringEvaluator to add support for recursive
    const jsEvaluator = new JSEvaluator();
    return jsEvaluator.evaluate(parsed);
  }

  /** Evaluate all context-variable expressions */
  private async processContextVariables(variables: ITemplatedDataContextList) {
    const evaluatedContext = {};
    let isRecursive = false;
    if (Object.keys(variables).length > 0) {
      //   TODO - idelly all evaluators should have caching for quick retrieval
      for (const [contextPrefix, variableNameHashmap] of Object.entries(variables)) {
        evaluatedContext[contextPrefix] = {};
        if (variableNameHashmap.__recursive) {
          isRecursive = true;
        }
        for (const variableName of Object.keys(variableNameHashmap)) {
          const evaluated = await this.get(contextPrefix as IVariableContext, variableName);
          evaluatedContext[contextPrefix][variableName] = evaluated;
        }
      }
    }
    return { evaluatedContext, isRecursive };
  }
}
