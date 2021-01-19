import { Component, OnInit } from '@angular/core';
import { FlowTypes } from 'scripts/types';
import { CARE_PACKAGE_LIST } from 'src/app/shared/services/data/data.service';

@Component({
  selector: 'plh-care-packages',
  templateUrl: './care-packages.page.html',
  styleUrls: ['./care-packages.page.scss'],
})
export class CarePackagesPage implements OnInit {

  carePackages: FlowTypes.CarePackage[] = [];

  constructor() {
    if (CARE_PACKAGE_LIST && CARE_PACKAGE_LIST.length > 0) {
      this.carePackages = CARE_PACKAGE_LIST[0].rows;
    }
  }

  ngOnInit() {
  }

}
