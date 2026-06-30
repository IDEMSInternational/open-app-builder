import { ChangeDetectionStrategy, Component, computed, effect, inject } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { FlowTypes } from "packages/data-models";
import { isEqual } from "packages/shared/src/utils/object-utils";
import {
  defineAuthorParameterSchema,
  TemplateBaseComponentWithParams,
} from "src/app/shared/components/template/components/base";
import { TemplateFieldService } from "src/app/shared/components/template/services/template-field.service";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import {
  COURSES_DATA_LIST,
  IModuleTaskFilterFields,
  IUpNextValue,
  MODULE_TASKS_DATA_LIST,
  resolveUpNextValue,
  toSettledValue,
} from "./get-up-next.logic";

const AuthorSchema = defineAuthorParameterSchema((coerce) => ({}));

const FILTER_FIELD_NAMES = [
  "child_age_tag",
  "child_age",
  "child_gender",
  "user_gender",
  "user_relationship",
] as const satisfies readonly (keyof IModuleTaskFilterFields)[];

@Component({
  selector: "plh-get-up-next",
  template: "",
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class PlhGetUpNextComponent extends TemplateBaseComponentWithParams(AuthorSchema) {
  private dynamicDataService = inject(DynamicDataService);
  private templateFieldService = inject(TemplateFieldService);

  private moduleTasks = this.queryDataList(MODULE_TASKS_DATA_LIST);
  private courses = this.queryDataList(COURSES_DATA_LIST);

  private filterFields = computed<IModuleTaskFilterFields>(
    () =>
      Object.fromEntries(
        FILTER_FIELD_NAMES.map((field) => [field, this.templateFieldService.getField(field, false)])
      ) as IModuleTaskFilterFields
  );

  private resolved = computed(() =>
    resolveUpNextValue(this.moduleTasks(), this.filterFields(), this.courses())
  );

  /** Primary matched module task row, exposed for tests and debugging. */
  upNextTask = computed(() => this.resolved()?.task);

  constructor() {
    super();
    this.shouldShow.set(false);
    effect((onCleanup) => {
      this.rowSignal();
      const resolvedValue = this.resolved()?.value;
      if (!this.parent) return;

      let cancelled = false;
      onCleanup(() => {
        cancelled = true;
      });

      void (async () => {
        await this.setValueIfChanged({ check_complete: false });
        if (cancelled) return;

        if (!resolvedValue) {
          console.log("no in progress ATM");
        }

        await this.setValueIfChanged(toSettledValue(resolvedValue));
      })();
    });
  }

  private queryDataList(listName: string) {
    return toSignal(this.dynamicDataService.query$<FlowTypes.Data_listRow>("data_list", listName), {
      initialValue: [] as FlowTypes.Data_listRow[],
    });
  }

  private async setValueIfChanged(value: IUpNextValue) {
    if (!isEqual(value, this._row?.value)) {
      await this.setValue(value);
    }
  }
}
