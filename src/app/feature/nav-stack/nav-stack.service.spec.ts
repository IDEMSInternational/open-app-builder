import { TestBed } from "@angular/core/testing";
import { NavStackService } from "./nav-stack.service";
import { ModalController } from "@ionic/angular";
import { INavStackConfig, NavStackComponent } from "./components/nav-stack/nav-stack.component";

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/feature/nav-stack/nav-stack.service.spec.ts
 */
describe("NavStackService", () => {
  let service: NavStackService;
  let mockModalController: jasmine.SpyObj<ModalController>;
  let mockModal: jasmine.SpyObj<HTMLIonModalElement>;

  beforeEach(() => {
    mockModalController = jasmine.createSpyObj("ModalController", ["create"]);
    TestBed.configureTestingModule({
      providers: [{ provide: ModalController, useValue: mockModalController }],
    });
    service = TestBed.inject(NavStackService);

    // Remove any previously created nav-stacks
    service.openNavStacks = [];

    mockModal = jasmine.createSpyObj("HTMLIonModalElement", [
      "present",
      "onWillDismiss",
      "setAttribute",
    ]);
    Object.defineProperty(mockModal, "style", {
      value: {
        setProperty: jasmine.createSpy(),
      },
    });
    mockModal.present.and.resolveTo();
    mockModal.onWillDismiss.and.resolveTo();
    mockModalController.create.and.resolveTo(mockModal);
  });

  it("should create a nav-stack modal with correct configuration", async () => {
    const navStackConfig = { title: "Test Stack" } as INavStackConfig;
    await service["createNavStackModal"](navStackConfig);

    expect(mockModalController.create).toHaveBeenCalledWith({
      component: NavStackComponent,
      componentProps: { config: navStackConfig },
      cssClass: "nav-stack-modal",
    });
  });

  it("should update, present and track a new nav-stack modal", async () => {
    await service["presentAndTrackModal"](mockModal);
    expect(mockModal.style.setProperty).toHaveBeenCalledWith("--stack-index", "0");
    expect(mockModal.present).toHaveBeenCalled();
    expect(service.openNavStacks.length).toBe(1);
    expect(service.openNavStacks[0]).toBe(mockModal);
  });

  it("should remove the modal from openNavStacks on dismissal", async () => {
    service.openNavStacks = [mockModal];
    await service["handleModalDismissal"](mockModal);
    await mockModal.onWillDismiss();
    expect(service.openNavStacks.length).toBe(0);
  });

  it("should close the top modal in the stack", async () => {
    const mockModal1 = jasmine.createSpyObj("HTMLIonModalElement", ["dismiss"]);
    const mockModal2 = jasmine.createSpyObj("HTMLIonModalElement", ["dismiss"]);
    service.openNavStacks = [mockModal1, mockModal2];

    await service["closeTopNavStack"]();

    expect(mockModal2.dismiss).toHaveBeenCalled();
    expect(service.openNavStacks.length).toBe(1);
    expect(service.openNavStacks[0]).toBe(mockModal1);
  });

  it("should close all modals in the stack", async () => {
    const mockModal1 = jasmine.createSpyObj("HTMLIonModalElement", ["dismiss"]);
    const mockModal2 = jasmine.createSpyObj("HTMLIonModalElement", ["dismiss"]);
    service.openNavStacks = [mockModal1, mockModal2];

    await service["closeAllNavStacks"]();

    expect(mockModal1.dismiss).toHaveBeenCalled();
    expect(mockModal2.dismiss).toHaveBeenCalled();
    expect(service.openNavStacks.length).toBe(0);
  });
});
