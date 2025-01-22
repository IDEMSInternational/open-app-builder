import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { TmplTaskProgressBarComponent } from "./task-progress-bar.component";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import { TaskService } from "src/app/shared/services/task/task.service";
import { AsyncServiceBase } from "src/app/shared/services/asyncService.base";

class MockTaskService extends AsyncServiceBase {
  constructor() {
    super("MockTaskService");
    this.registerInitFunction(() => null);
  }
  getTaskGroupDataRows: () => null;
}

describe("TmplTaskProgressBarComponent", () => {
  let component: TmplTaskProgressBarComponent;
  let fixture: ComponentFixture<TmplTaskProgressBarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TmplTaskProgressBarComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: DynamicDataService, useValue: {} },
        { provide: TaskService, useValue: new MockTaskService() },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TmplTaskProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  // TODO - requires better mock task service to implement
  xit("should create", () => {
    expect(component).toBeTruthy();
  });
});
