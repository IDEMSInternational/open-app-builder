import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { TmplSharedDataComponent } from "./shared-data.component";
import { DeploymentService } from "src/app/shared/services/deployment/deployment.service";
import { MockDeploymentService } from "src/app/shared/services/deployment/deployment.service.mock.spec";

describe("SharedDataComponent", () => {
  let component: TmplSharedDataComponent;
  let fixture: ComponentFixture<TmplSharedDataComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TmplSharedDataComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: DeploymentService,
          useValue: new MockDeploymentService(),
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TmplSharedDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
