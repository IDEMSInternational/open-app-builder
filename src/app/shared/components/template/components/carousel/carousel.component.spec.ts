import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { TmplCarouselComponent } from "./carousel.component";
import { AppConfigService } from "src/app/shared/services/app-config/app-config.service";
import { MockAppConfigService } from "src/app/shared/services/app-config/app-config.service.mock.spec";
import { AppDataService } from "src/app/shared/services/data/app-data.service";
import { MockAppDataService } from "src/app/shared/services/data/app-data.service.mock.spec";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import { TaskService } from "src/app/shared/services/task/task.service";
import { DataItemsService } from "../data-items/data-items.service";
import { FlowTypes } from "packages/data-models";

const MOCK_ROW: FlowTypes.TemplateRow = { _nested_name: "", name: "", type: "carousel" };

describe("CarouselComponent", () => {
  let component: TmplCarouselComponent;
  let fixture: ComponentFixture<TmplCarouselComponent>;

  beforeEach(waitForAsync(async () => {
    TestBed.configureTestingModule({
      declarations: [TmplCarouselComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: AppConfigService, useValue: new MockAppConfigService() },
        { provide: AppDataService, useValue: new MockAppDataService() },
        { provide: DynamicDataService, useValue: {} },
        { provide: TaskService, useValue: {} },
        { provide: DataItemsService, useValue: {} },
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TmplCarouselComponent);
    fixture.componentRef.setInput("row", MOCK_ROW);
    await fixture.whenStable();
    component = fixture.componentInstance;
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
