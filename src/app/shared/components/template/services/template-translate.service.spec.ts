import { TestBed } from "@angular/core/testing";
import { TemplateTranslateService } from "./template-translate.service";
import { AppDataService } from "src/app/shared/services/data/app-data.service";
import { MockAppDataService } from "src/app/shared/services/data/app-data.service.mock.spec";
import { AppConfigService } from "src/app/shared/services/app-config/app-config.service";
import { MockAppConfigService } from "src/app/shared/services/app-config/app-config.service.spec";

const MOCK_DATA_LIST_ROWS = [
  {
    id: "id_1",
    text: "Hello",
    non_translated_text: "world",
    row_index: 0,
    _translations: {
      text: {
        es_sp: true,
      },
    },
    _translatedFields: {
      text: {
        eng: "Hello",
      },
    },
  },
];

/** Mock calls for field values from the template field service to return test data */
export class MockTemplateTranslateService implements Partial<TemplateTranslateService> {
  public translateValue(value: string) {
    return value;
  }

  public async ready(timeoutValue?: number): Promise<boolean> {
    return true;
  }
}

/**
 * Call standalone tests via:
 * yarn ng test --include src/app/shared/components/template/services/template-translate.service.spec.ts
 */
describe("TemplateTranslateService", () => {
  let service: TemplateTranslateService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: AppDataService,
          useValue: new MockAppDataService(
            { data_list: {} },
            {
              es_sp: {
                Hello: "hola",
              },
            }
          ),
        },
        {
          provide: AppConfigService,
          useValue: new MockAppConfigService({ APP_LANGUAGES: { default: "en_mock" } }),
        },
      ],
    });
    service = TestBed.inject(TemplateTranslateService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("Updates translation_strings on language set", async () => {
    await service.setLanguage("es_sp");
    expect(service.translation_strings).toEqual({ Hello: "hola" });
  });

  it("translateDataListRows", async () => {
    await service.setLanguage("es_sp");
    const [row_0] = service.translateDataListRows(MOCK_DATA_LIST_ROWS);
    expect(row_0.text).toEqual("hola");
    expect(row_0.non_translated_text).toEqual("world");
  });
});
