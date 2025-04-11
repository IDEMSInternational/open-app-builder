import { ChangeDetectionStrategy, Component, computed, effect } from "@angular/core";
import { TemplateBaseComponent } from "../base";
import { SharedDataService } from "src/app/feature/shared-data/shared-data.service";
import { toObservable, toSignal } from "@angular/core/rxjs-interop";
import { switchMap, debounceTime, filter, of } from "rxjs";
import { isEqual } from "packages/shared/src/utils/object-utils";
import { AuthService } from "src/app/shared/services/auth/auth.service";

interface Params {
  id?: string;
  authId: string;
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
      const authId = this.authService.provider.authUser()?.uid;
      return { id, ...authorParams, authId };
    },
    { equal: isEqual }
  );

  // Subscribe to shared data if params includes a target list id
  private query$ = toObservable(this.params).pipe(
    filter((v) => v.authId !== undefined),
    debounceTime(50),
    switchMap((params) => {
      if (params.authId) {
        return this.service.query$(params.id);
      }
      return of([]);
    })
  );

  public data = toSignal(this.query$);

  constructor(
    private service: SharedDataService,
    private authService: AuthService
  ) {
    super();
    effect(async () => {
      const data = this.data();
      console.log("data", data);
    });
  }
}
