import { Component, OnInit } from "@angular/core";
import { FamilyService } from "./services/family.service";
import { FamilyMember } from "src/app/feature/_deprecated/family/family.model";
import { Router, NavigationEnd } from "@angular/router";

@Component({
  selector: "plh-family",
  templateUrl: "./family.page.html",
  styleUrls: ["./family.page.scss"],
})
export class FamilyPage implements OnInit {
  familyMembers: FamilyMember[];

  constructor(private familyService: FamilyService, private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd && event.url === "/family") {
        this.familyMembers = this.familyService.getFamilyMembers();
      }
    });
  }

  ngOnInit() {
    this.familyMembers = this.familyService.getFamilyMembers();
  }
}
