import {
  Component,
  ComponentRef,
  EnvironmentInjector,
  inject,
  Injector,
  Type,
  ViewContainerRef,
} from "@angular/core";
import { ROW_PARAMETERS, RowBaseComponent } from "../../row-base.component";
import { defineParameters } from "../../parameters";
import { createReactiveComponentRef, destroyComponentRefs } from "../../reactive-component-host";
import { REACTIVE_COMPONENT_MAP } from "..";
import { isAction } from "src/app/reactive-templates/services/action.registry";
import { NavigationService } from "src/app/reactive-templates/services/navigation-service";

const parameters = () => defineParameters({});
@Component({
  selector: "oab-on-leave",
  template: "",
  styleUrls: ["./on-leave.component.scss"],
  providers: [{ provide: ROW_PARAMETERS, useFactory: parameters }],
})
export class OnLeaveComponent extends RowBaseComponent<ReturnType<typeof parameters>> {
  private readonly componentRefs: ComponentRef<RowBaseComponent<any>>[] = [];
  private injector = inject(EnvironmentInjector);
  private elementInjector = inject(Injector);
  private viewContainer = inject(ViewContainerRef);
  private navigationService = inject(NavigationService);
  private unregisterLeaveHandler?: () => void;
  private destroyed = false;

  public override ngOnInit(): void {
    super.ngOnInit();
    this.unregisterLeaveHandler = this.navigationService.registerLeaveHandler(() => this.execute());
  }

  public async execute(): Promise<boolean> {
    if (!this.condition()) {
      return true;
    }

    destroyComponentRefs(this.componentRefs);
    await this.storeValue();
    if (this.destroyed) {
      return false;
    }

    for (const row of this.row().rows ?? []) {
      if (!(row.type in REACTIVE_COMPONENT_MAP)) {
        continue;
      }
      const componentType = REACTIVE_COMPONENT_MAP[
        row.type as keyof typeof REACTIVE_COMPONENT_MAP
      ] as Type<RowBaseComponent<any>>;

      const condition = this.evaluationService.evaluateExpression(
        row.condition ?? true,
        this.namespace(),
        "script"
      );
      if (!condition) {
        continue;
      }

      const componentRef = createReactiveComponentRef(
        componentType,
        this.injector,
        this.elementInjector,
        row,
        this.namespace()
      );
      this.componentRefs.push(componentRef);

      const instance = componentRef.instance;
      if (isAction(instance)) {
        let cancelled = false;
        instance.emittedValue.subscribe((event) => {
          if (event.emitValue === "cancelled") {
            cancelled = true;
          }
        });
        instance.init();
        if (instance instanceof REACTIVE_COMPONENT_MAP.popup) {
          this.viewContainer.insert(componentRef.hostView);
          componentRef.changeDetectorRef.detectChanges();
        }
        if (instance.condition()) {
          await instance.execute();
        }
        if (cancelled || this.destroyed) {
          return false;
        }
      }
    }
    return true;
  }

  public override ngOnDestroy(): void {
    this.destroyed = true;
    this.unregisterLeaveHandler?.();
    destroyComponentRefs(this.componentRefs);
    super.ngOnDestroy();
  }
}
