import { Component, OnInit } from '@angular/core';
import { FamilyService } from 'src/app/shared/services/family/family.service';
import { FamilyMember } from 'src/app/shared/model/family.model';

@Component({
  selector: 'plh-family',
  templateUrl: './family.page.html',
  styleUrls: ['./family.page.scss'],
})
export class FamilyPage implements OnInit {

  familyMembers: FamilyMember[];

  constructor(private familyService: FamilyService) {
  }

  ngOnInit() {
    this.familyMembers = this.familyService.getFamilyMembers();
  }

}
