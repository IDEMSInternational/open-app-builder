/* eslint-disable jasmine/no-unsafe-spy */
import { TestBed } from "@angular/core/testing";
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { _wait } from "packages/shared/src/utils/async-utils";
import { NavStackService } from "src/app/feature/nav-stack/nav-stack.service";
import { TemplateContainerComponent } from "../template-container.component";
import { INavQueryParams, TemplateNavService } from "./template-nav.service";

const HIDE_CLASS = "hide-popup-on-template";

const POPUP_PARAMS: INavQueryParams = { popup_child: "mock_popup", popup_parent: "page_a" };

/** Modal spy whose onDidDismiss resolves when dismissed */
function createModalSpy() {
  const modalSpy: jasmine.SpyObj<HTMLIonModalElement> = jasmine.createSpyObj(
    "HTMLIonModalElement",
    ["dismiss", "onDidDismiss", "present"]
  );
  Object.defineProperty(modalSpy, "classList", {
    value: document.createElement("div").classList,
  });
  let resolveDismiss: (value: any) => void;
  const dismissed = new Promise<any>((resolve) => (resolveDismiss = resolve));
  modalSpy.dismiss.and.callFake(async (data) => {
    resolveDismiss({ data });
    return true;
  });
  modalSpy.onDidDismiss.and.returnValue(dismissed);
  modalSpy.present.and.resolveTo();
  return modalSpy;
}

/** Top-level container, as rendered by a page or a nav-stack */
function mockContainer(name: string) {
  return {
    name,
    parent: undefined,
  } as Partial<TemplateContainerComponent> as TemplateContainerComponent;
}

/** Rendered container whose element sits inside the given page or modal element */
function mockRenderedContainer(layerEl: HTMLElement, parent?: TemplateContainerComponent) {
  const el = document.createElement("plh-template-container");
  layerEl.appendChild(el);
  return {
    name: "mock_template",
    parent,
    template: { flow_name: "mock_template" },
    elRef: { nativeElement: el },
    forceRerender: jasmine.createSpy("forceRerender").and.resolveTo(),
    templateActionService: jasmine.createSpyObj("TemplateActionService", {
      handleActions: Promise.resolve(),
    }),
  } as unknown as TemplateContainerComponent;
}

function createLayerElement(tagName: "div" | "ion-modal", className: string) {
  const el = document.createElement(tagName);
  el.className = className;
  return el;
}

function wasResumed(container: TemplateContainerComponent) {
  const handleActions = container.templateActionService.handleActions as jasmine.Spy;
  return handleActions.calls
    .allArgs()
    .some(([actions]) => actions.some((a) => a.trigger === "nav_resume"));
}

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/components/template/services/template-nav.service.spec.ts
 */
describe("TemplateNavService", () => {
  let service: TemplateNavService;
  let modalControllerSpy: jasmine.SpyObj<ModalController>;
  let createdModals: jasmine.SpyObj<HTMLIonModalElement>[];

  beforeEach(() => {
    createdModals = [];
    modalControllerSpy = jasmine.createSpyObj("ModalController", ["create"]);
    // resolve after a delay, so that other requests can arrive while a modal is being created
    modalControllerSpy.create.and.callFake(async () => {
      await _wait(10);
      const modal = createModalSpy();
      createdModals.push(modal);
      return modal;
    });
    TestBed.configureTestingModule({
      providers: [
        { provide: ModalController, useValue: modalControllerSpy },
        {
          provide: Router,
          useValue: jasmine.createSpyObj("Router", { navigate: Promise.resolve(true) }),
        },
        { provide: ActivatedRoute, useValue: { snapshot: { queryParams: {} } } },
        { provide: Location, useValue: jasmine.createSpyObj("Location", ["back", "forward"]) },
      ],
    });
    service = TestBed.inject(TemplateNavService);
  });

  it("creates one pop-up when a page and a nav-stack handle the same request", async () => {
    // a pop-up requested inside a nav-stack is handled by both the page and the nav-stack root template
    service.handleQueryParamChange(POPUP_PARAMS, mockContainer("page_a"));
    await _wait(0);
    service.handleQueryParamChange(POPUP_PARAMS, mockContainer("nav_stack_template"));
    await _wait(50);

    expect(modalControllerSpy.create).toHaveBeenCalledTimes(1);
    expect(createdModals[0].present).toHaveBeenCalledTimes(1);
  });

  it("hides the pop-up on another page and shows it again on return", async () => {
    service.handleQueryParamChange(POPUP_PARAMS, mockContainer("page_a"));
    await _wait(50);
    const [modal] = createdModals;

    await service.handleQueryParamChange(POPUP_PARAMS, mockContainer("page_b"));
    expect(modal.classList.contains(HIDE_CLASS)).toBeTrue();

    await service.handleQueryParamChange(POPUP_PARAMS, mockContainer("page_a"));
    expect(modal.classList.contains(HIDE_CLASS)).toBeFalse();
    expect(modalControllerSpy.create).toHaveBeenCalledTimes(1);
  });

  it("creates a new pop-up after the previous one is dismissed", async () => {
    const firstRequest = service.handleQueryParamChange(POPUP_PARAMS, mockContainer("page_a"));
    await _wait(50);
    await createdModals[0].dismiss();
    await firstRequest;

    service.handleQueryParamChange(POPUP_PARAMS, mockContainer("page_a"));
    await _wait(50);

    expect(modalControllerSpy.create).toHaveBeenCalledTimes(2);
    expect(createdModals[1].present).toHaveBeenCalled();
  });

  it("creates the pop-up on a later request if creating it failed", async () => {
    modalControllerSpy.create.and.rejectWith(new Error("mock create error"));
    await expectAsync(
      service.handleQueryParamChange(POPUP_PARAMS, mockContainer("page_a"))
    ).toBeRejected();

    const modal = createModalSpy();
    modalControllerSpy.create.and.resolveTo(modal);
    service.handleQueryParamChange(POPUP_PARAMS, mockContainer("page_a"));
    await _wait(50);

    expect(modalControllerSpy.create).toHaveBeenCalledTimes(2);
    expect(modal.present).toHaveBeenCalled();
  });

  describe("nav_resume", () => {
    let navStackService: NavStackService;
    let pageEl: HTMLElement;
    let navStackEl: HTMLIonModalElement;

    beforeEach(() => {
      navStackService = TestBed.inject(NavStackService);
      pageEl = createLayerElement("div", "ion-page");
      navStackEl = createLayerElement("ion-modal", "nav-stack-modal") as HTMLIonModalElement;
    });

    /** Subscribe containers to resume events, as rendered containers do */
    function subscribeToNavResume(...containers: TemplateContainerComponent[]) {
      for (const container of containers) {
        service.navResume$.subscribe(() => service.handleNavResume(container));
      }
    }

    async function closeNavStack(afterActions?: Promise<void>) {
      navStackService.navStacksClosed$.next({ afterActions });
      await _wait(0);
    }

    it("resumes the page and its nested templates when the last nav stack closes", async () => {
      const page = mockRenderedContainer(pageEl);
      const nested = mockRenderedContainer(pageEl, page);
      subscribeToNavResume(page, nested);
      await closeNavStack();

      expect(wasResumed(page)).toBeTrue();
      expect(wasResumed(nested)).toBeTrue();
      // only the top-level template reprocesses, which includes its nested templates
      expect(page.forceRerender).toHaveBeenCalledOnceWith(false);
      expect(nested.forceRerender).not.toHaveBeenCalled();
    });

    it("resumes only the nav stack now on top when a nav stack closes over another", async () => {
      const page = mockRenderedContainer(pageEl);
      const navStack = mockRenderedContainer(navStackEl);
      navStackService.openNavStacks.set([navStackEl]);
      subscribeToNavResume(page, navStack);
      await closeNavStack();

      expect(wasResumed(navStack)).toBeTrue();
      expect(wasResumed(page)).toBeFalse();
    });

    it("resumes once the action list that closed the nav stack has finished", async () => {
      const page = mockRenderedContainer(pageEl);
      subscribeToNavResume(page);
      let finishActions: () => void;
      await closeNavStack(new Promise<void>((resolve) => (finishActions = resolve)));
      expect(wasResumed(page)).toBeFalse();

      finishActions();
      await _wait(0);
      expect(wasResumed(page)).toBeTrue();
    });

    it("does not resume when the closing action list opened a pop-up", async () => {
      const page = mockRenderedContainer(pageEl);
      subscribeToNavResume(page);
      TestBed.inject(ActivatedRoute).snapshot.queryParams = { popup_child: "mock_popup" };
      await closeNavStack();

      expect(wasResumed(page)).toBeFalse();
    });

    it("does not resume a previous page that is hidden", async () => {
      const hiddenPage = mockRenderedContainer(
        createLayerElement("div", "ion-page ion-page-hidden")
      );
      const page = mockRenderedContainer(pageEl);
      subscribeToNavResume(hiddenPage, page);
      await closeNavStack();

      expect(wasResumed(page)).toBeTrue();
      expect(wasResumed(hiddenPage)).toBeFalse();
    });

    it("does not resume a page covered by a nav stack when a pop-up closes", async () => {
      const page = mockRenderedContainer(pageEl);
      const navStack = mockRenderedContainer(navStackEl);
      navStackService.openNavStacks.set([navStackEl]);
      // closing a pop-up clears its query params, which every container handles
      await service.handleQueryParamChange({}, page);
      await service.handleQueryParamChange({}, navStack);

      expect(wasResumed(page)).toBeFalse();
      expect(wasResumed(navStack)).toBeTrue();
    });
  });
});
