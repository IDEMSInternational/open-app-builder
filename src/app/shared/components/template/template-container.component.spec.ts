import { waitForAsync, ComponentFixture, TestBed } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { TemplateContainerComponent } from "./template-container.component";
import { TemplateService } from "./services/template.service";
import { ActivatedRoute } from "@angular/router";
import { of } from "rxjs";
import { FilterDisplayComponentPipe } from "./pipes/filter-display-component.pipe";

describe("TemplateComponent", () => {
  let component: TemplateContainerComponent;
  let fixture: ComponentFixture<TemplateContainerComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [TemplateContainerComponent, FilterDisplayComponentPipe],
      imports: [IonicModule.forRoot()],
      providers: [
        // TODO - replace with mock methods when implementing tests
        {
          provide: TemplateService,
          useValue: {},
        },
        {
          provide: ActivatedRoute,
          useValue: { queryParams: of({}) },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TemplateContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("waitForRerender waits for a reprocess in progress, and resolves false when there is none", async () => {
    let finishReprocess: () => void;
    spyOn(component.templateRowService, "processRowUpdates").and.returnValue(
      new Promise<any>((resolve) => (finishReprocess = () => resolve([])))
    );
    expect(await component.waitForRerender()).toBeFalse();

    const reprocess = component.forceRerender(false);
    let waited: boolean | undefined;
    component.waitForRerender().then((result) => (waited = result));
    await new Promise((resolve) => setTimeout(resolve));
    expect(waited).toBeUndefined();

    finishReprocess();
    await reprocess;
    await new Promise((resolve) => setTimeout(resolve));
    expect(waited).toBeTrue();
    expect(await component.waitForRerender()).toBeFalse();
  });
});
