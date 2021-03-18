import { TestBed } from '@angular/core/testing';
import { LocalStorageService } from 'src/app/shared/services/local-storage/local-storage.service';
import { TemplateService } from 'src/app/shared/services/template/template.service';

fdescribe('TemplateService', () => {
  let service: TemplateService;

  let mockLocalStorageService: LocalStorageService = jasmine.createSpyObj("LocalStorageService", ["setString", "getString"]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: LocalStorageService, useValue: mockLocalStorageService }
      ]
    });
    service = TestBed.inject(TemplateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should use local storage to set template global variables', () => {
    service.setGlobal("test_name", "test_value");
    expect(mockLocalStorageService).toHaveBeenCalledOnceWith("template_global.test_name", "test_value");
  });

  it('should use local storage to get template global variables', () => {
    spyOn(mockLocalStorageService, "getString").and.returnValue("mock_result");
    const result = service.getGlobal("test_name");
    expect(result).toEqual("mock_result");
    expect(mockLocalStorageService).toHaveBeenCalledOnceWith("template_global.test_name");
  });
});
