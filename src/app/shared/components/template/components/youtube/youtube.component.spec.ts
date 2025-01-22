import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { YoutubeComponent } from "./youtube.component";
import { TemplateTranslateService } from "../../services/template-translate.service";
import { MockTemplateTranslateService } from "../../services/template-translate.service.spec";

describe("YoutubeComponent", () => {
  let component: YoutubeComponent;
  let fixture: ComponentFixture<YoutubeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [YoutubeComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: TemplateTranslateService, useValue: new MockTemplateTranslateService() },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(YoutubeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
