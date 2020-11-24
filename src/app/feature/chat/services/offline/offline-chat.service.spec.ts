import { TestBed } from "@angular/core/testing";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing";

import { OfflineChatService } from "./offline-chat.service";
import { testFlowExport1 } from "./test-flow-exports/test-export1";
import { skip } from "rxjs/operators";

describe("OfflineChatService", () => {
  let service: OfflineChatService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [OfflineChatService],
    });
    httpTestingController = TestBed.inject(HttpTestingController);
    service = TestBed.inject(OfflineChatService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should load json file via http", () => {
    let flowUrl = "assets/rapid-pro-flow-exports/idems-plh-app_1.json";
    service.loadExportFile(flowUrl).subscribe((exportObject) => {
      expect(exportObject).toBeDefined();
    });
    let req = httpTestingController.match(flowUrl)[0];

    req.flush(testFlowExport1);
  });

  it("should open flow correctly", (done) => {
    let flowUrl = "assets/rapid-pro-flow-exports/idems-plh-app_1.json";
    service.loadExportFile(flowUrl).subscribe((exportObject) => {
      console.log("Inside load export sub");
      service.getFlowById(testFlowExport1.flows[0].uuid).subscribe((parsedFlow) => {
        expect(parsedFlow).toBeDefined();
        expect(parsedFlow.name).toEqual(testFlowExport1.flows[0].name);
        done();
      });
    });
    let req = httpTestingController.match(flowUrl)[0];

    req.flush(testFlowExport1);
  });

  it("should cause one message to be sent for flow 1", (done) => {
    let flowUrl = "assets/rapid-pro-flow-exports/idems-plh-app_1.json";
    service.messages$.pipe(skip(1)).subscribe((messages) => {
      expect(messages.length).toEqual(1);
      done();
    });
    service.loadExportFile(flowUrl).subscribe((exportObject) => {
      service.startFlowById(testFlowExport1.flows[0].uuid);
    });
    let req = httpTestingController.match(flowUrl)[0];

    req.flush(testFlowExport1);
  });

  it("should send correct message for flow 1", (done) => {
    let flowUrl = "assets/rapid-pro-flow-exports/idems-plh-app_1.json";
    service.messages$.pipe(skip(1)).subscribe((messages) => {
      expect(messages[0].text).toEqual("hello are you feeling?");
      done();
    });
    service.loadExportFile(flowUrl).subscribe((exportObject) => {
      service.startFlowById(testFlowExport1.flows[0].uuid);
    });
    let req = httpTestingController.match(flowUrl)[0];

    req.flush(testFlowExport1);
  });
});
