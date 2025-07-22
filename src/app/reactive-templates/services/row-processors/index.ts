import { InjectionToken } from "@angular/core";
import { ITypedRowProcessor } from "./non-display.row-processor";
import { VariableStore } from "../../stores/variable-store";
import { SetVariableRowProcessor } from "./set-variable.row-processor";

export const TYPED_ROW_PROCESSORS = new InjectionToken<ITypedRowProcessor[]>(
  "TYPED_ROW_PROCESSORS"
);

export const setVariableRowProcessorProvider = {
  provide: TYPED_ROW_PROCESSORS,
  useClass: SetVariableRowProcessor,
  deps: [VariableStore],
  multi: true,
};
