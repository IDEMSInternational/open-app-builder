import { AfterViewInit, Component, OnDestroy } from "@angular/core";
import { FeedbackService } from "../../feedback.service";

@Component({
  selector: "plh-feedback-toolbar",
  templateUrl: "./feedback-toolbar.component.html",
  styleUrls: ["./feedback-toolbar.component.scss"],
})
export class FeedbackToolbarComponent implements AfterViewInit, OnDestroy {
  constructor(public feedbackService: FeedbackService) {}

  ngAfterViewInit(): void {
    const { contentPageWidth } = this.feedbackService.options;
    this.feedbackService.setContentPageWidth(contentPageWidth);
    this.feedbackService.setEnabled(true);
    this.feedbackService.setNavigationEnabled(true);
  }

  ngOnDestroy() {
    this.feedbackService.setContentPageWidth(null);
    this.feedbackService.setEnabled(false);
    this.feedbackService.setNavigationEnabled(true);
  }
}
