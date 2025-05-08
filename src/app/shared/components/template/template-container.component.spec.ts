import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { TemplateContainerComponent } from "./template-container.component";
import { TemplateService } from "./services/template.service";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { FilterDisplayComponentPipe } from "./pipes/filter-display-component.pipe";

describe("TemplateComponent", () => {
  let component: TemplateContainerComponent;
  let fixture: ComponentFixture<TemplateContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateContainerComponent, FilterDisplayComponentPipe],
      imports: [IonicModule.forRoot()],
      providers: [
        // TODO - replace with mock methods when implementing tests
        {
          provide: TemplateService,
          useValue: {},
        },
        {
          provide: ActivatedRoute,
          useValue: { queryParams: of({}) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
