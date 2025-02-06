import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { ThemeEditorPage } from "./theme-editor.page";
import { ThemeService } from "../../services/theme.service";
import { MockThemeService } from "../../services/theme.service.mock.spec";
import { ColourPaletteComponent } from "../../components/colour-palette/colour-palette.component";
import { CssVariableTableComponent } from "../../components/css-variable-table/css-variable-table.component";

describe("ThemeEditorPage", () => {
  let component: ThemeEditorPage;
  let fixture: ComponentFixture<ThemeEditorPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ThemeEditorPage, ColourPaletteComponent, CssVariableTableComponent],
      imports: [IonicModule.forRoot()],
      providers: [{ provide: ThemeService, useValue: new MockThemeService() }],
    }).compileComponents();

    fixture = TestBed.createComponent(ThemeEditorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
