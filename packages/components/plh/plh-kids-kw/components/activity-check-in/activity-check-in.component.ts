import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "src/app/shared/components/template/components/base";
import { TemplateTranslateService } from "src/app/shared/components/template/services/template-translate.service";
import { getNumberParamFromTemplateRow, getStringParamFromTemplateRow } from "src/app/shared/utils";

interface IActivityCheckInParams {
  /* TEMPLATE PARAMETER: "activity_id". The activity identifier attached at the bottom of the component */
  id: string;
  /* TEMPLATE PARAMETER: "title". The title attached at the bottom of the component */
  title?: string;
  /* TEMPLATE PARAMETER: "locked_icon_asset". The icon that shows when the activity is locked */
  lockedIconAsset?: string;
  /* TEMPLATE PARAMETER: "locked_image_asset". The illustration that shows when the activity is locked */
  lockedImageAsset?: string;
  /* TEMPLATE PARAMETER: "unlocked_icon_asset". The icon that shows when the activity is unlocked */
  unlockedIconAsset?: string;
  /* TEMPLATE PARAMETER: "unlocked_image_asset". The illustration that shows when the activity is locked */
  unlockedImageAsset?: string;
  /* TEMPLATE PARAMETER: "days_to_count_down". The illustration that shows when the activity is locked */
  countDownDays?: number;
}

@Component({
  selector: "plh-activity-check-in",
  templateUrl: "./activity-check-in.component.html",
  styleUrls: ["./activity-check-in.component.scss"],
})
export class PlhActivityCheckInComponent extends TemplateBaseComponent implements OnInit {
  params: Partial<IActivityCheckInParams> = {};

  daysLeft: number; // Progress of days left
  progressPercentage: number = 16; // Initial progress

  private unlockDate: Date;

  constructor(public templateTranslateService: TemplateTranslateService) {
    super();
  }

  ngOnInit() {
    this.getParams();
    this.daysLeft = this.params.countDownDays;
    if (this._row.value) {
      this.checkInTimer();
    }
  }

  private getParams() {
    this.params.id = getStringParamFromTemplateRow(this._row, "activity_id", null);
    this.params.title = getStringParamFromTemplateRow(this._row, "title", null);
    this.params.lockedIconAsset = getStringParamFromTemplateRow(
      this._row,
      "locked_icon_asset",
      null
    );
    this.params.lockedImageAsset = getStringParamFromTemplateRow(
      this._row,
      "locked_image_asset",
      null
    );
    this.params.unlockedIconAsset = getStringParamFromTemplateRow(
      this._row,
      "unlocked_icon_asset",
      null
    );
    this.params.unlockedImageAsset = getStringParamFromTemplateRow(
      this._row,
      "unlocked_image_asset",
      null
    );
    this.params.countDownDays = getNumberParamFromTemplateRow(this._row, "days_to_count_down", 6);
  }

  private getLocalStorageKey(): string {
    return `activity_${this.params.id}`;
  }

  // Calculates the days until check in
  private checkInTimer() {
    const localStorageKey = this.getLocalStorageKey();
    const storedDate = localStorage.getItem(localStorageKey);
    if (storedDate) {
      this.unlockDate = new Date(storedDate);
    } else {
      this.unlockDate = this.getMidnightOfDate(new Date());
      this.unlockDate.setDate(this.unlockDate.getDate() + this.params.countDownDays);
      localStorage.setItem(localStorageKey, this.unlockDate.toISOString());
    }
    const dailyInterval = this.getMillisecondsUntilMidnight(); // Count until midnight
    setTimeout(() => {
      this.updateProgress();
      setInterval(() => this.updateProgress(), 24 * 60 * 60 * 1000);
    }, dailyInterval);
  }

  // Update the progress bar and unlock state
  private updateProgress(): void {
    const now = this.getMidnightOfDate(new Date());
    this.daysLeft = this.unlockDate.getTime() - now.getTime();

    if (now < this.unlockDate) {
      this.daysLeft = Math.ceil(
        (this.unlockDate.getTime() - now.getTime()) / (24 * 60 * 60 * 1000)
      );
      this.progressPercentage =
        ((this.params.countDownDays - this.daysLeft) / this.params.countDownDays) * 100;
    } else {
      this.progressPercentage = 0;
      localStorage.removeItem(this.getLocalStorageKey());
    }
  }

  // Get the number of milliseconds until midnight.
  private getMillisecondsUntilMidnight(): number {
    const now = new Date();
    const midnight = this.getMidnightOfDate(now);
    midnight.setDate(midnight.getDate() + 1);
    return midnight.getTime() - now.getTime();
  }

  // Get the midnight of a given date.
  private getMidnightOfDate(date: Date): Date {
    const midnight = new Date(date);
    midnight.setHours(0, 0, 0, 0);
    return midnight;
  }
}
