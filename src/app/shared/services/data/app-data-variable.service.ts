import { Injectable } from "@angular/core";
import { JSEvaluator } from "shared/src/models/jsEvaluator/jsEvaluator";
import {
  ITemplatedDataContextList,
  TemplatedData,
} from "shared/src/models/templatedData/templatedData";
import { AsyncServiceBase } from "../asyncService.base";
import { DbService } from "../db/db.service";
import { LocalStorageService } from "../local-storage/local-storage.service";
import * as Handlers from "./variable-handlers";

// Support both @field and @fields
export type IVariableContext = "field" | "fields";

@Injectable({ providedIn: "root" })
/**
 * Handle processing of app data context variables, such as @field syntax
 *
 * NOTE - ideally this should be extended to provide full functionality required by templating service
 * and used to replace template-variable service
 */
export class AppDataVariableService extends AsyncServiceBase {
  /**
   * List of available variable handlers, e.g. field, global, etc.
   * TODO - consider registration functionality like in template actions
   **/
  public handlers: { [context in IVariableContext]: Handlers.AppDataHandlerBase };

  constructor(private localStorageService: LocalStorageService, private DBService: DbService) {
    super("App Data Evaluator");
    this.registerInitFunction(this.initialise);
  }

  private async initialise() {
    this.ensureSyncServicesReady([this.localStorageService]);
    await this.ensureAsyncServicesReady([this.DBService]);
    // use same handler for both @field and @fields
    const fieldHandler = new Handlers.Field(this.localStorageService, this.DBService);
    this.handlers = {
      field: fieldHandler,
      fields: fieldHandler,
    };
  }

  public async get(context: IVariableContext, key: any) {
    const handler = this.handlers[context];
    if (!handler) {
      console.error(`[AppDataVariable] @${context} expressions not supported`);
      return undefined;
    }
    return handler.get(key);
  }

  public async set(context: IVariableContext, key: string, value: any) {
    const handler = this.handlers[context];
    if (!handler) {
      console.error(`[AppDataVariable] @${context} expressions not supported`);
      return;
    }
    return handler.set(key, value);
  }

  /**
   * Parse an expression that may or may not contain context variable,
   * E.g. `hello @field.user_name`
   *
   * Returns expression with variables replaced
   */
  public async parseExpression(expression: string) {
    const parser = new TemplatedData();
    const prefixes = Object.keys(this.handlers);
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
      return this.parseExpression(parsed);
    }
    return parsed;
  }

  /**
   * Evaluate an expression that may or may not contain context variables,
   * E.g. `@field.some_field > 2`
   *
   * As part of the evaluation process all context expressions are parsed,
   * and the final result evaluated from within a sandboxed JavaScript environment
   */
  public async evaluateExpression(expression: string) {
    const parsed = await this.parseExpression(expression);
    // Step 3 - Evaluate parsed expression
    // NOTE - method called standalone instead of using appStringEvaluator to add support for recursive
    // If the parsed expression not valid JS (e.g. just text) then return as-is
    const jsEvaluator = new JSEvaluator();
    try {
      const evaluated = jsEvaluator.evaluate(parsed);
      return evaluated;
    } catch (error) {
      return parsed;
    }
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
