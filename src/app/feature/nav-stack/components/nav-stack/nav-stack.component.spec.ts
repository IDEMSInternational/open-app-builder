import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { NavStackComponent } from "./nav-stack.component";
import { Component, input } from "@angular/core";
import { TemplateLifecycleService } from "src/app/shared/components/template/services/template-lifecycle.service";

// HACK - mock child `<plh-template-container>` component to bypass imports
@Component({
  selector: "plh-template-container",
  template: "<div></div>",
  standalone: false,
})
class MockTemplateContainerComponent {
  templatename = input<string>();
}

describe("NavStackComponent", () => {
  let component: NavStackComponent;
  let fixture: ComponentFixture<NavStackComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [NavStackComponent, MockTemplateContainerComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: TemplateLifecycleService,
          useValue: { addOverlay: () => null, removeOverlay: () => null },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(NavStackComponent);
    fixture.componentRef.setInput("config", {});
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
