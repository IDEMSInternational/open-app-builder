import { Component, OnInit } from "@angular/core";
import { ContentReviewService } from "../content-review.service";

@Component({
  templateUrl: "./content-review-debug.page.html",
  styles: [``],
})
export class ContentReviewDebugPage implements OnInit {
  constructor(public contentReviewService: ContentReviewService) {}

  ngOnInit() {}
}
