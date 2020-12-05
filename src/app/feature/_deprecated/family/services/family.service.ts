import { Injectable } from "@angular/core";
import { FamilyMember } from "../family.model";

@Injectable({
  providedIn: "root",
})
export class FamilyService {
  constructor() {}

  addFamilyMember(member: FamilyMember) {
    var existingFamilyMembers = [];
    if (localStorage.getItem("familyMembers")) {
      existingFamilyMembers = JSON.parse(localStorage.getItem("familyMembers"));
    }
    existingFamilyMembers.push(member);
    localStorage.setItem("familyMembers", JSON.stringify(existingFamilyMembers));
  }

  getFamilyMembers(): FamilyMember[] {
    if (localStorage.getItem("familyMembers")) {
      return JSON.parse(localStorage.getItem("familyMembers"));
    }
    return [];
  }
}
