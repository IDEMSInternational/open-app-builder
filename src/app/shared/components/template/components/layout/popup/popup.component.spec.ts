import { TestBed } from "@angular/core/testing";
import { IonModalToken, ModalController } from "@ionic/angular";
import { TemplateLifecycleService } from "../../../services/template-lifecycle.service";
import { TemplateTranslateService } from "../../../services/template-translate.service";
import { ITemplatePopupComponentProps, TemplatePopupComponent } from "./popup.component";

function createComponent(props: Partial<ITemplatePopupComponentProps>) {
  const modalCtrl = jasmine.createSpyObj<ModalController>("ModalController", ["dismiss"]);
  const lifecycleService = jasmine.createSpyObj<TemplateLifecycleService>(
    "TemplateLifecycleService",
    ["addOverlay", "removeOverlay"]
  );
  const modal = { onWillDismiss: () => new Promise<void>(() => null) };
  TestBed.configureTestingModule({
    providers: [
      { provide: TemplateLifecycleService, useValue: lifecycleService },
      { provide: IonModalToken, useValue: modal },
    ],
  });
  const component = TestBed.runInInjectionContext(
    () => new TemplatePopupComponent(modalCtrl, {} as TemplateTranslateService)
  );
  component.props = { name: "test", templatename: "test", ...props };
  return { component, modalCtrl, lifecycleService, modal };
}

function clickOn(className: string) {
  const target = document.createElement("div");
  target.classList.add(className);
  return { target } as unknown as MouseEvent;
}

describe("TemplatePopupComponent", () => {
  it("dismisses on backdrop click", () => {
    const { component, modalCtrl } = createComponent({});
    component.dismissOnBackdrop(clickOn("popup-backdrop"));
    expect(modalCtrl.dismiss).toHaveBeenCalled();
  });

  it("does not dismiss on click inside the popup content", () => {
    const { component, modalCtrl } = createComponent({});
    component.dismissOnBackdrop(clickOn("popup-content"));
    expect(modalCtrl.dismiss).not.toHaveBeenCalled();
  });

  it("does not dismiss fullscreen popup on backdrop click", () => {
    const { component, modalCtrl } = createComponent({ fullscreen: true });
    component.dismissOnBackdrop(clickOn("popup-backdrop"));
    expect(modalCtrl.dismiss).not.toHaveBeenCalled();
  });

  it("registers a standalone fullscreen popup's template as top-level while it is open", () => {
    const { component, lifecycleService, modal } = createComponent({
      standalone: true,
      fullscreen: true,
    });
    component.ngOnInit();
    expect(lifecycleService.addOverlay).toHaveBeenCalledTimes(1);
    const [ref, registeredModal] = lifecycleService.addOverlay.calls.mostRecent().args;
    expect(registeredModal).toBe(modal as unknown as HTMLIonModalElement);

    component.ngOnDestroy();
    expect(lifecycleService.removeOverlay).toHaveBeenCalledOnceWith(ref);
  });

  it("does not register a popup opened from a template, or a standalone popup that is not fullscreen", () => {
    for (const props of [{ fullscreen: true }, { standalone: true }]) {
      const { component, lifecycleService } = createComponent(props);
      component.ngOnInit();
      component.ngOnDestroy();
      expect(lifecycleService.addOverlay).not.toHaveBeenCalled();
      expect(lifecycleService.removeOverlay).not.toHaveBeenCalled();
      TestBed.resetTestingModule();
    }
  });
});
