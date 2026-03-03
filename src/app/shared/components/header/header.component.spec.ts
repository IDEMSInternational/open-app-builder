import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";
import { headerComponent } from "./header.component";
import { AppConfigService } from "../../services/app-config/app-config.service";
import { Location } from "@angular/common";
import { Router, provideRouter } from "@angular/router";

@Component({
  template: "",
  standalone: false,
})
class DummyComponent {}

class MockAppConfigService {
  appConfig() {
    return {
      APP_HEADER_DEFAULTS: {
        back_button: { hidden: false },
        menu_button: { hidden: false },
        variant: "default",
        background: "primary",
      },
      APP_ROUTE_DEFAULTS: {
        home_route: "home",
      },
    };
  }
}

describe("headerComponent", () => {
  let component: headerComponent;
  let fixture: ComponentFixture<headerComponent>;
  let location: Location;
  let router: Router;

  beforeEach(waitForAsync(async () => {
    TestBed.configureTestingModule({
      declarations: [headerComponent, DummyComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        { provide: AppConfigService, useClass: MockAppConfigService },
        provideRouter([
          { path: "", component: DummyComponent },
          { path: "home", component: DummyComponent },
          { path: "test", component: DummyComponent },
        ]),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(headerComponent);
    component = fixture.componentInstance;
    location = TestBed.inject(Location);
    router = TestBed.inject(Router);

    spyOn(location, "back").and.callThrough();
    spyOn(router, "navigateByUrl").and.callThrough();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  describe("handleBackButtonClick() with real Angular Router", () => {
    it("should navigate to home route if on initial load (navigationId === 1)", async () => {
      // Trigger initial navigation
      await router.navigateByUrl("/");

      const state = location.getState() as any;
      expect(state.navigationId).toBe(1); // Protect against API regressions

      // Reset the spy so we don't count the setup navigation
      (router.navigateByUrl as jasmine.Spy).calls.reset();

      component.handleBackButtonClick();

      expect(router.navigateByUrl).toHaveBeenCalledWith("/");
      expect(location.back).not.toHaveBeenCalled();
    });

    it("should use location.back() if there is prior history (navigationId > 1)", async () => {
      // Trigger initial navigation
      await router.navigateByUrl("/");
      // Trigger subsequent navigation
      await router.navigateByUrl("/test");

      const state = location.getState() as any;
      expect(state.navigationId).toBe(2); // Protect against API regressions

      // Reset the spy so we don't count the setup navigations
      (router.navigateByUrl as jasmine.Spy).calls.reset();

      component.handleBackButtonClick();

      expect(location.back).toHaveBeenCalled();
      expect(router.navigateByUrl).not.toHaveBeenCalledWith("/");
    });
  });
});
