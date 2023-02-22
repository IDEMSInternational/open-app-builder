import { Component, OnInit } from "@angular/core";
import { AppUpdateService } from "./services/app-update.service";
import { AppUpdateInfo } from "@capawesome/capacitor-app-update";

@Component({
  selector: "plh-app-update",
  templateUrl: "./app-update.page.html",
  styleUrls: ["./app-update.page.scss"],
})
export class AppUpdatePage implements OnInit {
  appUpdateInfo: any;

  constructor(public appUpdateService: AppUpdateService) {}

  ngOnInit() {}

  async getAppUpdateInfo() {
    // const appUpdateInfo = await this.appUpdateService.getAppUpdateInfo()
    // console.log(appUpdateInfo)
    // this.appUpdateInfo = JSON.stringify(appUpdateInfo)
    await this.appUpdateService.checkForUpdatesAndAttemptImmediateUpdate();
  }
}
