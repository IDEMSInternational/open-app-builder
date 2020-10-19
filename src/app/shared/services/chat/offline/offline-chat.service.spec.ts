import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { OfflineChatService } from './offline-chat.service';
import { ChatMessage } from '../chat-msg.model';
import { testFlowExport1 } from './test-flow-exports/test-export1';

fdescribe('OfflineChatService', () => {

  let service: OfflineChatService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {

    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        OfflineChatService
      ]
    });
    httpTestingController = TestBed.get(HttpTestingController);;
    service = TestBed.get(OfflineChatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should load json file via http', () => {
    let flowUrl = "assets/rapid-pro-flow-exports/idems-plh-app_1.json";
    service.loadExportFile(flowUrl).subscribe((exportObject) => {
      expect(exportObject).toBeDefined();
    });
    let req = httpTestingController.match(flowUrl)[0];
    
    req.flush(JSON.stringify(testFlowExport1));
  });

  it('should open flow correctly', () => {
    let flowUrl = "assets/rapid-pro-flow-exports/idems-plh-app_1.json";
    service.loadExportFile(flowUrl).subscribe((exportObject) => {
      let parsedFlow = service.getFlowById(testFlowExport1.flows[0].uuid);
      expect(parsedFlow).toBeDefined();
    });
    let req = httpTestingController.match(flowUrl)[0];
    
    req.flush(JSON.stringify(testFlowExport1));
  });

  it('should cause one message to be sent for flow 1', () => {
    let flowUrl = "assets/rapid-pro-flow-exports/idems-plh-app_1.json";
    let messages: ChatMessage[] = [];
    service.loadExportFile(flowUrl).subscribe((exportObject) => {
      service.messages$.subscribe((messages) => {
        messages = messages;
      });
      service.startFlowByName(testFlowExport1.flows[0].name);
    });
    let req = httpTestingController.match(flowUrl)[0];
    
    req.flush(JSON.stringify(testFlowExport1));
    expect(messages.length).toEqual(1);
  });
});
