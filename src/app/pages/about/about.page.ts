import { Component, OnInit } from "@angular/core";
import packageJson from "../../../../package.json";

@Component({
  selector: "plh-about",
  templateUrl: "./about.page.html",
  styleUrls: ["./about.page.scss"],
})
export class AboutPage implements OnInit {
  appVersion = packageJson.version;

  constructor() {}

  ngOnInit() {}
}
