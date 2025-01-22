import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { TmplTaskCardComponent } from "./task-card.component";
import { TaskService } from "src/app/shared/services/task/task.service";
import { TemplateFieldService } from "../../services/template-field.service";
import { MockTemplateFieldService } from "../../services/template-field.service.spec";

describe("TmplTaskCardComponent", () => {
  let component: TmplTaskCardComponent;
  let fixture: ComponentFixture<TmplTaskCardComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TmplTaskCardComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: TaskService, useValue: {} },
        { provide: TemplateFieldService, useValue: new MockTemplateFieldService() },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TmplTaskCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
