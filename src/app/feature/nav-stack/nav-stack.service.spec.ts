import { TestBed } from "@angular/core/testing";
import { NavStackService } from "./nav-stack.service";
import { ModalController } from "@ionic/angular";
import { INavStackConfig } from "./components/nav-stack/nav-stack.component";
import { _wait } from "packages/shared/src/utils/async-utils";
import { lastValueFrom, Subject } from "rxjs";

const MOCK_NAV_STACK = (): INavStackConfig => ({
  templateName: "mock_stack_template",
  title: "Mock Stack Title",
});

/** Create a new modal spy object for use by modal controller or direct testing */
function createModalSpy() {
  // eslint-disable-next-line jasmine/no-unsafe-spy
  const modalSpy: jasmine.SpyObj<HTMLIonModalElement> = jasmine.createSpyObj(
    "HTMLIonModalElement",
    ["dismiss", "onWillDismiss", "present", "getAttribute", "setAttribute"]
  );
  Object.defineProperty(modalSpy, "style", {
    value: {
      setProperty: jasmine.createSpy(),
    },
  });
  // mock attribute methods
  const attributes: Record<string, string> = {};
  modalSpy.setAttribute.and.callFake((name, value) => (attributes[name] = value));
  modalSpy.getAttribute.and.callFake((name) => attributes[name]);

  // mock event emitter for dismiss and triggered onWillDismiss
  const modalDismissEvent = new Subject<any>();
  modalSpy.dismiss.and.callFake((data) => {
    modalDismissEvent.next(data);
    modalDismissEvent.complete();
    return data;
  });
  modalSpy.onWillDismiss.and.callFake(async () => lastValueFrom(modalDismissEvent));
  modalSpy.present.and.resolveTo();
  return modalSpy;
}

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/feature/nav-stack/nav-stack.service.spec.ts
 */
describe("NavStackService", () => {
  let service: NavStackService;
  let modalControllerSpy: jasmine.SpyObj<ModalController>;

  beforeEach(() => {
    // create spy modalController which also creates spied modals
    modalControllerSpy = jasmine.createSpyObj("ModalController", ["create"]);
    modalControllerSpy.create.and.callFake(async () => createModalSpy());

    TestBed.configureTestingModule({
      providers: [{ provide: ModalController, useValue: modalControllerSpy }],
    });
    service = TestBed.inject(NavStackService);
  });

  it("creates a new nav stack modal", async () => {
    await service.pushNavStack(MOCK_NAV_STACK());
    expect(service["openNavStacks"].length).toEqual(1);
  });

  it("tracks stack index as attributes", async () => {
    await service.pushNavStack(MOCK_NAV_STACK());
    const [modal] = service["openNavStacks"];
    const index = modal.getAttribute("data-nav-stack-index");
    expect(index).toEqual("0");
  });

  it("displays multiple indexed nav stacks", async () => {
    await service.pushNavStack(MOCK_NAV_STACK());
    await service.pushNavStack(MOCK_NAV_STACK());
    expect(service["openNavStacks"].length).toEqual(2);

    const [modal_0, modal_1] = service["openNavStacks"];
    expect(modal_0.getAttribute("data-nav-stack-index")).toEqual("0");
    expect(modal_1.getAttribute("data-nav-stack-index")).toEqual("1");
  });

  it("should remove the modal from service['openNavStacks'] on dismissal", async () => {
    const modalSpy1 = createModalSpy();
    service["openNavStacks"] = [modalSpy1];

    await service.closeTopNavStack();

    expect(modalSpy1.dismiss).toHaveBeenCalled();
    expect(service["openNavStacks"].length).toBe(0);
  });

  it("should close the top modal in the stack", async () => {
    const modalSpy1 = createModalSpy();
    const modalSpy2 = createModalSpy();
    service["openNavStacks"] = [modalSpy1, modalSpy2];

    await service.closeTopNavStack();

    expect(modalSpy1.dismiss).not.toHaveBeenCalled();
    expect(modalSpy2.dismiss).toHaveBeenCalled();
    expect(service["openNavStacks"].length).toBe(1);
    expect(service["openNavStacks"][0]).toBe(modalSpy1);
  });

  it("should close all modals in the stack", async () => {
    const modalSpy1 = createModalSpy();
    const modalSpy2 = createModalSpy();
    service["openNavStacks"] = [modalSpy1, modalSpy2];

    await service.closeAllNavStacks();

    expect(modalSpy1.dismiss).toHaveBeenCalled();
    expect(modalSpy2.dismiss).toHaveBeenCalled();
    expect(service["openNavStacks"].length).toBe(0);
  });
});
