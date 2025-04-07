import { Component } from "@angular/core";
import { SharedDataService } from "../../shared-data.service";

@Component({
  selector: "plh-shared-data-debug",
  templateUrl: "./shared-data-debug.page.html",
  styleUrls: ["./shared-data-debug.page.scss"],
  standalone: true,
  imports: [],
})
export class SharedDataDebugPage {
  constructor(private service: SharedDataService) {}
}
