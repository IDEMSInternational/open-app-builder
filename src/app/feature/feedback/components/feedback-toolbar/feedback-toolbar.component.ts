import { AfterViewInit, Component } from "@angular/core";
import { FeedbackService } from "../../feedback.service";

@Component({
  selector: "plh-feedback-toolbar",
  templateUrl: "./feedback-toolbar.component.html",
  styleUrls: ["./feedback-toolbar.component.scss"],
})
export class FeedbackToolbarComponent implements AfterViewInit {
  /** Default width to set content page when showing feedback pane */
  public contentPageWidth = 400;
  public navigationEnabled = true;
  public feedbackEnabled = true;

  constructor(public feedbackService: FeedbackService) {}

  ngAfterViewInit(): void {
    this.feedbackService.setContentPageWidth(this.contentPageWidth);
    this.feedbackService.setReviewMode(this.feedbackEnabled);
    this.feedbackService.setNavigationEnabled(this.navigationEnabled);
  }

  ngOnDetroy() {
    this.feedbackService.setContentPageWidth(null);
    this.feedbackService.setReviewMode(false);
    this.feedbackService.setNavigationEnabled(true);
  }
}
