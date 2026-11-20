/* eslint-disable jasmine/no-unsafe-spy */
import { signal, WritableSignal } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { provideRouter, Router } from "@angular/router";
import { FlowTypes } from "src/app/shared/model";
import type { TemplateContainerComponent } from "../template-container.component";
import { hasLifecycleActions, TemplateLifecycleService } from "./template-lifecycle.service";
import { TemplateService } from "./template.service";

interface IMockContainer {
  renderCount: WritableSignal<number>;
  template: { rows: any[] };
  forceRerender: jasmine.Spy;
  templateActionService: { handleActions: jasmine.Spy };
}

const NAV_ENTER_ROW = {
  type: "update_action_list",
  name: "on_enter",
  action_list: [{ trigger: "nav_enter", action_id: "set_field", args: ["seen", true] }],
};

function mockContainer(options: { navEnter?: boolean; rendered?: boolean } = {}) {
  const { navEnter = true, rendered = true } = options;
  const container: IMockContainer = {
    renderCount: signal(rendered ? 1 : 0),
    template: { rows: navEnter ? [NAV_ENTER_ROW] : [] },
    forceRerender: jasmine.createSpy("forceRerender").and.resolveTo(),
    templateActionService: { handleActions: jasmine.createSpy("handleActions").and.resolveTo() },
  };
  const ref = signal(container as unknown as TemplateContainerComponent);
  return { container, ref };
}

/** Number of times nav_enter has been emitted on a container */
function entries(container: IMockContainer) {
  return container.templateActionService.handleActions.calls
    .allArgs()
    .filter(([actions]) => actions[0]?.args?.[0] === "nav_enter").length;
}

describe("TemplateLifecycleService nav_enter", () => {
  let service: TemplateLifecycleService;
  let router: Router;
  let standaloneTemplateName: WritableSignal<string | undefined>;

  /** Run pending effects and the async work they start */
  async function flush() {
    TestBed.tick();
    await new Promise((resolve) => setTimeout(resolve));
  }

  beforeEach(() => {
    standaloneTemplateName = signal(undefined);
    TestBed.configureTestingModule({
      providers: [
        provideRouter([{ path: "**", children: [] }]),
        { provide: TemplateService, useValue: { standaloneTemplateName } },
      ],
    });
    service = TestBed.inject(TemplateLifecycleService);
    router = TestBed.inject(Router);
  });

  it("fires on the first visit to a page, without reprocessing it", async () => {
    const page = mockContainer();
    service.setActivePage(page.ref);
    await flush();
    expect(entries(page.container)).toBe(1);
    expect(page.container.templateActionService.handleActions).toHaveBeenCalledWith([
      { action_id: "emit", args: ["nav_enter"], trigger: "nav_enter" },
    ]);
    expect(page.container.forceRerender).not.toHaveBeenCalled();
  });

  it("waits until the template has rendered", async () => {
    const page = mockContainer({ rendered: false });
    service.setActivePage(page.ref);
    await flush();
    expect(entries(page.container)).toBe(0);
    page.container.renderCount.set(1);
    await flush();
    expect(entries(page.container)).toBe(1);
  });

  it("does nothing for a template without nav_enter actions", async () => {
    const page = mockContainer({ navEnter: false });
    service.setActivePage(page.ref);
    const stack = mockContainer();
    await flush();
    service.addNavStack(stack.ref);
    await flush();
    service.removeNavStack(stack.ref);
    await flush();
    expect(page.container.templateActionService.handleActions).not.toHaveBeenCalled();
    expect(page.container.forceRerender).not.toHaveBeenCalled();
  });

  it("fires on a nav stack when it opens, and on the page, reprocessed, when it closes", async () => {
    const page = mockContainer();
    const stack = mockContainer();
    service.setActivePage(page.ref);
    await flush();
    service.addNavStack(stack.ref);
    await flush();
    expect(entries(stack.container)).toBe(1);
    expect(entries(page.container)).toBe(1);

    service.removeNavStack(stack.ref);
    await flush();
    expect(entries(page.container)).toBe(2);
    expect(page.container.forceRerender).toHaveBeenCalledOnceWith(false);
  });

  it("fires on the nav stack below when the top nav stack closes", async () => {
    const page = mockContainer();
    const lower = mockContainer();
    const upper = mockContainer();
    service.setActivePage(page.ref);
    await flush();
    service.addNavStack(lower.ref);
    await flush();
    service.addNavStack(upper.ref);
    await flush();

    service.removeNavStack(upper.ref);
    await flush();
    expect(entries(lower.container)).toBe(2);
    expect(entries(page.container)).toBe(1);
  });

  it("fires once on the page when all nav stacks close together", async () => {
    const page = mockContainer();
    const lower = mockContainer();
    const upper = mockContainer();
    service.setActivePage(page.ref);
    await flush();
    service.addNavStack(lower.ref);
    await flush();
    service.addNavStack(upper.ref);
    await flush();

    service.removeNavStack(upper.ref);
    service.removeNavStack(lower.ref);
    await flush();
    expect(entries(page.container)).toBe(2);
    expect(entries(lower.container)).toBe(1);
  });

  it("does not fire while a pop-up is open, then fires on the template it covered", async () => {
    const page = mockContainer();
    service.setActivePage(page.ref);
    await flush();
    await router.navigate(["home"], { queryParams: { popup_child: "my_popup" } });
    await flush();
    expect(entries(page.container)).toBe(1);

    await router.navigate(["home"], { queryParams: { popup_child: null } });
    await flush();
    expect(entries(page.container)).toBe(2);
  });

  it("fires on the nav stack, not the page, when a pop-up inside the nav stack closes", async () => {
    const page = mockContainer();
    const stack = mockContainer();
    service.setActivePage(page.ref);
    await flush();
    service.addNavStack(stack.ref);
    await flush();
    await router.navigate(["home"], { queryParams: { popup_child: "my_popup" } });
    await flush();
    await router.navigate(["home"], { queryParams: { popup_child: null } });
    await flush();
    expect(entries(stack.container)).toBe(2);
    expect(entries(page.container)).toBe(1);
  });

  it("treats a fullscreen pop-up as covering the template in front", async () => {
    const page = mockContainer();
    service.setActivePage(page.ref);
    await flush();
    standaloneTemplateName.set("my_fullscreen_popup");
    await flush();
    expect(entries(page.container)).toBe(1);
    standaloneTemplateName.set(undefined);
    await flush();
    expect(entries(page.container)).toBe(2);
  });

  it("follows the page shown when navigating away and back", async () => {
    const first = mockContainer();
    const second = mockContainer();
    service.setActivePage(first.ref);
    await flush();
    service.clearActivePage(first.ref);
    service.setActivePage(second.ref);
    await flush();
    expect(entries(second.container)).toBe(1);

    service.clearActivePage(second.ref);
    service.setActivePage(first.ref);
    await flush();
    expect(entries(first.container)).toBe(2);
    expect(first.container.forceRerender).toHaveBeenCalledOnceWith(false);
  });

  it("ignores clearing a page that is not the one shown", async () => {
    const first = mockContainer();
    const second = mockContainer();
    service.setActivePage(first.ref);
    await flush();
    service.setActivePage(second.ref);
    service.clearActivePage(first.ref);
    await flush();
    expect(service.front()).toBe(second.ref());
  });

  it("does not fire again while the same template stays in front", async () => {
    const page = mockContainer();
    service.setActivePage(page.ref);
    await flush();
    service.setActivePage(page.ref);
    await flush();
    expect(entries(page.container)).toBe(1);
  });

  it("fires again, without reprocessing, when the template in front is reloaded", async () => {
    const page = mockContainer();
    service.setActivePage(page.ref);
    await flush();
    // emit: force_reload renders the template again
    page.container.renderCount.update((n) => n + 1);
    await flush();
    expect(entries(page.container)).toBe(2);
    expect(page.container.forceRerender).not.toHaveBeenCalled();
  });

  it("does not fire on a reload while covered, then fires once when back in front", async () => {
    const page = mockContainer();
    const stack = mockContainer();
    service.setActivePage(page.ref);
    await flush();
    service.addNavStack(stack.ref);
    await flush();
    page.container.renderCount.update((n) => n + 1);
    await flush();
    expect(entries(page.container)).toBe(1);

    service.removeNavStack(stack.ref);
    await flush();
    expect(entries(page.container)).toBe(2);
  });

  // nav_enter | emit: force_reload, with the effect running during or after its actions
  for (const effectTiming of ["during", "after"]) {
    it(`does not fire again when its own nav_enter actions reload it (effect ${effectTiming})`, async () => {
      const page = mockContainer();
      page.container.templateActionService.handleActions.and.callFake(async () => {
        page.container.renderCount.update((n) => n + 1);
        if (effectTiming === "during") await flush();
      });
      service.setActivePage(page.ref);
      await flush();
      await flush();
      expect(entries(page.container)).toBe(1);

      // a later reload, e.g. from a button, still fires
      page.container.renderCount.update((n) => n + 1);
      await flush();
      await flush();
      expect(entries(page.container)).toBe(2);
    });
  }
});

describe("hasLifecycleActions", () => {
  const row = (overrides: Partial<FlowTypes.TemplateRow>) =>
    ({ name: "row", type: "text", ...overrides }) as FlowTypes.TemplateRow;

  it("finds actions for the trigger in update_action_list rows, including inside display groups", () => {
    expect(hasLifecycleActions([NAV_ENTER_ROW as any], "nav_enter")).toBeTrue();
    const displayGroup = row({ type: "display_group", rows: [NAV_ENTER_ROW as any] });
    expect(hasLifecycleActions([displayGroup], "nav_enter")).toBeTrue();
  });

  it("ignores nested templates, other rows and other triggers", () => {
    const nestedTemplate = row({ type: "template", rows: [NAV_ENTER_ROW as any] });
    expect(hasLifecycleActions([nestedTemplate], "nav_enter")).toBeFalse();
    expect(hasLifecycleActions([NAV_ENTER_ROW as any], "nav_resume")).toBeFalse();
    expect(hasLifecycleActions(undefined, "nav_enter")).toBeFalse();
  });
});
