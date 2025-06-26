import { TestBed } from "@angular/core/testing";
import { NavigateBackService } from "./navigate-back.service";
import { TemplateActionRegistry } from "../../components/template/services/instance/template-action.registry";

describe("NavigateBackService", () => {
  let service: NavigateBackService;
  let templateActionRegistry: jasmine.SpyObj<TemplateActionRegistry>;

  beforeEach(() => {
    const registrySpy = jasmine.createSpyObj("TemplateActionRegistry", ["register"]);
    TestBed.configureTestingModule({
      providers: [NavigateBackService, { provide: TemplateActionRegistry, useValue: registrySpy }],
    });
    service = TestBed.inject(NavigateBackService);
    templateActionRegistry = TestBed.inject(
      TemplateActionRegistry
    ) as jasmine.SpyObj<TemplateActionRegistry>;
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should register navigate_back action", () => {
    expect(templateActionRegistry.register).toHaveBeenCalledWith(
      jasmine.objectContaining({ navigate_back: jasmine.any(Function) })
    );
  });

  it("should call window.history.back when navigateBack is called", () => {
    spyOn(window.history, "back");
    service.navigateBack();
    expect(window.history.back).toHaveBeenCalled();
  });
});
