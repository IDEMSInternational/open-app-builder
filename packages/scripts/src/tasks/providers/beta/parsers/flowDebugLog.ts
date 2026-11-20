import { FlowTypes } from "data-models";
import { logWarning } from "../../../../utils";

/** Messages written to `_debug` of a processed flow, shown on the app `/debug` page */
export interface IFlowDebug {
  errors?: string[];
  warnings?: string[];
  /** Names of templates nested in a template (`template` and `begin_template` rows) */
  nested_templates?: string[];
  /** Templates navigated to: `nav` and `begin_nav` rows, and `go_to` actions */
  navigation?: string[];
}

/** Lists of other flows a flow refers to, written to `_debug` */
export type IFlowDebugReference = "nested_templates" | "navigation";

/**
 * Collects the errors and warnings found while parsing a flow, along with the other flows it
 * refers to. Errors and warnings are logged to the console as warnings, and everything is
 * written to `_debug` of the processed flow json (see `applyTo`)
 */
export class FlowDebugLog {
  public readonly errors: string[] = [];
  public readonly warnings: string[] = [];
  public readonly references: Record<IFlowDebugReference, string[]> = {
    nested_templates: [],
    navigation: [],
  };

  /**
   * @param context shown with each console message, e.g. the flow_name
   * @param loggedWarnings warnings already logged to the console, added without logging again
   */
  constructor(
    private context = "",
    loggedWarnings: string[] = []
  ) {
    this.warnings.push(...loggedWarnings);
  }

  /** A problem that likely stops the flow working as authored, e.g. a missing `end_` row */
  public error(message: string) {
    this.errors.push(message);
    logWarning({ msg1: `[error] ${message}`, msg2: this.context });
  }

  /** A problem that was handled, but may need fixing in the sheet */
  public warning(message: string) {
    this.warnings.push(message);
    logWarning({ msg1: message, msg2: this.context });
  }

  /** Record a flow this flow refers to, listed once in the order first found. Not logged */
  public reference(type: IFlowDebugReference, name: string) {
    if (!this.references[type].includes(name)) this.references[type].push(name);
  }

  /**
   * Set `_debug` of a parsed flow to the collected messages and references. Any existing
   * `_debug` (e.g. from a copied app_data json) is removed, empty lists are omitted, and
   * `_debug` is omitted if all lists are empty
   */
  public applyTo<T extends FlowTypes.FlowTypeBase>(flow: T): T {
    const { _debug, ...rest } = flow;
    const debug: IFlowDebug = {};
    if (this.errors.length > 0) debug.errors = [...this.errors];
    if (this.warnings.length > 0) debug.warnings = [...this.warnings];
    for (const [type, names] of Object.entries(this.references)) {
      if (names.length > 0) debug[type as IFlowDebugReference] = [...names];
    }
    return (Object.keys(debug).length > 0 ? { ...rest, _debug: debug } : rest) as T;
  }
}
