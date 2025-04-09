import { ChangeDetectionStrategy, Component, computed, effect } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { SharedDataService } from "src/app/feature/shared-data/shared-data.service";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { switchMap, debounceTime } from "rxjs";
import { isEqual } from "packages/shared/src/utils/object-utils";

interface Params {
  id?: string;
}

interface IAuthorParams {
  // not currently in use
}

/** Template component that renders result of shared data query */
@Component({
  selector: "plh-shared-data",
  templateUrl: "./shared-data.component.html",
  styleUrls: ["./shared-data.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TmplSharedDataComponent extends TemplateBaseComponent {
  private params = computed<Params>(
    () => {
      const id = this.value();
      const authorParams = this.parameterList() as IAuthorParams;
      return { id, ...authorParams };
    },
    { equal: isEqual }
  );

  // Subscribe to shared data if params includes a target list id
  private query$ = toObservable(this.params).pipe(
    debounceTime(50),
    switchMap((params) => this.subscribeToSharedData(params))
  );

  public data = toSignal(this.query$);

  constructor(private service: SharedDataService) {
    super();
    effect(async () => {
      const data = this.data();
      console.log("data", data);
    });
  }

  private subscribeToSharedData(params: Params) {
    const { id } = params;
    console.log("subscribe to data", params);
    // TODO - allow either list or document to be set from value (?)
    // TODO - handle single vs multiple query
    return this.service.query$(id);
  }
}
