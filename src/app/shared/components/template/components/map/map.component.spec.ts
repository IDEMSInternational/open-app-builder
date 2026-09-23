import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import { MapComponent } from "./map.component";

describe("MapComponent", () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [MapComponent],
      imports: [IonicModule.forRoot()],
      providers: [
        {
          provide: DynamicDataService,
          useValue: {
            snapshot: jasmine.createSpy("snapshot").and.resolveTo([]),
            remove: jasmine.createSpy("remove").and.resolveTo(),
            bulkUpsert: jasmine.createSpy("bulkUpsert").and.resolveTo(),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput("row", {
      _nested_name: "map_test",
      name: "map_test",
      type: "map",
      parameter_list: {},
    } as any);
    fixture.detectChanges();
  }));

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
