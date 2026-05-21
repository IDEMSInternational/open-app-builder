import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { CssVariableTableComponent } from "./css-variable-table.component";
import { ThemeService } from "../../services/theme.service";
import { MockThemeService } from "../../services/theme.service.mock.spec";
import { AppConfigService } from "src/app/shared/services/app-config/app-config.service";
import { MockAppConfigService } from "src/app/shared/services/app-config/app-config.service.mock.spec";
import { SystemVariableService } from "src/app/shared/services/system-variable/system-variable.service";

describe("CssVariableTableComponent", () => {
  let component: CssVariableTableComponent;
  let fixture: ComponentFixture<CssVariableTableComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [CssVariableTableComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: AppConfigService, useValue: new MockAppConfigService() },
        { provide: ThemeService, useClass: MockThemeService },
        {
          provide: SystemVariableService,
          useValue: { set: () => {}, get: () => null, remove: () => {} },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CssVariableTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
