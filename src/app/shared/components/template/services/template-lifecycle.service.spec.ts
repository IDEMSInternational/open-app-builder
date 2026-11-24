/* eslint-disable jasmine/no-unsafe-spy */
import { signal, WritableSignal } from "@angular/core";
import { TestBed } from "@angular/core/testing";
import { provideRouter, Router } from "@angular/router";
import { FlowTypes } from "src/app/shared/model";
import type { TemplateContainerComponent } from "../template-container.component";
import { hasLifecycleActions, TemplateLifecycleService } from "./template-lifecycle.service";

interface IMockContainer {
  renderCount: WritableSignal<number>;
  rendersStarted: number;
  template: { rows: any[] };
  forceRerender: jasmine.Spy;
  waitForRerender: jasmine.Spy;
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
    rendersStarted: rendered ? 1 : 0,
    template: { rows: navEnter ? [NAV_ENTER_ROW] : [] },
    forceRerender: jasmine.createSpy("forceRerender").and.resolveTo(),
    waitForRerender: jasmine.createSpy("waitForRerender").and.resolveTo(false),
    templateActionService: { handleActions: jasmine.createSpy("handleActions").and.resolveTo() },
  };
  const ref = signal(container as unknown as TemplateContainerComponent);
  return { container, ref };
}

/** Start rendering a template, returning a function that completes the render */
function startRender(container: IMockContainer) {
  container.rendersStarted++;
  return () => container.renderCount.update((n) => n + 1);
}

/** Render a template again, e.g. `emit: force_reload` */
function reload(container: IMockContainer) {
  startRender(container)();
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

  /** Run pending effects and the async work they start */
  async function flush() {
    TestBed.tick();
    await new Promise((resolve) => setTimeout(resolve));
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([{ path: "**", children: [] }])],
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
    reload(page.container);
    await flush();
    expect(entries(page.container)).toBe(1);
    expect(page.container.forceRerender).not.toHaveBeenCalled();
  });

  it("does nothing for a template without nav_enter actions", async () => {
    const page = mockContainer({ navEnter: false });
    service.setActivePage(page.ref);
    const stack = mockContainer();
    await flush();
    service.addOverlay(stack.ref);
    await flush();
    service.removeOverlay(stack.ref);
    await flush();
    expect(page.container.templateActionService.handleActions).not.toHaveBeenCalled();
    expect(page.container.forceRerender).not.toHaveBeenCalled();
  });

  it("fires on a nav stack when it opens, and on the page, reprocessed, when it closes", async () => {
    const page = mockContainer();
    const stack = mockContainer();
    service.setActivePage(page.ref);
    await flush();
    service.addOverlay(stack.ref);
    await flush();
    expect(entries(stack.container)).toBe(1);
    expect(entries(page.container)).toBe(1);

    service.removeOverlay(stack.ref);
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
    service.addOverlay(lower.ref);
    await flush();
    service.addOverlay(upper.ref);
    await flush();

    service.removeOverlay(upper.ref);
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
    service.addOverlay(lower.ref);
    await flush();
    service.addOverlay(upper.ref);
    await flush();

    service.removeOverlay(upper.ref);
    service.removeOverlay(lower.ref);
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
    service.addOverlay(stack.ref);
    await flush();
    await router.navigate(["home"], { queryParams: { popup_child: "my_popup" } });
    await flush();
    await router.navigate(["home"], { queryParams: { popup_child: null } });
    await flush();
    expect(entries(stack.container)).toBe(2);
    expect(entries(page.container)).toBe(1);
  });

  it("fires on a fullscreen pop-up when it opens, and on the page when it closes", async () => {
    const page = mockContainer();
    const popup = mockContainer();
    service.setActivePage(page.ref);
    await flush();
    service.addOverlay(popup.ref);
    await flush();
    expect(entries(popup.container)).toBe(1);
    expect(entries(page.container)).toBe(1);

    service.removeOverlay(popup.ref);
    await flush();
    expect(entries(page.container)).toBe(2);
    expect(page.container.forceRerender).toHaveBeenCalledOnceWith(false);
  });

  it("fires on the fullscreen pop-up below when one fullscreen pop-up opens another", async () => {
    const page = mockContainer();
    const lower = mockContainer();
    const upper = mockContainer();
    service.setActivePage(page.ref);
    await flush();
    service.addOverlay(lower.ref);
    await flush();
    service.addOverlay(upper.ref);
    await flush();
    service.removeOverlay(upper.ref);
    await flush();
    expect(entries(lower.container)).toBe(2);
    expect(entries(page.container)).toBe(1);

    service.removeOverlay(lower.ref);
    await flush();
    expect(entries(page.container)).toBe(2);
  });

  it("fires on a nav stack opened from a fullscreen pop-up, then on the pop-up when it closes", async () => {
    const page = mockContainer();
    const popup = mockContainer();
    const stack = mockContainer();
    service.setActivePage(page.ref);
    await flush();
    service.addOverlay(popup.ref);
    await flush();
    service.addOverlay(stack.ref);
    await flush();
    expect(entries(stack.container)).toBe(1);

    service.removeOverlay(stack.ref);
    await flush();
    expect(entries(popup.container)).toBe(2);
    expect(entries(page.container)).toBe(1);
  });

  it("does not fire on a fullscreen pop-up until it has rendered, covering the page meanwhile", async () => {
    const page = mockContainer();
    const popup = mockContainer({ rendered: false });
    service.setActivePage(page.ref);
    await flush();
    service.addOverlay(popup.ref);
    await flush();
    expect(service.front()).toBeUndefined();
    expect(entries(popup.container)).toBe(0);

    reload(popup.container);
    await flush();
    expect(entries(popup.container)).toBe(1);
    expect(entries(page.container)).toBe(1);
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

  // e.g. a `go_to` from inside a nav stack, or a page shown under launch pop-ups
  it("reprocesses a page on its first entry if it rendered while covered by a nav stack", async () => {
    const page = mockContainer();
    const stack = mockContainer();
    service.addOverlay(stack.ref);
    await flush();
    service.setActivePage(page.ref);
    await flush();
    expect(entries(page.container)).toBe(0);

    service.removeOverlay(stack.ref);
    await flush();
    expect(entries(page.container)).toBe(1);
    expect(page.container.forceRerender).toHaveBeenCalledOnceWith(false);
  });

  it("reprocesses a page on its first entry if it rendered while covered by a pop-up", async () => {
    const page = mockContainer({ rendered: false });
    const launchPopup = mockContainer({ navEnter: false });
    service.setActivePage(page.ref);
    service.addOverlay(launchPopup.ref);
    await flush();
    reload(page.container);
    await flush();
    expect(entries(page.container)).toBe(0);

    service.removeOverlay(launchPopup.ref);
    await flush();
    expect(entries(page.container)).toBe(1);
    expect(page.container.forceRerender).toHaveBeenCalledOnceWith(false);
  });

  it("waits for a reprocess already in progress instead of starting another", async () => {
    const page = mockContainer();
    service.setActivePage(page.ref);
    await flush();
    await router.navigate(["home"], { queryParams: { popup_child: "my_popup" } });
    await flush();

    // the template-nav service starts reprocessing the page as the pop-up closes
    let finishReprocess: () => void;
    page.container.waitForRerender.and.returnValue(
      new Promise<boolean>((resolve) => (finishReprocess = () => resolve(true)))
    );
    await router.navigate(["home"], { queryParams: { popup_child: null } });
    await flush();
    expect(entries(page.container)).toBe(1);

    finishReprocess();
    await flush();
    expect(entries(page.container)).toBe(2);
    expect(page.container.forceRerender).not.toHaveBeenCalled();
  });

  it("fires again, without reprocessing, when the template in front is reloaded", async () => {
    const page = mockContainer();
    service.setActivePage(page.ref);
    await flush();
    reload(page.container);
    await flush();
    expect(entries(page.container)).toBe(2);
    expect(page.container.forceRerender).not.toHaveBeenCalled();
  });

  it("does not fire on a reload while covered, then fires once when back in front", async () => {
    const page = mockContainer();
    const stack = mockContainer();
    service.setActivePage(page.ref);
    await flush();
    service.addOverlay(stack.ref);
    await flush();
    reload(page.container);
    await flush();
    expect(entries(page.container)).toBe(1);

    service.removeOverlay(stack.ref);
    await flush();
    expect(entries(page.container)).toBe(2);
  });

  // nav_enter | emit: force_reload, with the effect running during or after its actions
  for (const effectTiming of ["during", "after"]) {
    it(`does not fire again when its own nav_enter actions reload it (effect ${effectTiming})`, async () => {
      const page = mockContainer();
      page.container.templateActionService.handleActions.and.callFake(async () => {
        reload(page.container);
        if (effectTiming === "during") await flush();
      });
      service.setActivePage(page.ref);
      await flush();
      await flush();
      expect(entries(page.container)).toBe(1);

      // a later reload, e.g. from a button, still fires
      reload(page.container);
      await flush();
      await flush();
      expect(entries(page.container)).toBe(2);
    });
  }

  // e.g. `nav_resume | emit: force_reload` when going back to a page, finishing after its nav_enter actions
  it("does not fire again for a reload that started before its nav_enter actions finished", async () => {
    const page = mockContainer();
    const stack = mockContainer();
    service.setActivePage(page.ref);
    await flush();
    service.addOverlay(stack.ref);
    await flush();

    const finishReload = startRender(page.container);
    service.removeOverlay(stack.ref);
    await flush();
    expect(entries(page.container)).toBe(2);
    finishReload();
    await flush();
    expect(entries(page.container)).toBe(2);

    reload(page.container);
    await flush();
    expect(entries(page.container)).toBe(3);
  });

  it("still suppresses reloads from a re-entry's actions when an earlier entry ends first", async () => {
    const page = mockContainer();
    const popup = mockContainer({ navEnter: false });
    let finishFirstEntry: () => void;
    let call = 0;
    page.container.templateActionService.handleActions.and.callFake(async () => {
      call++;
      // nav_enter | pop_up: x | fullscreen: true waits until the pop-up closes
      if (call === 1) {
        service.addOverlay(popup.ref);
        await new Promise<void>((resolve) => (finishFirstEntry = resolve));
      }
      // the re-entry's actions reload the page after the first entry has ended
      if (call === 2) {
        await flush();
        reload(page.container);
        await flush();
      }
    });
    service.setActivePage(page.ref);
    await flush();
    service.removeOverlay(popup.ref);
    finishFirstEntry();
    for (let i = 0; i < 4; i++) await flush();
    expect(entries(page.container)).toBe(2);
  });
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
