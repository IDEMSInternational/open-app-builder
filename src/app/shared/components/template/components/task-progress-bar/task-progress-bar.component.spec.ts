import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { TmplTaskProgressBarComponent } from "./task-progress-bar.component";

describe("TmplTaskProgressBarComponent", () => {
  let component: TmplTaskProgressBarComponent;
  let fixture: ComponentFixture<TmplTaskProgressBarComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [TmplTaskProgressBarComponent],
        imports: [IonicModule.forRoot()],
      }).compileComponents();

      fixture = TestBed.createComponent(TmplTaskProgressBarComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
