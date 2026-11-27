/* eslint-disable jasmine/no-unsafe-spy */
import { TestBed } from "@angular/core/testing";
import { Location } from "@angular/common";
import { ActivatedRoute, Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { _wait } from "packages/shared/src/utils/async-utils";
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

  it("warns and does not navigate when go_to has no template name", async () => {
    const warn = spyOn(console, "warn");
    const router = TestBed.inject(Router) as jasmine.SpyObj<Router>;

    await service.handleNavAction({ trigger: "click", action_id: "go_to", args: [undefined] });

    expect(router.navigate).not.toHaveBeenCalled();
    expect(warn).toHaveBeenCalled();
  });
});
