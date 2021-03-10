import { Component, OnInit } from "@angular/core";
import { RemindersService } from "../reminders.service";

@Component({
  selector: "plh-reminders-page",
  templateUrl: "./reminders-page.component.html",
  styleUrls: ["./reminders-page.component.scss"],
})
export class RemindersPageComponent implements OnInit {
  constructor(public remindersService: RemindersService) {}

  ngOnInit(): void {}
}
