import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { ModulePageComponent } from "./module-page";

describe("ModulePage", () => {
  let component: ModulePageComponent;
  let fixture: ComponentFixture<ModulePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModulePageComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ModulePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
