import { Injectable } from "@angular/core";
import { BehaviorSubject, filter, firstValueFrom } from "rxjs";

/**
 * Tracks when app startup has finished: core services are ready, field defaults and globals are set,
 * startup templates are processed and launch actions have run (just before the main template renders).
 *
 * Use it to hold back work that should not run part-way through startup, such as the actions of a
 * notification whose tap opened the app.
 */
@Injectable({ providedIn: "root" })
export class AppStartupService {
  private complete$ = new BehaviorSubject(false);

  /** Whether app startup has finished */
  public get isComplete() {
    return this.complete$.value;
  }

  /** Mark app startup as finished. Called by the app component; later calls have no effect */
  public markComplete() {
    if (!this.complete$.value) {
      this.complete$.next(true);
    }
  }

  /** Resolves once app startup has finished, or immediately if it already has */
  public whenComplete(): Promise<boolean> {
    return firstValueFrom(this.complete$.pipe(filter((complete) => complete)));
  }
}
