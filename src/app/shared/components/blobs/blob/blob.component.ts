import { Component, OnInit, Input } from '@angular/core';
import { FamilyMemberAgeRange } from 'src/app/shared/model/family.model';

@Component({
  selector: 'plh-blob',
  templateUrl: './blob.component.html',
  styleUrls: ['./blob.component.scss'],
})
export class BlobComponent implements OnInit {

  @Input()
  bodyColor: string;

  @Input()
  ageRange: FamilyMemberAgeRange;

  constructor() { }

  ngOnInit() {}

}
