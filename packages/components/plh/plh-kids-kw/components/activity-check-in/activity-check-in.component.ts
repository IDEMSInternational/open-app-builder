import { Component, OnInit } from "@angular/core";
import { addDays, differenceInCalendarDays, parseISO, startOfDay, toDate } from "date-fns";
import { TemplateBaseComponent } from "src/app/shared/components/template/components/base";
import { TemplateTranslateService } from "src/app/shared/components/template/services/template-translate.service";
import {
  getNumberParamFromTemplateRow,
  getParamFromTemplateRow,
  getStringParamFromTemplateRow,
} from "src/app/shared/utils";

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
  /* TEMPLATE PARAMETER: "countdown_start_date". The date when the countdown is initially started */
  countdownStartDate?: Date;
  /* TEMPLATE PARAMETER: "countdown_days". The number of days after the start date that the activity is unlocked */
  countDownDays?: number;
  /* TEMPLATE PARAMETER: "countdown_text_list". A list of text strings relating to the number of days left to countdown, in order from fewest to most */
  countdownTextList?: string[];
}

@Component({
  selector: "plh-activity-check-in",
  templateUrl: "./activity-check-in.component.html",
  styleUrls: ["./activity-check-in.component.scss"],
})
export class PlhActivityCheckInComponent extends TemplateBaseComponent implements OnInit {
  params: Partial<IActivityCheckInParams> = {};

  progressPercentage: number = 16; // Initial progress
  daysUntilUnlock: number;

  get locked() {
    return this.daysUntilUnlock && this.daysUntilUnlock > 0;
  }

  constructor(public templateTranslateService: TemplateTranslateService) {
    super();
  }

  ngOnInit() {
    this.getParams();
    this.calculateDaysUntilUnlock();
  }

  public getCountdownText() {
    return this.params.countdownTextList[
      Math.min(this.daysUntilUnlock - 1, this.params.countdownTextList.length - 1)
    ];
  }

  public getProgressPercentage() {
    return ((this.params.countDownDays - this.daysUntilUnlock) / this.params.countDownDays) * 100;
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
    this.params.countDownDays = getNumberParamFromTemplateRow(this._row, "countdown_days", 6);
    const countdownStartDate = getParamFromTemplateRow(this._row, "countdown_start_date", null);
    try {
      const parsedDate = parseISO(countdownStartDate);
      this.params.countdownStartDate = parsedDate;
    } catch {
      console.error(
        `[ACTIVITY CHECK-IN] Invalid date for countdown_start_date: ${countdownStartDate}`
      );
    }

    let countdownTextList = getParamFromTemplateRow(this._row, "countdown_text_list", []);
    if (typeof countdownTextList === "string") {
      countdownTextList = countdownTextList.split(",").map((text) => text.trim());
    }
    this.params.countdownTextList = countdownTextList;
  }

  private calculateDaysUntilUnlock() {
    if (this.params.countdownStartDate && this.params.countDownDays) {
      const unlockDate = addDays(this.params.countdownStartDate, this.params.countDownDays);
      const daysRemaining = differenceInCalendarDays(
        startOfDay(unlockDate),
        startOfDay(new Date())
      );
      this.daysUntilUnlock = Math.max(daysRemaining, 0);
    }
  }
}
