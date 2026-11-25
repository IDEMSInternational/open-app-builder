import { TestBed } from "@angular/core/testing";
import { ExtraOptions, ROUTER_CONFIGURATION, Router } from "@angular/router";
import { DeploymentService } from "src/app/shared/services/deployment/deployment.service";
import {
  canLeaveReactiveTemplatePage,
  provideReactiveTemplateNavigation,
} from "./navigation-service";

describe("reactive template navigation hooks", () => {
  const routerOptions: ExtraOptions = { anchorScrolling: "enabled", useHash: false };
  let currentNavigation: jasmine.Spy;

  beforeEach(() => {
    currentNavigation = jasmine.createSpy("currentNavigation").and.returnValue(null);
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Router,
          useValue: { currentNavigation },
        },
        { provide: DeploymentService, useValue: { config: { useReactiveTemplates: true } } },
        provideReactiveTemplateNavigation(routerOptions),
      ],
    });
  });

  it("bypasses legacy pages without consulting the router or running leave actions", () => {
    const page = {
      useReactiveTemplates: false,
      canLeave: jasmine.createSpy().and.resolveTo(false),
    };

    expect(TestBed.runInInjectionContext(() => canLeaveReactiveTemplatePage(page))).toBeTrue();
    expect(page.canLeave).not.toHaveBeenCalled();
    expect(TestBed.inject(Router).currentNavigation).not.toHaveBeenCalled();
  });

  it("waits for the reactive page's decision on browser history navigation", async () => {
    currentNavigation.and.returnValue({ trigger: "popstate" });
    const page = { useReactiveTemplates: true, canLeave: jasmine.createSpy().and.resolveTo(false) };

    expect(
      await TestBed.runInInjectionContext(() => canLeaveReactiveTemplatePage(page))
    ).toBeFalse();
    expect(page.canLeave).toHaveBeenCalledTimes(1);

    page.canLeave.and.resolveTo(true);
    expect(
      await TestBed.runInInjectionContext(() => canLeaveReactiveTemplatePage(page))
    ).toBeTrue();
  });

  it("does not repeat leave checks for imperative reactive navigation", () => {
    currentNavigation.and.returnValue({ trigger: "imperative" });
    const page = { useReactiveTemplates: true, canLeave: jasmine.createSpy().and.resolveTo(false) };

    expect(TestBed.runInInjectionContext(() => canLeaveReactiveTemplatePage(page))).toBeTrue();
    expect(page.canLeave).not.toHaveBeenCalled();
  });

  it("restores cancelled history navigation only in reactive mode, preserving other router options", () => {
    expect(TestBed.inject(ROUTER_CONFIGURATION)).toEqual({
      ...routerOptions,
      canceledNavigationResolution: "computed",
    });
  });

  it("preserves the original router configuration in legacy mode", () => {
    TestBed.overrideProvider(DeploymentService, {
      useValue: { config: { useReactiveTemplates: false } },
    });

    expect(TestBed.inject(ROUTER_CONFIGURATION)).toBe(routerOptions);
  });
});
