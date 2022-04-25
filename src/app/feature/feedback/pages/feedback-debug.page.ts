import { Component, OnDestroy, OnInit } from "@angular/core";
import { Subject } from "packages/api/node_modules/rxjs";
import { interval } from "rxjs";
import { debounce, takeUntil } from "rxjs/operators";
import { DBSyncService } from "src/app/shared/services/db/db-sync.service";
import { DbService } from "src/app/shared/services/db/db.service";
import { FeedbackService } from "../feedback.service";
import { IFeedbackEntryDB } from "../feedback.types";

@Component({
  templateUrl: "./feedback-debug.page.html",
  styleUrls: ["./feedback-debug.page.scss"],
})
export class FeedbackDebugPage implements OnInit, OnDestroy {
  private destroyed$ = new Subject<boolean>();
  public feedbackPending: IFeedbackEntryDB[] = [];
  public feedbackSent: IFeedbackEntryDB[] = [];
  constructor(
    public feedbackService: FeedbackService,
    private dbService: DbService,
    private dbSyncService: DBSyncService
  ) {}

  ngOnDestroy() {
    this.destroyed$.next(true);
    this.destroyed$.unsubscribe();
  }

  async ngOnInit() {
    await this.loadDBFeedback();
    this.dbService
      .table("feedback")
      .changes$.pipe(
        takeUntil(this.destroyed$),
        debounce(() => interval(500))
      )
      .subscribe(() => this.loadDBFeedback());
  }

  public logFeedback(feedback: IFeedbackEntryDB) {
    console.log(feedback);
  }
  public async syncFeedback() {
    await this.dbSyncService.syncTable("feedback");
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
