import { AfterViewInit, Component } from "@angular/core";
import { FeedbackService } from "../../feedback.service";

@Component({
  selector: "plh-feedback-toolbar",
  templateUrl: "./feedback-toolbar.component.html",
  styleUrls: ["./feedback-toolbar.component.scss"],
})
export class FeedbackToolbarComponent implements AfterViewInit {
  constructor(public feedbackService: FeedbackService) {}

  ngAfterViewInit(): void {
    const { contentPageWidth, enabled, navigationEnabled } = this.feedbackService.options;
    this.feedbackService.setContentPageWidth(contentPageWidth);
    this.feedbackService.setEnabled(enabled);
    this.feedbackService.setNavigationEnabled(navigationEnabled);
  }

  ngOnDetroy() {
    this.feedbackService.setContentPageWidth(null);
    this.feedbackService.setEnabled(false);
    this.feedbackService.setNavigationEnabled(true);
  }
}
