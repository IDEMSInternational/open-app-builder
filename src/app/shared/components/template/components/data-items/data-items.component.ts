import { ChangeDetectionStrategy, Component } from "@angular/core";
import { FlowTypes } from "../../models";
import { TemplateBaseComponent } from "../base";
import { DataItemsService } from "./data-items.service";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { switchMap, filter } from "rxjs";

@Component({
  selector: "plh-data-items",
  templateUrl: "./data-items.component.html",
  styleUrls: ["./data-items.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
/**
 * Data Items are a structural row component that subscribes to a dynamic data list
 * and re-renders child components on change
 *
 * TODO
 * - Would be better if can render children without container (like regular items)
 * - Should be refactored into structural container instead of display component
 * - Could possibly refactor to feature module including services
 */
export class TmplDataItemsComponent extends TemplateBaseComponent {
  // HACK - create signal from combination of signals and observables
  // https://github.com/angular/angular/issues/53519
  public itemRows = toSignal(
    toObservable(this.rowSignal).pipe(
      filter((row) => row !== undefined),
      switchMap((row) => this.subscribeToDynamicData(row))
    )
  );

  constructor(private dataItemsService: DataItemsService) {
    super();
  }

  private subscribeToDynamicData(row: FlowTypes.TemplateRow) {
    const { templateRowMap } = this.parent;
    return this.dataItemsService.getItemsObservable(row, templateRowMap);
  }
}
