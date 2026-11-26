import { Component, inject, Input, OnDestroy, OnInit, viewChild } from "@angular/core";
import { IonModalToken, ModalController } from "@ionic/angular";
import { TemplateContainerComponent } from "src/app/shared/components/template/template-container.component";
import { TemplateLifecycleService } from "src/app/shared/components/template/services/template-lifecycle.service";

export interface INavStackConfig {
  templateName: string;
  title?: string;
  showCloseButton?: boolean;
  // Show default nav-stack header
  header?: boolean;
}

/** The logic for nav-stack open/dismiss exists in the nav-stack service */
@Component({
  selector: "tmpl-nav-stack",
  templateUrl: "./nav-stack.component.html",
  standalone: false,
})
export class NavStackComponent implements OnInit, OnDestroy {
  @Input() config: INavStackConfig;
  private container = viewChild(TemplateContainerComponent);
  // not `modal`, which Ionic sets on modal components
  private ionModal = inject(IonModalToken, { optional: true });
  private lifecycleService = inject(TemplateLifecycleService);

  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    this.lifecycleService.addOverlay(this.container, this.ionModal);
  }

  ngOnDestroy() {
    this.lifecycleService.removeOverlay(this.container);
  }

  public close() {
    this.modalCtrl.dismiss();
  }
}
