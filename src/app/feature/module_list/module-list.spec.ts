import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { ModuleListComponent } from "./module-list";

describe("ModuleList", () => {
  let component: ModuleListComponent;
  let fixture: ComponentFixture<ModuleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ModuleListComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ModuleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
