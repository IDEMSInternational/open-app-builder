import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { CssVariableTableComponent } from "./css-variable-table.component";
import { ThemeService } from "../../services/theme.service";
import { MockThemeService } from "../../services/theme.service.mock.spec";

describe("CssVariableTableComponent", () => {
  let component: CssVariableTableComponent;
  let fixture: ComponentFixture<CssVariableTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CssVariableTableComponent],
      imports: [IonicModule.forRoot()],
      providers: [{ provide: ThemeService, useValue: new MockThemeService() }],
    }).compileComponents();

    fixture = TestBed.createComponent(CssVariableTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
