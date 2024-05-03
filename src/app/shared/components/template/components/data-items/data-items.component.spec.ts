import { ComponentFixture, TestBed, tick, fakeAsync } from "@angular/core/testing";
import { of } from "rxjs";

import { TmplDataItemsComponent } from "./data-items.component";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import { TemplateFieldService } from "../../services/template-field.service";
import { TemplateVariablesService } from "../../services/template-variables.service";
import { FlowTypes } from "../../models";
import { MockTemplateRowService } from "../../services/instance/template-row-service.spec";

const mock_data_list = [{ id: "first_item" }, { id: "second_item" }, { id: "last_item" }];

const mock_item_row: FlowTypes.TemplateRow = {
  name: "",
  value: "test_data_list",
  rows: [
    {
      type: "text",
      name: "",
      _nested_name: "",
      value: "@item.id",
    },
  ],
  _nested_name: "",
  type: "data_items",
};

// yarn ng test --include src/app/shared/components/template/components/data-items/data-items.component.spec.ts
describe("DataItemsComponent", () => {
  let component: TmplDataItemsComponent;
  let fixture: ComponentFixture<TmplDataItemsComponent>;

  let dynamicDataServiceSpy: jasmine.SpyObj<DynamicDataService>;

  beforeEach(async () => {
    // create spy methods for dynamicDataService query and ready methods
    dynamicDataServiceSpy = jasmine.createSpyObj("DynamicDataService", ["query$", "ready"]);
    dynamicDataServiceSpy.ready.and.resolveTo(true);
    dynamicDataServiceSpy.query$.and.resolveTo(of(mock_data_list));

    await TestBed.configureTestingModule({
      declarations: [TmplDataItemsComponent],
      providers: [
        {
          provide: DynamicDataService,
          useValue: dynamicDataServiceSpy,
        },
        { provide: TemplateFieldService, useValue: {} },
        {
          provide: TemplateVariablesService,
          useValue: {
            evaluateConditionString: (s: string) => s,
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TmplDataItemsComponent);
    component = fixture.componentInstance;

    // Hack - templateRowService is initialised in constructor so overwrite with mock after create
    component["templateRowService"] = new MockTemplateRowService();

    // HACK - include parent templateRowService method used to access local row map
    component.parent = {
      templateRowService: { templateRowMap: { parent_local: { value: "parent_local_value" } } },
    } as any;

    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  //
  // https://angular.io/guide/testing-components-scenarios#component-with-async-service
  it("subscribes to data on row input", fakeAsync(() => {
    component.row = mock_item_row;
    // hack - input setter has 50ms debounce so wait to ensure data called
    tick(100);
    expect(dynamicDataServiceSpy.ready).toHaveBeenCalledOnceWith();
    // NOTE - avoid waiting for fixture changes as render method does not have access to ui components
    // fixture.detectChanges();
  }));
  it("populates item rows with context", fakeAsync(() => {
    component.row = mock_item_row;
    tick(100);
    expect(component.itemRows.length).toEqual(3);
    const lastItem = component.itemRows[2];
    expect(lastItem._evalContext.itemContext).toEqual({
      id: "last_item",
      _first: false,
      _id: "last_item",
      _index: 2,
      _last: true,
    });
    // NOTE - can't test processing of row value using item context currently
  }));
  it("supports local variables within item context", fakeAsync(() => {
    component.row = {
      ...mock_item_row,
      rows: [{ value: "@local.parent_local", name: "", _nested_name: "", type: "text" }],
    };
    tick(100);
    console.log("itemRows", component.itemRows);
  }));
});
