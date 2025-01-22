import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { TmplTaskProgressBarComponent } from "./task-progress-bar.component";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import { TaskService } from "src/app/shared/services/task/task.service";
import { MockAsyncServiceBase } from "src/app/shared/services/asyncService.base.mock.spec";

describe("TmplTaskProgressBarComponent", () => {
  let component: TmplTaskProgressBarComponent;
  let fixture: ComponentFixture<TmplTaskProgressBarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TmplTaskProgressBarComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: DynamicDataService, useValue: {} },
        { provide: TaskService, useValue: new MockAsyncServiceBase() },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TmplTaskProgressBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
