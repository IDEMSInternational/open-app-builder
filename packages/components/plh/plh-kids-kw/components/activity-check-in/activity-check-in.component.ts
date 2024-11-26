import { Component, OnInit } from "@angular/core";
import { TemplateBaseComponent } from "src/app/shared/components/template/components/base";
import { getStringParamFromTemplateRow } from "src/app/shared/utils";

interface IActivityCheckInParams {
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
}

@Component({
  selector: "plh-activity-check-in",
  templateUrl: "./activity-check-in.component.html",
  styleUrls: ["./activity-check-in.component.scss"],
})
export class PlhActivityCheckInComponent extends TemplateBaseComponent implements OnInit {
  params: Partial<IActivityCheckInParams> = {};

  countDownDays: number = 6; // Number of days being counted down
  daysLeft: number = 6; // Days until unlock
  progressPercentage: number = 16; // Initial progress

  private unlockDate: Date;

  ngOnInit() {
    this.getParams();
    if (this._row.value) {
      this.checkInTimer();
    }
  }

  private getParams() {
    this.params.id = getStringParamFromTemplateRow(this._row, "id", null);
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
      this.unlockDate = new Date();
      this.unlockDate.setDate(this.unlockDate.getDate() + this.countDownDays);
      localStorage.setItem(localStorageKey, this.unlockDate.toISOString());
    }
    const dailyInterval = 24 * 60 * 60 * 1000; // 1 day
    setInterval(() => this.updateProgress(), dailyInterval);
    this.calculateUnlockDate();
  }

  // Calculates the exact unlock date
  private calculateUnlockDate(): void {
    const now = new Date();
    this.unlockDate = new Date(now.getTime() + this.countDownDays * 24 * 60 * 60 * 1000);
  }

  // Update the progress bar and unlock state
  private updateProgress(): void {
    const now = new Date();
    this.daysLeft = this.unlockDate.getTime() - now.getTime();

    if (this.daysLeft > 0) {
      this.daysLeft = Math.ceil(this.daysLeft / (24 * 60 * 60 * 1000));
      this.progressPercentage = ((this.countDownDays - this.daysLeft) / this.countDownDays) * 100;
    } else {
      this.progressPercentage = 0;
      localStorage.removeItem(this.getLocalStorageKey());
    }
  }
}
