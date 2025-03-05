import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";

import { TmplDisplayGridComponent } from "./display-grid.component";
import { DataItemsService } from "../../data-items/data-items.service";
import { FilterDisplayComponentPipe } from "../../../pipes/filter-display-component.pipe";

describe("TmplDisplayGridComponent", () => {
  let component: TmplDisplayGridComponent;
  let fixture: ComponentFixture<TmplDisplayGridComponent>;

  beforeEach(waitForAsync(async () => {
    await TestBed.configureTestingModule({
      declarations: [TmplDisplayGridComponent, FilterDisplayComponentPipe],
      providers: [{ provider: DataItemsService, useValue: {} }],
    }).compileComponents();

    fixture = TestBed.createComponent(TmplDisplayGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // TODO - requires better DataItemsService mock
  xit("should create", () => {
    expect(component).toBeTruthy();
  });
});
