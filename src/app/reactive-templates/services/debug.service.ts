import { effect, inject, Injectable, signal } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Router } from "@angular/router";
import { ngRouterMergedSnapshot$ } from "src/app/shared/utils/angular.utils";

@Injectable({
  providedIn: "root",
})
export class DebugService {
  private router = inject(Router);
  private snapshot = toSignal(ngRouterMergedSnapshot$(this.router));

  private _isEnabled = signal(false);
  public isEnabled = this._isEnabled.asReadonly();

  public _showAllInfo = signal(false);
  public showAllInfo = this._showAllInfo.asReadonly();

  constructor() {
    effect(() => {
      const debugMode = this.snapshot().queryParams.debugMode === "true";
      this._isEnabled.set(debugMode);
    });
  }

  public toggleAllInfo() {
    this._showAllInfo.update((value) => !value);
  }
}
