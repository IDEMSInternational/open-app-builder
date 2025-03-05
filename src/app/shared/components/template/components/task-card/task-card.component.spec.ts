import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { TmplTaskCardComponent } from "./task-card.component";
import { TaskService } from "src/app/shared/services/task/task.service";
import { TemplateFieldService } from "../../services/template-field.service";
import { MockTemplateFieldService } from "../../services/template-field.service.spec";
import { FlowTypes } from "packages/data-models";

const MOCK_ROW: FlowTypes.TemplateRow = { _nested_name: "", name: "", type: "task_card" };

describe("TmplTaskCardComponent", () => {
  let component: TmplTaskCardComponent;
  let fixture: ComponentFixture<TmplTaskCardComponent>;

  beforeEach(waitForAsync(async () => {
    TestBed.configureTestingModule({
      declarations: [TmplTaskCardComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: TaskService, useValue: {} },
        { provide: TemplateFieldService, useValue: new MockTemplateFieldService() },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TmplTaskCardComponent);
    fixture.componentRef.setInput("row", MOCK_ROW);
    await fixture.whenStable();
    component = fixture.componentInstance;
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
