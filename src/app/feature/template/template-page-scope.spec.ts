import { Component, EnvironmentInjector, inject, input } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { ActivatedRoute, Router } from "@angular/router";
import { By } from "@angular/platform-browser";
import { FlowTypes } from "packages/data-models";
import { EMPTY, of } from "rxjs";
import { createReactiveComponentRef } from "src/app/reactive-templates/reactive-components/reactive-component-host";
import { ReactiveTemplateComponent } from "src/app/reactive-templates/reactive-template/reactive-template.component";
import { ActionRegistry } from "src/app/reactive-templates/services/action.registry";
import { ActionService } from "src/app/reactive-templates/services/action.service";
import { SetGlobalActionService } from "src/app/reactive-templates/services/actions/set-global.action";
import { DebugService } from "src/app/reactive-templates/services/debug.service";
import { EvaluationService } from "src/app/reactive-templates/services/evaluation.service";
import { RowRegistry } from "src/app/reactive-templates/services/row.registry";
import { VariableStore } from "src/app/reactive-templates/stores/variable-store";
import { TemplateActionRegistry } from "src/app/shared/components/template/services/instance/template-action.registry";
import { TemplateMetadataService } from "src/app/shared/components/template/services/template-metadata.service";
import { TemplateService } from "src/app/shared/components/template/services/template.service";
import { AppConfigService } from "src/app/shared/services/app-config/app-config.service";
import { AppDataService } from "src/app/shared/services/data/app-data.service";
import { AnalyticsService } from "src/app/shared/services/analytics";
import { DeploymentService } from "src/app/shared/services/deployment/deployment.service";
import { SettingsService } from "src/app/shared/services/settings.service";
import { TemplatePage } from "./template.page";

@Component({ selector: "scope-probe", template: "" })
class ScopeProbeComponent {
  row = input<FlowTypes.TemplateRow>();
  namespace = input("");
  store = inject(VariableStore);
}

describe("reactive template page scope", () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TemplatePage],
      imports: [ScopeProbeComponent, ReactiveTemplateComponent],
      providers: [
        { provide: ActivatedRoute, useValue: { snapshot: { params: { templateName: "test" } } } },
        { provide: Router, useValue: { events: EMPTY, url: "/template/test" } },
        { provide: DebugService, useValue: { isEnabled: () => false } },
        { provide: TemplateMetadataService, useValue: { templateName: () => "test" } },
        { provide: AppDataService, useValue: {} },
        {
          provide: AppConfigService,
          useValue: { changesWithInitialValue$: of({ APP_HEADER_DEFAULTS: { collapse: false } }) },
        },
        { provide: DeploymentService, useValue: { config: { useReactiveTemplates: true } } },
        { provide: SetGlobalActionService, useValue: {} },
        { provide: SettingsService, useValue: {} },
        { provide: AnalyticsService, useValue: {} },
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
});

function createPage() {
  const fixture = TestBed.createComponent(TemplatePage);
  fixture.detectChanges();
  return fixture;
}
