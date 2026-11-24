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
  let willDismiss: () => void;
  const modal = { onWillDismiss: () => new Promise<void>((resolve) => (willDismiss = resolve)) };
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
  return { component, modalCtrl, lifecycleService, willDismiss: () => willDismiss() };
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

  it("registers a standalone popup's template as top-level until it starts closing", async () => {
    const { component, lifecycleService, willDismiss } = createComponent({ standalone: true });
    component.ngOnInit();
    expect(lifecycleService.addOverlay).toHaveBeenCalledTimes(1);
    const [ref] = lifecycleService.addOverlay.calls.mostRecent().args;

    willDismiss();
    await Promise.resolve();
    expect(lifecycleService.removeOverlay).toHaveBeenCalledOnceWith(ref);
  });

  it("does not register a popup opened from a template", () => {
    const { component, lifecycleService } = createComponent({});
    component.ngOnInit();
    expect(lifecycleService.addOverlay).not.toHaveBeenCalled();
  });
});
