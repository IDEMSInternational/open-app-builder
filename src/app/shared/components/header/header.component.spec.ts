import { Component, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  flushMicrotasks,
  tick,
  waitForAsync,
} from "@angular/core/testing";
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

  describe("header collapse", () => {
    const headerHeight = 100;
    let content: HTMLElement;
    let scrollRange: number;

    /** Emit an ionScroll event from a page that can scroll by `scrollRange` */
    function scroll(currentY: number) {
      content.dispatchEvent(new CustomEvent("ionScroll", { bubbles: true, detail: { currentY } }));
      flushMicrotasks();
    }

    beforeEach(() => {
      content = document.createElement("div");
      (content as any).getScrollElement = async () => ({
        scrollHeight: scrollRange + 500,
        clientHeight: 500,
      });
      document.body.appendChild(content);
      fixture.detectChanges();
      component.headerElement = { el: { clientHeight: headerHeight } } as any;
      (component as any).listenToScrollEvents();
    });

    afterEach(() => {
      component.ngOnDestroy();
      content.remove();
    });

    it("does not collapse when the page would not scroll past the header once collapsed", fakeAsync(() => {
      scrollRange = 150;
      [0, 50, 120, 150].forEach((y) => scroll(y));
      expect(component.marginTop()).toBe(0);
    }));

    it("stays collapsed when collapsing moves the scroll position at the bottom of the page", fakeAsync(() => {
      scrollRange = 600;
      scroll(0);
      scroll(150);
      expect(component.marginTop()).toBe(-headerHeight);
      tick(500);
      scroll(600);
      // The page is taller once the header has collapsed, so the browser moves the scroll position up
      scrollRange = 500;
      scroll(500);
      expect(component.marginTop()).toBe(-headerHeight);
      // Scrolling up brings the header back
      scroll(480);
      expect(component.marginTop()).toBe(0);
    }));
  });
});
