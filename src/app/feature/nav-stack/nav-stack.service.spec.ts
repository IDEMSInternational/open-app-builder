/* eslint-disable jasmine/no-unsafe-spy */
import { TestBed } from "@angular/core/testing";
import { INavStacksClosedEvent, NavStackService } from "./nav-stack.service";
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
  const modalSpy: jasmine.SpyObj<HTMLIonModalElement> = jasmine.createSpyObj(
    "HTMLIonModalElement",
    ["dismiss", "onWillDismiss", "onDidDismiss", "present", "getAttribute", "setAttribute"]
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
  modalSpy.dismiss.and.callFake(async (data) => {
    modalDismissEvent.next(data);
    modalDismissEvent.complete();
    return true;
  });
  modalSpy.onWillDismiss.and.callFake(async () => lastValueFrom(modalDismissEvent));
  modalSpy.onDidDismiss.and.callFake(async () => lastValueFrom(modalDismissEvent));
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
  let pushNavStack: () => Promise<jasmine.SpyObj<HTMLIonModalElement>>;

  beforeEach(() => {
    // create spy modalController which also creates spied modals
    modalControllerSpy = jasmine.createSpyObj("ModalController", ["create"]);
    modalControllerSpy.create.and.callFake(async () => createModalSpy());

    TestBed.configureTestingModule({
      providers: [{ provide: ModalController, useValue: modalControllerSpy }],
    });
    service = TestBed.inject(NavStackService);
    // wrap the service pushNavStack to pass mock values and assign spy type from controller spy
    pushNavStack = async () => {
      const modal = await service.pushNavStack(MOCK_NAV_STACK());
      return modal as jasmine.SpyObj<HTMLIonModalElement>;
    };
  });

  it("creates a new nav stack modal", async () => {
    const modalSpy = await pushNavStack();

    expect(modalSpy.present).toHaveBeenCalled();
    expect(service.openNavStacks().length).toEqual(1);
  });

  it("tracks stack index as attributes", async () => {
    const modalSpy = await pushNavStack();
    const index = modalSpy.getAttribute("data-nav-stack-index");

    expect(index).toEqual("0");
  });

  it("displays multiple indexed nav stacks", async () => {
    const modalSpy1 = await pushNavStack();
    const modalSpy2 = await pushNavStack();

    expect(service.openNavStacks().length).toEqual(2);
    expect(modalSpy1.getAttribute("data-nav-stack-index")).toEqual("0");
    expect(modalSpy2.getAttribute("data-nav-stack-index")).toEqual("1");
  });

  it("should remove the modal from service.openNavStacks on dismissal", async () => {
    const modalSpy = await pushNavStack();
    await service.closeTopNavStack();

    expect(modalSpy.dismiss).toHaveBeenCalled();
    expect(service.openNavStacks().length).toBe(0);
  });

  it("should close the top modal in the stack", async () => {
    const modalSpy1 = await pushNavStack();
    const modalSpy2 = await pushNavStack();

    await service.closeTopNavStack();

    expect(modalSpy1.dismiss).not.toHaveBeenCalled();
    expect(modalSpy2.dismiss).toHaveBeenCalled();
    expect(service.openNavStacks().length).toBe(1);
    expect(service.openNavStacks()[0]).toBe(modalSpy1);
  });

  it("should close all modals in the stack", async () => {
    const modalSpy1 = await pushNavStack();
    const modalSpy2 = await pushNavStack();

    await service.closeAllNavStacks();

    expect(modalSpy1.dismiss).toHaveBeenCalled();
    expect(modalSpy2.dismiss).toHaveBeenCalled();
    expect(service.openNavStacks().length).toBe(0);
  });

  describe("navStacksClosed$", () => {
    let closedEvents: INavStacksClosedEvent[];

    beforeEach(() => {
      closedEvents = [];
      service.navStacksClosed$.subscribe((e) => closedEvents.push(e));
    });

    it("emits when the top nav stack is closed", async () => {
      await pushNavStack();
      await service.closeTopNavStack();
      await _wait(0);

      expect(closedEvents.length).toBe(1);
    });

    it("emits once when all nav stacks are closed", async () => {
      await pushNavStack();
      await pushNavStack();
      await service.closeAllNavStacks();
      await _wait(0);

      expect(closedEvents.length).toBe(1);
    });

    it("emits when a nav stack is dismissed directly (e.g. its close button)", async () => {
      const modalSpy = await pushNavStack();
      await modalSpy.dismiss();
      await _wait(0);

      expect(closedEvents.length).toBe(1);
    });

    it("passes on the promise for the rest of the closing action list", async () => {
      const afterActions = Promise.resolve();
      await pushNavStack();
      await service.closeTopNavStack(afterActions);

      expect(closedEvents[0].afterActions).toBe(afterActions);
    });

    it("does not emit when no nav stack is open", async () => {
      await service.closeTopNavStack();
      await service.closeAllNavStacks();

      expect(closedEvents.length).toBe(0);
    });
  });
});
