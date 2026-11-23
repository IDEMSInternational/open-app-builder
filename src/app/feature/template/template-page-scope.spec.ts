import { Component, EnvironmentInjector, inject, input, ViewContainerRef } from "@angular/core";
import { fakeAsync, flushMicrotasks, TestBed } from "@angular/core/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { By } from "@angular/platform-browser";
import { FlowTypes } from "packages/data-models";
import { EMPTY, of } from "rxjs";
import { createReactiveComponentRef } from "src/app/reactive-templates/reactive-components/reactive-component-host";
import { REACTIVE_COMPONENT_MAP } from "src/app/reactive-templates/reactive-components/components";
import { ReactiveTemplateComponent } from "src/app/reactive-templates/reactive-template/reactive-template.component";
import { ActionRegistry } from "src/app/reactive-templates/services/action.registry";
import { ActionService } from "src/app/reactive-templates/services/action.service";
import { SetGlobalActionService } from "src/app/reactive-templates/services/actions/set-global.action";
import { DebugService } from "src/app/reactive-templates/services/debug.service";
import { EvaluationService } from "src/app/reactive-templates/services/evaluation.service";
import { NavigationService } from "src/app/reactive-templates/services/navigation-service";
import { RowRegistry } from "src/app/reactive-templates/services/row.registry";
import { VariableStore } from "src/app/reactive-templates/stores/variable-store";
import { TemplateActionRegistry } from "src/app/shared/components/template/services/instance/template-action.registry";
import { TemplateMetadataService } from "src/app/shared/components/template/services/template-metadata.service";
import { TemplateLifecycleService } from "src/app/shared/components/template/services/template-lifecycle.service";
import { TemplateService } from "src/app/shared/components/template/services/template.service";
import { AppConfigService } from "src/app/shared/services/app-config/app-config.service";
import { AppDataService } from "src/app/shared/services/data/app-data.service";
import { AnalyticsService } from "src/app/shared/services/analytics";
import { DeploymentService } from "src/app/shared/services/deployment/deployment.service";
import { SettingsService } from "src/app/shared/services/settings.service";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import { TemplateTranslateService } from "src/app/shared/components/template/services/template-translate.service";
import { IonicModule } from "@ionic/angular";
import { TemplatePage } from "./template.page";

@Component({ selector: "scope-probe", template: "" })
class ScopeProbeComponent {
  row = input<FlowTypes.TemplateRow>();
  namespace = input("");
  store = inject(VariableStore);
  viewContainer = inject(ViewContainerRef);
}

describe("reactive template page scope", () => {
  let unload: () => boolean;

  beforeEach(() => {
    // Use a separate target so Karma does not interpret the event as a test-page reload.
    const target = new EventTarget();
    const add = window.addEventListener.bind(window);
    const remove = window.removeEventListener.bind(window);
    spyOn(window, "addEventListener").and.callFake((type, listener, options) => {
      if (type === "beforeunload") {
        target.addEventListener(type, listener, options);
      } else {
        add(type, listener, options);
      }
    });
    spyOn(window, "removeEventListener").and.callFake((type, listener, options) => {
      if (type === "beforeunload") {
        target.removeEventListener(type, listener, options);
      } else {
        remove(type, listener, options);
      }
    });
    unload = () => target.dispatchEvent(new Event("beforeunload", { cancelable: true }));

    TestBed.configureTestingModule({
      declarations: [TemplatePage],
      imports: [
        ScopeProbeComponent,
        ReactiveTemplateComponent,
        IonicModule.forRoot({ animated: false }),
      ],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { params: { templateName: "test" } } } },
        {
          provide: Router,
          useValue: {
            events: EMPTY,
            url: "/template/test",
            navigate: jasmine.createSpy().and.resolveTo(true),
          },
        },
        { provide: DebugService, useValue: { isEnabled: () => false } },
        { provide: TemplateMetadataService, useValue: { templateName: () => "test" } },
        {
          provide: TemplateLifecycleService,
          useValue: jasmine.createSpyObj("TemplateLifecycleService", [
            "setActivePage",
            "clearActivePage",
          ]),
        },
        { provide: AppDataService, useValue: {} },
        {
          provide: AppConfigService,
          useValue: { changesWithInitialValue$: of({ APP_HEADER_DEFAULTS: { collapse: false } }) },
        },
        { provide: DeploymentService, useValue: { config: { useReactiveTemplates: true } } },
        { provide: SetGlobalActionService, useValue: {} },
        { provide: SettingsService, useValue: {} },
        { provide: AnalyticsService, useValue: {} },
        { provide: DynamicDataService, useValue: {} },
        { provide: TemplateTranslateService, useValue: { languageDirection: () => "ltr" } },
      ],
    });
    TestBed.overrideComponent(TemplatePage, { set: { template: "<scope-probe />" } });
  });

  it("isolates page locals and reactive dependencies but shares global and system values", () => {
    const first = createPage().debugElement.injector;
    const second = createPage().debugElement.injector;
    const firstStore = first.get(VariableStore);
    const secondStore = second.get(VariableStore);
    const firstEvaluation = first.get(EvaluationService);
    const secondEvaluation = second.get(EvaluationService);
    const local = { type: "local" as const, name: "child.grandchild.answer" };
    const global = { type: "global" as const, name: "page_scope_test_global" };
    const system = { type: "system" as const, name: "page_scope_test_system" };
    const observed: unknown[] = [];

    const subscription = secondStore
      .watchMultiple(
        secondEvaluation.getDependencies("local.child.grandchild.answer", "", "script")
      )
      .subscribe((values) => observed.push(values[local.name]));

    firstStore.set(local, "first");
    expect(secondStore.get(local)).toBeUndefined();
    expect(observed).toEqual([undefined]);

    secondStore.set(local, "second");
    expect(firstEvaluation.evaluateExpression("local.child.grandchild.answer", "", "script")).toBe(
      "first"
    );
    expect(secondEvaluation.evaluateExpression("local.child.grandchild.answer", "", "script")).toBe(
      "second"
    );
    expect(observed).toEqual([undefined, "second"]);

    firstStore.set(global, "shared global");
    firstStore.set(system, "shared system");
    expect(secondStore.get(global)).toBe("shared global");
    expect(secondStore.get(system)).toBe("shared system");
    subscription.unsubscribe();
  });

  it("uses the page scope for dynamically created rows", () => {
    const fixture = createPage();
    const page = fixture.debugElement.injector;
    const nested = fixture.debugElement.query(By.directive(ScopeProbeComponent)).componentInstance;
    expect(nested.store).toBe(page.get(VariableStore));

    const component = createReactiveComponentRef(
      ScopeProbeComponent,
      TestBed.inject(EnvironmentInjector),
      page,
      { type: "text", name: "probe", value: "", _nested_name: "probe" },
      "loop.0"
    );

    expect(component.instance.store).toBe(page.get(VariableStore));
    component.destroy();
  });

  it("keeps nested template values visible to their parent within a page", async () => {
    TestBed.overrideComponent(TemplatePage, {
      set: { template: '<oab-reactive-template [templateName]="templateName" />' },
    });
    const templateService = jasmine.createSpyObj("TemplateService", ["getTemplateByName"]);
    templateService.getTemplateByName.and.callFake(async (name: string) =>
      name === "test"
        ? {
            rows: [
              { type: "template", name: "child", _nested_name: "child", value: "nested", rows: [] },
              {
                type: "set_variable",
                name: "parentValue",
                _nested_name: "parentValue",
                value: "@local.child.childValue",
              },
            ],
          }
        : {
            rows: [
              {
                type: "set_variable",
                name: "childValue",
                _nested_name: "childValue",
                value: "initial",
              },
            ],
          }
    );
    TestBed.overrideProvider(TemplateService, { useValue: templateService });

    const fixture = createPage();
    for (let i = 0; i < 4; i++) {
      await fixture.whenStable();
      fixture.detectChanges();
    }

    const registry = fixture.debugElement.injector.get(RowRegistry);
    const store = fixture.debugElement.injector.get(VariableStore);
    expect(store.get({ type: "local", name: "parentValue" })).toBe("initial");

    await registry.get("child.childValue").setExpression("updated");
    await fixture.whenStable();
    expect(store.get({ type: "local", name: "parentValue" })).toBe("updated");
  });

  it("dispatches local actions to the calling page's registries", async () => {
    const first = createPage().debugElement.injector;
    const second = createPage().debugElement.injector;
    const row = jasmine.createSpyObj("row", ["row"]);
    row.row.and.returnValue({
      name: "button",
      action_list: [{ trigger: "click", action_id: "set_local", args: ["answer", "changed"] }],
    });
    const firstAnswer = jasmine.createSpyObj("answer", ["name", "setExpression"]);
    const secondAnswer = jasmine.createSpyObj("answer", ["name", "setExpression"]);
    firstAnswer.name.and.returnValue("answer");
    secondAnswer.name.and.returnValue("answer");
    first.get(RowRegistry).register(firstAnswer);
    second.get(RowRegistry).register(secondAnswer);

    await first.get(ActionService).handleActions(row, "click", "");

    expect(firstAnswer.setExpression).toHaveBeenCalledWith("changed");
    expect(secondAnswer.setExpression).not.toHaveBeenCalled();
    expect(first.get(ActionRegistry)).not.toBe(second.get(ActionRegistry));
    expect(first.get(RowRegistry)).not.toBe(second.get(RowRegistry));

    const customHandler = jasmine.createSpy("customHandler").and.resolveTo();
    TestBed.inject(TemplateActionRegistry).register({ set_local: customHandler }, true);
    await first.get(ActionService).handleActions(row, "click", "");
    expect(customHandler).toHaveBeenCalled();
  });

  it("isolates leave handlers by page and unregisters them when the row is destroyed", async () => {
    const first = createPage().debugElement.injector;
    const second = createPage().debugElement.injector;
    const firstNavigation = first.get(NavigationService);
    const secondNavigation = second.get(NavigationService);
    const router = TestBed.inject(Router);
    const action = spyOn(REACTIVE_COMPONENT_MAP.update.prototype, "execute").and.callFake(
      async function () {
        await Promise.resolve();
        this.onEmittedValue({ emitValue: "cancelled", emitData: undefined });
      }
    );
    const leave = createReactiveComponentRef(
      REACTIVE_COMPONENT_MAP.on_leave,
      TestBed.inject(EnvironmentInjector),
      first,
      {
        type: "on_leave",
        name: "leave",
        value: "",
        _nested_name: "leave",
        rows: [{ type: "update", name: "check", value: "", _nested_name: "check" }],
      },
      ""
    );
    leave.changeDetectorRef.detectChanges();

    expect(firstNavigation).not.toBe(secondNavigation);
    await secondNavigation.navigate(["/other"]);
    expect(action).not.toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledTimes(1);

    await firstNavigation.navigate(["/blocked"]);
    expect(action).toHaveBeenCalledTimes(1);
    expect(router.navigate).toHaveBeenCalledTimes(1);

    leave.destroy();
    await firstNavigation.navigate(["/allowed"]);
    expect(router.navigate).toHaveBeenCalledTimes(2);
  });

  it("runs eligible leave actions in order and stops when an action cancels", async () => {
    const page = createPage().debugElement.injector;
    const navigation = page.get(NavigationService);
    const router = TestBed.inject(Router);
    const executed: string[] = [];
    let cancel = true;
    spyOn(REACTIVE_COMPONENT_MAP.update.prototype, "execute").and.callFake(async function () {
      executed.push(this.row().name);
      this.onEmittedValue({
        emitValue: cancel && this.row().name === "cancel" ? "cancelled" : "completed",
        emitData: undefined,
      });
    });
    const leave = createReactiveComponentRef(
      REACTIVE_COMPONENT_MAP.on_leave,
      TestBed.inject(EnvironmentInjector),
      page,
      {
        type: "on_leave",
        name: "leave",
        value: "",
        _nested_name: "leave",
        rows: [
          { type: "update", name: "skipped", value: "", condition: false, _nested_name: "skipped" },
          { type: "update", name: "continue", value: "", _nested_name: "continue" },
          { type: "update", name: "cancel", value: "", _nested_name: "cancel" },
          { type: "update", name: "later", value: "", _nested_name: "later" },
        ],
      },
      ""
    );
    leave.changeDetectorRef.detectChanges();

    await navigation.navigate(["/blocked"]);
    expect(executed).toEqual(["continue", "cancel"]);
    expect(router.navigate).not.toHaveBeenCalled();

    cancel = false;
    await navigation.navigate(["/allowed"]);
    expect(executed).toEqual(["continue", "cancel", "continue", "cancel", "later"]);
    expect(router.navigate).toHaveBeenCalledWith(["/allowed"]);

    leave.instance.condition.set(false);
    await navigation.navigate(["/disabled"]);
    expect(executed).toEqual(["continue", "cancel", "continue", "cancel", "later"]);
    expect(router.navigate).toHaveBeenCalledWith(["/disabled"]);
    leave.destroy();
  });

  it("only runs the active page's leave actions on unload, including after returning to a cached page", fakeAsync(() => {
    const first = createPage();
    const second = createPage();
    const firstNavigation = first.debugElement.injector.get(NavigationService);
    const secondNavigation = second.debugElement.injector.get(NavigationService);
    const firstHandler = jasmine.createSpy("first leave").and.resolveTo(true);
    const secondHandler = jasmine.createSpy("second leave").and.resolveTo(true);
    firstNavigation.registerLeaveHandler(firstHandler);
    secondNavigation.registerLeaveHandler(secondHandler);

    first.componentInstance.ionViewWillEnter();
    first.componentInstance.ionViewWillLeave();
    second.componentInstance.ionViewWillEnter();
    expect(unload()).toBeTrue();
    flushMicrotasks();
    expect(firstHandler).not.toHaveBeenCalled();
    expect(secondHandler).toHaveBeenCalledTimes(1);

    second.componentInstance.ionViewWillLeave();
    first.componentInstance.ionViewWillEnter();
    unload();
    flushMicrotasks();
    expect(firstHandler).toHaveBeenCalledTimes(1);
    expect(secondHandler).toHaveBeenCalledTimes(1);

    first.destroy();
    unload();
    flushMicrotasks();
    expect(firstHandler).toHaveBeenCalledTimes(1);
    expect(secondHandler).toHaveBeenCalledTimes(1);
    expect(TestBed.inject(Router).navigate).not.toHaveBeenCalled();
  }));

  it("executes on_leave child actions during unload and does not repeat a pending leave check", fakeAsync(() => {
    const fixture = createPage();
    const page = fixture.debugElement.injector;
    const navigation = page.get(NavigationService);
    const warning = spyOn(console, "warn");
    const action = spyOn(REACTIVE_COMPONENT_MAP.update.prototype, "execute").and.callFake(
      async () => {
        await navigation.navigate(["/nested"]);
      }
    );
    const leave = createReactiveComponentRef(
      REACTIVE_COMPONENT_MAP.on_leave,
      TestBed.inject(EnvironmentInjector),
      page,
      {
        type: "on_leave",
        name: "leave",
        value: "",
        _nested_name: "leave",
        rows: [{ type: "update", name: "check", value: "", _nested_name: "check" }],
      },
      ""
    );
    leave.changeDetectorRef.detectChanges();
    fixture.componentInstance.ionViewWillEnter();

    unload();
    unload();
    flushMicrotasks();
    expect(action).toHaveBeenCalledTimes(1);
    expect(warning).toHaveBeenCalled();
    expect(TestBed.inject(Router).navigate).not.toHaveBeenCalled();

    void navigation.navigate(["/next"]);
    unload();
    flushMicrotasks();
    expect(action).toHaveBeenCalledTimes(2);
    expect(TestBed.inject(Router).navigate).toHaveBeenCalledOnceWith(["/next"]);
    leave.destroy();
  }));

  it("reports unload action failures and allows a later unload attempt", fakeAsync(() => {
    const fixture = createPage();
    const navigation = fixture.debugElement.injector.get(NavigationService);
    const error = new Error("unload failed");
    const log = spyOn(console, "error");
    const handler = jasmine.createSpy("leave").and.rejectWith(error);
    navigation.registerLeaveHandler(handler);
    fixture.componentInstance.ionViewWillEnter();

    unload();
    flushMicrotasks();
    expect(log).toHaveBeenCalledOnceWith(
      "[NavigationService] Leave actions failed during beforeunload",
      error
    );

    handler.and.resolveTo(true);
    unload();
    flushMicrotasks();
    expect(handler).toHaveBeenCalledTimes(2);
    expect(TestBed.inject(Router).navigate).not.toHaveBeenCalled();
  }));

  it("awaits leave handlers in order and propagates errors without navigating", async () => {
    const navigation = createPage().debugElement.injector.get(NavigationService);
    const router = TestBed.inject(Router);
    const calls: string[] = [];
    navigation.registerLeaveHandler(async () => {
      await Promise.resolve();
      calls.push("first");
      return true;
    });
    const unregisterFailure = navigation.registerLeaveHandler(async () => {
      calls.push("second");
      throw new Error("leave failed");
    });
    navigation.registerLeaveHandler(async () => {
      calls.push("third");
      return true;
    });

    await expectAsync(navigation.navigate(["/blocked"])).toBeRejectedWithError("leave failed");
    expect(calls).toEqual(["first", "second"]);
    expect(router.navigate).not.toHaveBeenCalled();

    unregisterFailure();
    await navigation.navigate(["/allowed"]);
    expect(router.navigate).toHaveBeenCalledOnceWith(["/allowed"]);
  });

  it("waits for the page's leave check without routing and prevents overlapping checks", async () => {
    const fixture = createPage();
    const navigation = fixture.debugElement.injector.get(NavigationService);
    const warning = spyOn(console, "warn");
    let resolve: (allowed: boolean) => void;
    const handler = jasmine
      .createSpy("leave")
      .and.callFake(() => new Promise<boolean>((done) => (resolve = done)));
    navigation.registerLeaveHandler(handler);

    const pending = fixture.componentInstance.canLeave();
    await Promise.resolve();
    expect(await fixture.componentInstance.canLeave()).toBeFalse();
    await navigation.navigate(["/ignored"]);
    expect(handler).toHaveBeenCalledTimes(1);
    expect(warning).toHaveBeenCalled();

    resolve!(false);
    expect(await pending).toBeFalse();
    handler.and.resolveTo(true);
    expect(await fixture.componentInstance.canLeave()).toBeTrue();
    expect(TestBed.inject(Router).navigate).not.toHaveBeenCalled();
  });

  it("only updates nav parameters after all leave actions allow navigation", async () => {
    const page = createPage().debugElement.injector;
    const navigation = page.get(NavigationService);
    const router = TestBed.inject(Router);
    const key = "navParam_/template/destination_answer";
    sessionStorage.setItem(key, "old");
    const unregister = navigation.registerLeaveHandler(async () => false);
    const nav = createReactiveComponentRef(
      REACTIVE_COMPONENT_MAP.nav,
      TestBed.inject(EnvironmentInjector),
      page,
      {
        type: "nav",
        name: "nav",
        value: "destination",
        _nested_name: "nav",
        rows: [{ type: "set_variable", name: "answer", value: "new", _nested_name: "answer" }],
      },
      ""
    );
    nav.instance.init();

    try {
      await nav.instance.execute();
      expect(router.navigate).not.toHaveBeenCalled();
      expect(sessionStorage.getItem(key)).toBe("old");

      unregister();
      await nav.instance.execute();
      expect(router.navigate).toHaveBeenCalledWith(["/template/destination"]);
      expect(sessionStorage.getItem(key)).toBe("new");
    } finally {
      nav.destroy();
      sessionStorage.removeItem(key);
    }
  });

  it("does not deadlock if a leave action attempts another navigation", async () => {
    const navigation = createPage().debugElement.injector.get(NavigationService);
    const router = TestBed.inject(Router);
    const warning = spyOn(console, "warn");
    navigation.registerLeaveHandler(async () => {
      await navigation.navigate(["/nested"]);
      return false;
    });

    await navigation.navigate(["/first"]);
    expect(warning).toHaveBeenCalled();
    expect(router.navigate).not.toHaveBeenCalled();
  });

  it("renders a confirmation popup and waits for stay or leave", async () => {
    const fixture = createPage();
    const page = fixture.debugElement.injector;
    const host: ScopeProbeComponent = fixture.debugElement.query(
      By.directive(ScopeProbeComponent)
    ).componentInstance;
    const leave = createReactiveComponentRef(
      REACTIVE_COMPONENT_MAP.on_leave,
      TestBed.inject(EnvironmentInjector),
      page,
      {
        type: "on_leave",
        name: "leave",
        value: "",
        _nested_name: "leave",
        rows: [
          {
            type: "popup",
            name: "confirm",
            value: "",
            _nested_name: "confirm",
            rows: [
              {
                type: "button",
                name: "stay",
                value: "Stay",
                _nested_name: "stay",
                action_list: [{ trigger: "click", action_id: "emit", args: ["cancelled"] }],
              },
              {
                type: "button",
                name: "go",
                value: "Leave",
                _nested_name: "go",
                action_list: [{ trigger: "click", action_id: "emit", args: ["completed"] }],
              },
            ],
          },
        ],
      },
      ""
    );
    host.viewContainer.insert(leave.hostView);
    fixture.detectChanges();
    const navigation = page.get(NavigationService);
    const router = TestBed.inject(Router);

    try {
      const first = navigation.navigate(["/first"]);
      const duplicate = navigation.navigate(["/second"]);
      await duplicate;
      const stay = await waitForElement('[data-test="stay"]', () => fixture.detectChanges());
      expect(router.navigate).not.toHaveBeenCalled();
      stay.click();
      fixture.detectChanges();
      await first;
      expect(router.navigate).not.toHaveBeenCalled();

      const next = navigation.navigate(["/next"]);
      const go = await waitForElement('[data-test="go"]', () => fixture.detectChanges());
      go.click();
      fixture.detectChanges();
      await next;
      expect(router.navigate).toHaveBeenCalledOnceWith(["/next"]);

      const closeAttempt = navigation.navigate(["/close"]);
      await waitForElement('[data-test="stay"]', () => fixture.detectChanges());
      const close = await waitForElement("ion-modal .close-button", () => fixture.detectChanges());
      close.click();
      fixture.detectChanges();
      await closeAttempt;
      expect(router.navigate).toHaveBeenCalledTimes(1);

      const backdropAttempt = navigation.navigate(["/backdrop"]);
      await waitForElement('[data-test="stay"]', () => fixture.detectChanges());
      const modal = document.querySelector<HTMLIonModalElement>("ion-modal");
      expect(modal).not.toBeNull();
      await modal!.dismiss(undefined, "backdrop");
      fixture.detectChanges();
      await backdropAttempt;
      expect(router.navigate).toHaveBeenCalledTimes(1);

      const destroyedAttempt = navigation.navigate(["/destroyed"]);
      await waitForElement('[data-test="stay"]', () => fixture.detectChanges());
      leave.destroy();
      await destroyedAttempt;
      expect(router.navigate).toHaveBeenCalledTimes(1);
    } finally {
      leave.destroy();
      fixture.destroy();
    }
  });

  it("resolves ordinary popup execution on dismissal or destruction", async () => {
    const page = createPage().debugElement.injector;
    const popup = createReactiveComponentRef(
      REACTIVE_COMPONENT_MAP.popup,
      TestBed.inject(EnvironmentInjector),
      page,
      { type: "popup", name: "popup", value: "", _nested_name: "popup" },
      ""
    );
    popup.instance.init();
    let resolved = false;
    const execution = popup.instance.execute().then(() => {
      resolved = true;
    });
    expect(popup.instance.isOpen()).toBeTrue();
    await Promise.resolve();
    expect(resolved).toBeFalse();

    popup.instance.dismiss();
    popup.instance.onDidDismiss();
    await execution;
    expect(resolved).toBeTrue();

    const reopened = popup.instance.execute();
    popup.destroy();
    await reopened;
  });
});

function createPage() {
  const fixture = TestBed.createComponent(TemplatePage);
  fixture.detectChanges();
  return fixture;
}

async function waitForElement(selector: string, detectChanges: () => void): Promise<HTMLElement> {
  for (let i = 0; i < 100; i++) {
    detectChanges();
    const element = document.querySelector<HTMLElement>(selector);
    if (element) {
      return element;
    }
    await new Promise((resolve) => setTimeout(resolve, 20));
  }
  throw new Error(`Timed out waiting for ${selector}`);
}
