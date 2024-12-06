import { TestBed } from "@angular/core/testing";

import { FlowTypes } from "../../models";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { DataItemsService } from "./data-items.service";
import { DynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service";
import { MockDynamicDataService } from "src/app/shared/services/dynamic-data/dynamic-data.service.mock.spec";
import { firstValueFrom } from "rxjs";
import { DataItemProcessor } from "./data-items.processor";

const MOCK_DATA_ITEMS_ROW: FlowTypes.TemplateRow = {
  _nested_name: "",
  name: "",
  type: "data_items",
  value: "mock_data_items_list",
  rows: [
    {
      _nested_name: "",
      name: "",
      type: "text",
      value: "@item.id",
    },
  ],
};

const MOCK_DATA_ITEMS_LIST: FlowTypes.Data_listRow[] = [
  {
    id: "id_1",
    completed: true,
  },
  {
    id: "id_2",
    completed: true,
  },
];

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/components/template/components/data-items/data-items.service.spec.ts
 */
describe("DataItemsService", () => {
  let service: DataItemsService;
  let dataItemsProcessorSpy: jasmine.SpyObj<DataItemProcessor>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: DynamicDataService,
          useValue: new MockDynamicDataService({
            data_list: {
              mock_data_items_list: MOCK_DATA_ITEMS_LIST,
            },
          }),
        },
      ],
    });
    service = TestBed.inject(DataItemsService);

    // mock calls to data items processor
    dataItemsProcessorSpy = jasmine.createSpyObj("DataItemProcessor", ["renderItems"]);
    service["getDataItemsProcessor"] = () => dataItemsProcessorSpy;
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("retrieves data_list data and provides observable list of processed data", async () => {
    const MOCK_LOCAL_VARIABLES = {};
    const obs = service.getItemsObservable(MOCK_DATA_ITEMS_ROW, {});
    await firstValueFrom(obs);
    expect(dataItemsProcessorSpy.renderItems).toHaveBeenCalledWith(
      MOCK_DATA_ITEMS_LIST,
      MOCK_DATA_ITEMS_ROW.rows,
      MOCK_LOCAL_VARIABLES
    );
  });
});
