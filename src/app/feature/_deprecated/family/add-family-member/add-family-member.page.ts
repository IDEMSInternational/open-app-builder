import { Component, OnInit } from "@angular/core";
import { FamilyService } from "../services/family.service";
import { FamilyMember } from "src/app/feature/_deprecated/family/family.model";
import { Router } from "@angular/router";

@Component({
  selector: "plh-add-family-member",
  templateUrl: "./add-family-member.page.html",
  styleUrls: ["./add-family-member.page.scss"],
})
export class AddFamilyMemberPage implements OnInit {
  newMember: FamilyMember = {
    name: "",
    ageRange: "adult",
    avatarProperties: {
      bodyColor: "#00A1CD",
    },
  };

  colorOptions = ["#00A1CD", "#36D0AB", "#D85277"];

  constructor(private familyService: FamilyService, private router: Router) {}

  ngOnInit() {}

  onSubmit() {
    this.familyService.addFamilyMember(this.newMember);
    this.router.navigateByUrl("/family");
  }

  onColorChange(color: string) {
    this.newMember.avatarProperties.bodyColor = color;
  }
}
