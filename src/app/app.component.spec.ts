import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { TestBed, waitForAsync } from "@angular/core/testing";

import { ModalController, Platform } from "@ionic/angular";
import { SplashScreen } from "@capacitor/splash-screen";
import { StatusBar } from "@ionic-native/status-bar/ngx";

import { AppComponent } from "./app.component";
import { DeploymentService } from "./shared/services/deployment/deployment.service";
import { MockDeploymentService } from "./shared/services/deployment/deployment.service.mock.spec";
import { AppDataService } from "./shared/services/data/app-data.service";
import { MockAppDataService } from "./shared/services/data/app-data.service.mock.spec";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { SkinService } from "./shared/services/skin/skin.service";
import { AnalyticsService } from "./shared/services/analytics";
import { FeedbackService } from "./feature/feedback/feedback.service";
import { AppUpdateService } from "./shared/services/app-update/app-update.service";

describe("AppComponent", () => {
  let statusBarSpy, splashScreenSpy, platformReadySpy, platformSpy;

  beforeEach(waitForAsync(() => {
    statusBarSpy = jasmine.createSpyObj("StatusBar", ["styleDefault"]);
    splashScreenSpy = jasmine.createSpyObj("SplashScreen", ["hide"]);
    platformReadySpy = Promise.resolve();
    platformSpy = jasmine.createSpyObj("Platform", { ready: platformReadySpy });

    TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: StatusBar, useValue: statusBarSpy },
        { provide: SplashScreen, useValue: splashScreenSpy },
        { provide: Platform, useValue: platformSpy },
        { provide: DeploymentService, useValue: new MockDeploymentService() },
        { provide: AppDataService, useValue: new MockAppDataService() },
        { provide: SkinService, useValue: {} },
        { provide: ModalController, useValue: {} },
        { provide: AnalyticsService, useValue: {} },
        { provide: FeedbackService, useValue: {} },
        { provide: AppUpdateService, useValue: {} },
      ],
    }).compileComponents();
  }));

  it("should create the app", () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it("should initialize the app", async () => {
    TestBed.createComponent(AppComponent);
    expect(platformSpy.ready).toHaveBeenCalled();
    await platformReadySpy;
  });

  // TODO: add more tests!
});
