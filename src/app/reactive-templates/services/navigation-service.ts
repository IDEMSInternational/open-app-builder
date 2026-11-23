import { Injectable, OnDestroy } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({ providedIn: "root" })
export class NavigationService implements OnDestroy {
  private leaveHandlers = new Set<() => Promise<boolean>>();
  private leaveInProgress = false;
  private readonly beforeUnload = () => {
    console.log("[NavigationService] beforeunload event triggered");
    if (this.leaveInProgress) {
      return;
    }
    this.leaveInProgress = true;
    // Browsers do not wait for promises or support custom confirmation UI during unload.
    void this.runLeaveHandlers()
      .catch((error) => {
        console.error("[NavigationService] Leave actions failed during beforeunload", error);
      })
      .finally(() => {
        this.leaveInProgress = false;
      });
  };

  constructor(private readonly router: Router) {}

  public setActive(active: boolean): void {
    if (active) {
      window.addEventListener("beforeunload", this.beforeUnload);
    } else {
      window.removeEventListener("beforeunload", this.beforeUnload);
    }
  }

  public ngOnDestroy(): void {
    this.setActive(false);
  }

  public registerLeaveHandler(handler: () => Promise<boolean>): () => void {
    this.leaveHandlers.add(handler);

    return () => this.leaveHandlers.delete(handler);
  }

  public navigate(commands: any[], beforeNavigate?: () => void): Promise<void> {
    if (this.leaveInProgress) {
      console.warn("[NavigationService] Ignoring navigation while a leave check is in progress");
      return Promise.resolve();
    }
    this.leaveInProgress = true;
    return Promise.resolve()
      .then(() => this.runNavigation(commands, beforeNavigate))
      .finally(() => {
        this.leaveInProgress = false;
      });
  }

  public canLeave(): Promise<boolean> {
    if (this.leaveInProgress) {
      console.warn("[NavigationService] Ignoring navigation while a leave check is in progress");
      return Promise.resolve(false);
    }
    this.leaveInProgress = true;
    return Promise.resolve()
      .then(() => this.runLeaveHandlers())
      .finally(() => {
        this.leaveInProgress = false;
      });
  }

  private async runNavigation(commands: any[], beforeNavigate?: () => void): Promise<void> {
    if (!(await this.runLeaveHandlers())) {
      return;
    }

    beforeNavigate?.();
    await this.router.navigate(commands);
  }

  private async runLeaveHandlers(): Promise<boolean> {
    for (const handler of this.leaveHandlers) {
      if (!(await handler())) {
        return false;
      }
    }
    return true;
  }
}
