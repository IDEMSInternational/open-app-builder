import { IFunctionHashmap, IConstantHashmap } from "src/app/shared/utils";

import { Injectable } from "@angular/core";
import * as date_fns from "date-fns";
import { ServerService } from "src/app/shared/services/server/server.service";
import { DataEvaluationService } from "src/app/shared/services/data/data-evaluation.service";
import { AsyncServiceBase } from "src/app/shared/services/asyncService.base";
import { PLH_CALC_FUNCTIONS } from "./template-calc-functions/plh-calc-functions";
import { CORE_CALC_FUNCTIONS } from "./template-calc-functions/core-calc-functions";

@Injectable({ providedIn: "root" })
export class TemplateCalcService extends AsyncServiceBase {
  /** list of all variables accessible directly within calculations */
  private calcContext: ICalcContext;

  private calcFunctions: IFunctionHashmap = {
    ...CORE_CALC_FUNCTIONS,
    ...PLH_CALC_FUNCTIONS,
  };

  constructor(
    private serverService: ServerService,
    private dataEvaluationService: DataEvaluationService
  ) {
    super("TemplateCalc");
    this.registerInitFunction(this.initialise);
  }
  private async initialise() {
    await this.ensureAsyncServicesReady([this.dataEvaluationService, this.serverService]);
    this.getCalcContext();
  }

  /** Provide calc context, initialising only once */
  public getCalcContext() {
    if (!this.calcContext) {
      this.addWindowCalcFunctions();
      this.calcContext = this.generateCalcContext();
    }
    // Assign all calc functions also to window object to allow calling between functions
    (window as any).calc = this.calcFunctions;
    return this.calcContext;
  }

  /**
   * Main export for use in evaluation statements. Includes all functions listed below
   * alongside additional a base for variables found at `this.`
   */
  private generateCalcContext(): ICalcContext {
    const globalConstants = this.generateGlobalConstants();
    const globalFunctions = { ...this.calcFunctions };
    const thisCtxt = this.generateThisCtxt();
    return { globalConstants, globalFunctions, thisCtxt };
  }

  private generateThisCtxt() {
    return {
      calc: (v: any) => v, // include simple function so @calc(...) returns the value already parsed inside
      app_day: this.dataEvaluationService.data.app_day,
      app_first_launch: this.dataEvaluationService.data.first_app_launch,
      app_user_id: this.serverService.app_user_id,
      device_info: this.serverService.device_info,
    };
  }

  /**
   * Provide a list of variables that can be accessed directly within calculations
   *
   * NOTE - as they will be hardcoded into the function string execution statement the only
   * datatypes naturally supported are number and boolean, and custom method adds support
   * for strings also (adds quotation marks). More complex datatypes should instead be included
   * in the `this` context, or added to the global window object
   *
   * @example
   * ```
   * calc(test_var)
   *
   * // returns "hello"
   * ```
   */
  private generateGlobalConstants() {
    const globalConstants: IConstantHashmap = {
      test_var: "hello",
    };
    return globalConstants;
  }

  /**
   * 3rd party imports cannot be easily inlined, so instead add them to the window object to access from calculations
   * @example
   * ```
   * calc(window.date_fns.differenceInWeeks(new Date(), new Date("2021-08-01"))
   * ```
   */
  private addWindowCalcFunctions() {
    (window as any).date_fns = date_fns;
  }
}

/**
 * When evaluating functions we have a custom context, so that variables can be specified to both 'this',
 * as in `this.local.some_value` as well as global functions which can be accessed directly, e.g.
 * `pick_random(this.local.some_list)`
 */
export interface ICalcContext {
  thisCtxt: {
    [name: string]: any;
  };
  globalFunctions: IFunctionHashmap;
  globalConstants: IConstantHashmap;
}
