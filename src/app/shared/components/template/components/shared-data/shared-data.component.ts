import { ChangeDetectionStrategy, Component, computed, effect, output } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { SharedDataService } from "src/app/feature/shared-data/shared-data.service";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { switchMap, debounceTime, filter } from "rxjs";
import { isEqual } from "packages/shared/src/utils/object-utils";
import { AuthService } from "src/app/shared/services/auth/auth.service";
import { ISharedDataCollection } from "src/app/feature/shared-data/types";

interface Params {
  id?: string;
  authId: string;
}

interface IAuthorParams {
  // not currently in use
}

/** Template component that renders result of shared data query */
@Component({
  selector: "tmpl-shared-data",
  templateUrl: "./shared-data.component.html",
  styleUrls: ["./shared-data.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false,
})
export class TmplSharedDataComponent extends TemplateBaseComponent {
  private params = computed<Params>(
    () => {
      const id = this.value();
      const authorParams = this.parameterList() as IAuthorParams;
      const authId = this.authService.authUser()?.uid;
      return { id, ...authorParams, authId };
    },
    { equal: isEqual }
  );

  // Subscribe to shared data if params includes a target list id
  private query$ = toObservable(this.params).pipe(
    filter((v) => v.authId !== undefined),
    debounceTime(50),
    switchMap(({ id }) => this.service.query$(id))
  );

  private queryData = toSignal(this.query$, { initialValue: [] });

  public itemChanged = output<ISharedDataCollection>();
  public itemsChanged = output<ISharedDataCollection[]>();

  /** Array of items returned when querying for all docs in a collection */
  private items = computed(() => {
    const data = this.queryData();
    return data;
  });

  /** Single item returned when querying a specific doc by id */
  private item = computed(() => {
    const data = this.queryData();
    return data[0];
  });

  constructor(
    private service: SharedDataService,
    private authService: AuthService
  ) {
    super();
    effect(() => {
      const items = this.items();
      this.itemsChanged.emit(items);
    });
    effect(() => {
      const item = this.item();
      this.itemChanged.emit(item);
    });
  }
}
