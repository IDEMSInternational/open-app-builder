import { Component, OnInit } from "@angular/core";
import { FeedbackService } from "../feedback.service";

@Component({
  templateUrl: "./feedback-debug.page.html",
  styles: [``],
})
export class FeedbackDebugPage implements OnInit {
  constructor(public feedbackService: FeedbackService) {}

  ngOnInit() {}
}
