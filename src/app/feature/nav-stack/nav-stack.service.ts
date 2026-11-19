import { Injectable, signal } from "@angular/core";
import { ModalController } from "@ionic/angular";
import { Subject } from "rxjs";
import { INavStackConfig, NavStackComponent } from "./components/nav-stack/nav-stack.component";
import { SyncServiceBase } from "src/app/shared/services/syncService.base";

interface NavStackModal extends HTMLIonModalElement {}

export interface INavStacksClosedEvent {
  /** When closed by an action, resolves once the rest of its action list has finished */
  afterActions?: Promise<void>;
}

@Injectable({
  providedIn: "root",
})
export class NavStackService extends SyncServiceBase {
  public openNavStacks = signal<HTMLIonModalElement[]>([]);
  /** Emits once each time one or more nav stacks close */
  public navStacksClosed$ = new Subject<INavStacksClosedEvent>();
  private readonly MAX_NAV_STACKS = 10;
  /** Nav stacks closed by this service, which emits their close event itself */
  private closingNavStacks = new WeakSet<HTMLIonModalElement>();

  constructor(private modalCtrl: ModalController) {
    super("navStack");
    // NB: Actions are registered in nav-stack module
  }

  /**
   * Create and present a new nav-stack modal and push it to openNavStacks array.
   * Await and remove from openNavStacks array on dismiss
   */
  public async pushNavStack(navStackConfig: INavStackConfig) {
    if (this.openNavStacks().length >= this.MAX_NAV_STACKS) {
      console.warn(`[NAV STACK] Maximum number of nav stacks reached: ${this.MAX_NAV_STACKS}`);
      return null;
    }
    const modal = await this.createNavStackModal(navStackConfig);
    await this.presentAndTrackModal(modal);
    return modal;
  }

  public closeAllNavStacks(afterActions?: Promise<void>) {
    return this.closeNavStacks(this.openNavStacks(), afterActions);
  }

  public async closeTopNavStack(afterActions?: Promise<void>) {
    const topNavStack = this.openNavStacks().at(-1);
    if (!topNavStack) return;
    await this.closeNavStacks([topNavStack], afterActions);
  }

  /**
   * Creates a new nav-stack modal instance
   */
  private async createNavStackModal(config: INavStackConfig) {
    const modal = await this.modalCtrl.create({
      component: NavStackComponent,
      componentProps: { config },
      // Styling must be done in global theme scss as the modal is injected dynamically into the dom
      cssClass: "nav-stack-modal",
    });
    return modal as NavStackModal;
  }

  private async presentAndTrackModal(modal: NavStackModal) {
    const navStackIndex = this.openNavStacks().length;
    modal.setAttribute("data-nav-stack-index", navStackIndex.toString());
    modal.style.setProperty("--nav-stack-index", navStackIndex.toString());

    // Handle nav stack dismissal here (whether programmatically from service or from nav-stack component)
    modal.onWillDismiss().then(() => this.handleNavStackDismissal(modal));
    // closed from the nav-stack itself (e.g. close button) rather than by this service
    modal.onDidDismiss().then(() => {
      if (!this.closingNavStacks.has(modal)) this.navStacksClosed$.next({});
    });

    this.addNavStackToArray(modal);
    await modal.present();
  }

  private handleNavStackDismissal(modal: NavStackModal) {
    const index = this.getNavStackIndex(modal);
    if (index === -1) return;
    this.removeNavStackFromArray(index);
  }

  private getNavStackIndex(modalElement: HTMLIonModalElement) {
    return this.openNavStacks().indexOf(modalElement);
  }

  /**
   * Programmatically dismiss nav-stacks. Handling removing from openNavStacks array is done elsewhere
   * to handle both programmatic dismissal and dismissal from nav-stack component (e.g. via close button)
   */
  private async closeNavStacks(modals: HTMLIonModalElement[], afterActions?: Promise<void>) {
    if (modals.length === 0) return;
    modals.forEach((modal) => this.closingNavStacks.add(modal));
    const dismissed = await Promise.all(modals.map((modal) => modal.dismiss()));
    modals.forEach((modal, i) => !dismissed[i] && this.closingNavStacks.delete(modal));
    if (dismissed.includes(true)) {
      this.navStacksClosed$.next({ afterActions });
    }
  }

  private addNavStackToArray(modal: NavStackModal) {
    // use array destructure to create new object
    this.openNavStacks.update((stacks) => [...stacks, modal]);
  }

  private removeNavStackFromArray(index: number) {
    // use filter instead of splice to avoid modifying original object
    this.openNavStacks.update((stacks) => stacks.filter((v, i) => i !== index));
  }
}
