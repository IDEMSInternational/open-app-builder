import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { IonContent } from "@ionic/angular";
import { fromEvent, Subscription } from "rxjs";
import { delay } from "rxjs/operators";
import { TEMPLATE } from "src/app/shared/services/data/data.service";
@Component({
  selector: "plh-template-testing",
  templateUrl: "./template-testing.page.html",
  styleUrls: ["./template-testing.page.scss"],
})
export class TemplateTestingPage implements OnInit, OnDestroy {
  @ViewChild("pageTop") pageTop: IonContent;
  templateName: string;
  filterTerm: string;
  allTemplates = TEMPLATE.sort((a, b) => (a.flow_name > b.flow_name ? 1 : -1));
  data = this.allTemplates;
  subscription: Subscription;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.templateName = this.route.snapshot.params.templateName;
    this.subscription = fromEvent(document, "click")
      .pipe(delay(SCROLL_TOP_DELEY))
      .subscribe((e: { target }) => {
        if (
          e.target.classList.contains("navigation") ||
          e.target.parentElement.classList.contains("navigation")
        ) {
          this.pageScroller();
        }
      });
  }

  search() {
    this.allTemplates = this.data;
    this.allTemplates = this.allTemplates.filter(
      (i) => i.flow_name.toLocaleLowerCase().indexOf(this.filterTerm.toLowerCase()) > -1
    );
  }

  public pageScroller() {
    this.pageTop.scrollToTop(SCROLL_TOP_DURATION);
  }

  trackByFn(index) {
    return index;
  }

  ngOnDestroy() {
    if (this.subscription) this.subscription.unsubscribe();
  }
}

const SCROLL_TOP_DELEY = 100;
const SCROLL_TOP_DURATION = 500;
