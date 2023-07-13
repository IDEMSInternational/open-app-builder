import { Component, OnDestroy, OnInit } from "@angular/core";
import { interval, Subject } from "rxjs";
import { debounce, takeUntil } from "rxjs/operators";
import { DbService } from "src/app/shared/services/db/db.service";
import { FeedbackService } from "../feedback.service";
import { IFeedbackEntryDB } from "../feedback.types";

@Component({
  templateUrl: "./feedback-debug.page.html",
  styleUrls: ["./feedback-debug.page.scss"],
})
export class FeedbackDebugPage implements OnInit, OnDestroy {
  private componentDestroyed$ = new Subject<boolean>();
  public feedbackPending: IFeedbackEntryDB[] = [];
  public feedbackSent: IFeedbackEntryDB[] = [];
  constructor(public feedbackService: FeedbackService, private dbService: DbService) {}

  ngOnDestroy() {
    this.componentDestroyed$.next(true);
    this.componentDestroyed$.unsubscribe();
  }

  async ngOnInit() {
    await this.loadDBFeedback();
    this.dbService
      .table("feedback")
      .changes$.pipe(
        takeUntil(this.componentDestroyed$),
        debounce(() => interval(500))
      )
      .subscribe(() => this.loadDBFeedback());
  }

  public logFeedback(feedback: IFeedbackEntryDB) {
    console.log(feedback);
  }
  public async syncFeedback() {
    await this.feedbackService.syncFeedback();
  }
  public async deleteFeedback(feedback: IFeedbackEntryDB) {
    await this.feedbackService.deleteFeedback(feedback.id);
    await this.loadDBFeedback();
  }

  private async loadDBFeedback() {
    this.feedbackPending = await this.dbService
      .table("feedback")
      .where({ _sync_status: "pending" })
      .toArray();
    this.feedbackSent = await this.dbService
      .table("feedback")
      .where({ _sync_status: "synced" })
      .toArray();
    console.log("feedback", { pending: this.feedbackPending, sent: this.feedbackSent });
  }
}
