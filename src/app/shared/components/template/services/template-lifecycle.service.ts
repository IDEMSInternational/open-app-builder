import { computed, effect, inject, Injectable, Signal, signal, untracked } from "@angular/core";
import { toSignal } from "@angular/core/rxjs-interop";
import { Router } from "@angular/router";
import { FlowTypes } from "src/app/shared/model";
import { SyncServiceBase } from "src/app/shared/services/syncService.base";
import { ngRouterMergedSnapshot$ } from "src/app/shared/utils/angular.utils";
import type { TemplateContainerComponent } from "../template-container.component";
import { TemplateService } from "./template.service";

/** Template container of a page or nav stack, resolved once its view has been created */
export type ITemplateContainerRef = Signal<TemplateContainerComponent | undefined>;

/**
 * Lifecycle of top-level templates (pages and nav stacks): tracks which one is in front and fires
 * lifecycle triggers on it, currently `nav_enter` each time a template comes to the front (first
 * visit, back navigation, or a pop-up or nav stack above it closing).
 * The template page and nav-stack components register their template containers.
 * Separate from `LifecycleActionsService`, which runs app-level launch actions
 */
@Injectable({ providedIn: "root" })
export class TemplateLifecycleService extends SyncServiceBase {
  private router = inject(Router);
  private templateService = inject(TemplateService);
  private snapshot = toSignal(ngRouterMergedSnapshot$(this.router));

  /** Container of the page currently shown in the main router outlet */
  private activePage = signal<ITemplateContainerRef | undefined>(undefined);
  /** Containers of open nav stacks, from bottom to top */
  private navStacks = signal<ITemplateContainerRef[]>([]);

  /** The template in front, or undefined while a pop-up covers it or it has not yet rendered */
  public front = computed(() => {
    const popupOpen =
      !!this.snapshot()?.queryParams?.popup_child ||
      !!this.templateService.standaloneTemplateName();
    if (popupOpen) return undefined;
    const ref = this.navStacks().at(-1) ?? this.activePage();
    const container = ref?.();
    return container?.hasRendered() ? container : undefined;
  });

  private lastFront: TemplateContainerComponent | undefined;
  private enteredContainers = new WeakSet<TemplateContainerComponent>();

  constructor() {
    super("TemplateLifecycle");
    effect(() => {
      const front = this.front();
      if (front === this.lastFront) return;
      this.lastFront = front;
      if (front) untracked(() => this.enter(front));
    });
  }

  public setActivePage(ref: ITemplateContainerRef) {
    this.activePage.set(ref);
  }

  public clearActivePage(ref: ITemplateContainerRef) {
    if (this.activePage() === ref) this.activePage.set(undefined);
  }

  public addNavStack(ref: ITemplateContainerRef) {
    this.navStacks.update((refs) => [...refs.filter((r) => r !== ref), ref]);
  }

  public removeNavStack(ref: ITemplateContainerRef) {
    this.navStacks.update((refs) => refs.filter((r) => r !== ref));
  }

  private async enter(container: TemplateContainerComponent) {
    const firstEntry = !this.enteredContainers.has(container);
    this.enteredContainers.add(container);
    // rows may depend on fields changed while the template was covered (already current on first entry)
    await this.emitTrigger(container, "nav_enter", { reprocess: !firstEntry });
  }

  /** Emit a lifecycle trigger on a top-level template, if any of its rows declare actions for it */
  private async emitTrigger(
    container: TemplateContainerComponent,
    trigger: FlowTypes.TemplateRowActionTrigger,
    options: { reprocess?: boolean } = {}
  ) {
    if (!hasLifecycleActions(container.template?.rows, trigger)) return;
    if (options.reprocess) {
      await container.forceRerender(false);
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
