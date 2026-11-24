import { computed, effect, inject, Injectable, Signal, signal, untracked } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Router } from "@angular/router";
import { FlowTypes } from "src/app/shared/model";
import { SyncServiceBase } from "src/app/shared/services/syncService.base";
import { ngRouterMergedSnapshot$ } from "src/app/shared/utils/angular.utils";
import type { TemplateContainerComponent } from "../template-container.component";

/** Template container of a page, nav stack or standalone pop-up, resolved once its view has been created */
export type ITemplateContainerRef = Signal<TemplateContainerComponent | undefined>;

/**
 * Lifecycle of top-level templates (pages, nav stacks and standalone pop-ups, e.g. fullscreen): tracks
 * which one is in front and fires lifecycle triggers on it, currently `nav_enter` each time a template
 * comes to the front (first visit, back navigation, or a pop-up or nav stack above it closing).
 * The template page, nav-stack and pop-up components register their template containers.
 * Separate from `LifecycleActionsService`, which runs app-level launch actions
 */
@Injectable({ providedIn: "root" })
export class TemplateLifecycleService extends SyncServiceBase {
  private router = inject(Router);
  private snapshot = toSignal(ngRouterMergedSnapshot$(this.router));

  /** Container of the page currently shown in the main router outlet */
  private activePage = signal<ITemplateContainerRef | undefined>(undefined);
  /** Containers of open nav stacks and standalone pop-ups, from bottom to top */
  private overlays = signal<ITemplateContainerRef[]>([]);

  /** The template in front, or undefined while a pop-up covers it or it has not yet rendered */
  public front = computed(() => {
    if (this.snapshot()?.queryParams?.popup_child) return undefined;
    const ref = this.overlays().at(-1) ?? this.activePage();
    const container = ref?.();
    return container?.hasRendered() ? container : undefined;
  });

  private lastFront: TemplateContainerComponent | undefined;
  /** Templates that have come to the front */
  private entered = new WeakSet<TemplateContainerComponent>();
  /** Templates that have rendered while not in front, e.g. a page opened from inside a nav stack */
  private renderedCovered = new WeakSet<TemplateContainerComponent>();

  constructor() {
    super("TemplateLifecycle");
    effect(() => {
      const front = this.front();
      if (front === this.lastFront) return;
      this.lastFront = front;
      if (front) untracked(() => this.enter(front));
    });
    effect(() => {
      const front = this.front();
      for (const ref of [this.activePage(), ...this.overlays()]) {
        const container = ref?.();
        if (container && container !== front && container.hasRendered()) {
          this.renderedCovered.add(container);
        }
      }
    });
  }

  public setActivePage(ref: ITemplateContainerRef) {
    this.activePage.set(ref);
  }

  public clearActivePage(ref: ITemplateContainerRef) {
    if (this.activePage() === ref) this.activePage.set(undefined);
  }

  /** Add a nav stack or standalone pop-up that has opened above the current template */
  public addOverlay(ref: ITemplateContainerRef) {
    this.overlays.update((refs) => [...refs.filter((r) => r !== ref), ref]);
  }

  public removeOverlay(ref: ITemplateContainerRef) {
    this.overlays.update((refs) => refs.filter((r) => r !== ref));
  }

  private async enter(container: TemplateContainerComponent) {
    const firstEntry = !this.entered.has(container);
    this.entered.add(container);
    // rows may depend on fields changed while the template was covered (not if it is shown for the
    // first time and rendered in front)
    const reprocess = !firstEntry || this.renderedCovered.has(container);
    await this.emitTrigger(container, "nav_enter", { reprocess });
  }

  /** Emit a lifecycle trigger on a top-level template, if any of its rows declare actions for it */
  private async emitTrigger(
    container: TemplateContainerComponent,
    trigger: FlowTypes.TemplateRowActionTrigger,
    options: { reprocess?: boolean } = {}
  ) {
    if (!hasLifecycleActions(container.template?.rows, trigger)) return;
    if (options.reprocess) {
      // if one is already in progress (e.g. the template-nav service's when a pop-up closes or on
      // back navigation), wait for it rather than reprocess again at the same time
      const waited = await container.waitForRerender();
      if (!waited) await container.forceRerender(false);
    }
    await container.templateActionService.handleActions([
      { action_id: "emit", args: [trigger], trigger },
    ]);
  }
}

/**
 * Whether a template's own `update_action_list` rows declare actions for a lifecycle trigger
 * (rows of nested templates excluded)
 */
export function hasLifecycleActions(
  rows: FlowTypes.TemplateRow[] = [],
  trigger: FlowTypes.TemplateRowActionTrigger
): boolean {
  return rows.some((row) => {
    if (row.type === "update_action_list" && Array.isArray(row.action_list)) {
      return row.action_list.some((action) => action.trigger === trigger);
    }
    return (
      row.type !== "template" && Array.isArray(row.rows) && hasLifecycleActions(row.rows, trigger)
    );
  });
}
