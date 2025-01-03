import { Component, computed, OnInit, signal } from "@angular/core";
import { addDays, differenceInCalendarDays, isValid, parseISO, startOfDay } from "date-fns";
import { TemplateBaseComponent } from "src/app/shared/components/template/components/base";
import { TemplateTranslateService } from "src/app/shared/components/template/services/template-translate.service";
import {
  getNumberParamFromTemplateRow,
  getParamFromTemplateRow,
  getStringParamFromTemplateRow,
} from "src/app/shared/utils";

interface IActivityCheckInParams {
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

  daysUntilUnlock = signal(Infinity);
  locked = computed(() => {
    // If no start date is provided, activity should be locked
    if (!this.params.countdownStartDate) return true;
    return this.daysUntilUnlock() && this.daysUntilUnlock() > 0;
  });
  countdownText = computed(() => {
    const targetIndex = Math.min(
      this.daysUntilUnlock() - 1,
      this.params.countdownTextList.length - 1
    );
    return this.params.countdownTextList[targetIndex];
  });
  progressPercentage = computed(() => {
    if (this.daysUntilUnlock() === Infinity) return 0;
    return (
      ((this.params.countDownDays - (this.daysUntilUnlock() || 0)) / this.params.countDownDays) *
      100
    );
  });

  constructor(public templateTranslateService: TemplateTranslateService) {
    super();
  }

  ngOnInit() {
    this.getParams();
    this.calculateDaysUntilUnlock();
  }

  private getParams() {
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
    let parsedDate = null;
    if (countdownStartDate) {
      const attemptDate = new Date(countdownStartDate);
      if (isValid(attemptDate)) {
        parsedDate = attemptDate;
      } else {
        const attemptISO = parseISO(countdownStartDate);
        if (isValid(attemptISO)) {
          parsedDate = attemptISO;
        }
      }
    }
    this.params.countdownStartDate = parsedDate;

    let countdownTextList = getParamFromTemplateRow(this._row, "countdown_text_list", []);
    if (typeof countdownTextList === "string") {
      countdownTextList = countdownTextList.split(",").map((text) => text.trim());
    }
    this.params.countdownTextList = countdownTextList;
  }

  private calculateDaysUntilUnlock() {
    if (this.params.countDownDays === 0) this.daysUntilUnlock.set(0);
    if (this.params.countdownStartDate && this.params.countDownDays) {
      const unlockDate = addDays(this.params.countdownStartDate, this.params.countDownDays);
      const daysRemaining = differenceInCalendarDays(
        startOfDay(unlockDate),
        startOfDay(new Date())
      );
      this.daysUntilUnlock.set(Math.max(daysRemaining, 0));
    }
  }
}
