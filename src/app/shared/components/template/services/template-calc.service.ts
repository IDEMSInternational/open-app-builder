import { IFunctionHashmap, IConstantHashmap, evaluateJSExpression } from "src/app/shared/utils";
import { Injectable } from "@angular/core";
import { Device, DeviceInfo } from "@capacitor/device";
import * as date_fns from "date-fns";
import { DataEvaluationService } from "src/app/shared/services/data/data-evaluation.service";
import { AsyncServiceBase } from "src/app/shared/services/asyncService.base";
import { PLH_CALC_FUNCTIONS } from "./template-calc-functions/plh-calc-functions";
import { CORE_CALC_FUNCTIONS } from "./template-calc-functions/core-calc-functions";
import { LocalStorageService } from "src/app/shared/services/local-storage/local-storage.service";
import type { FlowTypes } from "packages/data-models";

/** Window context with additional calc service properties attached */
type IWindowWithCalc = Window & {
  /**
   * @deprecated 0.18.0 Prefer to call directly instead of via window
   *
   * ✔️ `@calc(pick_random([1,2,3]))`
   * ❌ `@calc(window.calc.pick_random([1,2,3]))`
   *
   * All user-defined calc available globally
   * */
  calc: IFunctionHashmap;
  /** Specific data_fns lib available globally */
  date_fns: typeof date_fns;
};

@Injectable({ providedIn: "root" })
export class TemplateCalcService extends AsyncServiceBase {
  private app_user_id: string;
  private device_info: DeviceInfo;
  /** list of all variables accessible directly within calculations */
  private calcContext: ICalcContext;

  private calcFunctions: IFunctionHashmap = {
    ...CORE_CALC_FUNCTIONS,
    ...PLH_CALC_FUNCTIONS,
  };

  constructor(
    private dataEvaluationService: DataEvaluationService,
    private localStorageService: LocalStorageService
  ) {
    super("TemplateCalc");
    this.registerInitFunction(this.initialise);
  }

  private get windowWithCalc() {
    return window as any as IWindowWithCalc;
  }

  private async initialise() {
    this.ensureSyncServicesReady([this.localStorageService]);
    await this.ensureAsyncServicesReady([this.dataEvaluationService]);
    await this.setUserMetaData();
    this.getCalcContext();
  }

  /** Provide calc context, initialising only once */
  public getCalcContext() {
    if (!this.calcContext) {
      this.addWindowCalcFunctions();
      this.calcContext = this.generateCalcContext();
    }
    // Assign all calc functions also to window object to allow calling between functions
    this.windowWithCalc.calc = this.calcFunctions;
    return this.calcContext;
  }

  /**
   * Evaluate inner expression provided by `@calc(...)` expression
   * The expression is evaluated as JS, with additional access to global constants, function and
   * evaluation context variables
   * */
  public evaluate(expression: string, evalContext: FlowTypes.TemplateRowEvalContext = {}) {
    const calcContext = this.getCalcContext();
    const calcExpression = expression.replace(/@/gi, "this.");
    const { thisCtxt, globalFunctions, globalConstants } = calcContext;
    const mergedContext = { ...thisCtxt, ...evalContext };
    return evaluateJSExpression(calcExpression, mergedContext, globalFunctions, globalConstants);
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
      app_user_id: this.app_user_id,
      device_info: this.device_info,
    };
  }

  private async setUserMetaData() {
    if (!this.device_info) {
      this.device_info = await Device.getInfo();
    }
    if (!this.app_user_id) {
      this.app_user_id = this.localStorageService.getProtected("APP_USER_ID");
    }
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
    const globalConstants: IConstantHashmap = {};
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
    this.windowWithCalc.date_fns = date_fns;
  }
}

/**
 * When evaluating functions we have a custom context, so that variables can be specified to both 'this',
 * as in `this.local.some_value` as well as global functions which can be accessed directly, e.g.
 * `pick_random(this.local.some_list)`
 */
export interface ICalcContext {
  thisCtxt: {
    /** assign `this.calc` variable to handle replaced `this.calc(...)` expressions */
    calc: (v) => any;
    [name: string]: any;
  };
  globalFunctions: IFunctionHashmap;
  globalConstants: IConstantHashmap;
}
