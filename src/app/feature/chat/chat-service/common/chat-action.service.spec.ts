import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RemindersService } from "src/app/shared/services/reminders/reminders.service";
import { ToolboxService } from 'src/app/shared/services/toolbox/toolbox.service';

import { ChatActionService } from './chat-action.service';
import { ChatAction, ChatActionType } from './chat-actions';

describe('ChatActionService', () => {
  let service: ChatActionService;

  let mockRemindersService: RemindersService;
  let mockToolboxService: ToolboxService;
  let mockRouter: Router;

  beforeEach(() => {
    jasmine.clock().install();
    mockRemindersService = jasmine.createSpyObj("RemindersService", ["setReminder"]);
    mockToolboxService = jasmine.createSpyObj("ToolboxService", ["unlockTopic"]);
    mockRouter = jasmine.createSpyObj("Router", ["navigateByUrl"]);

    TestBed.configureTestingModule({
      providers: [
        { provide: Router, useValue: mockRouter },
        { provide: ToolboxService, useValue: mockToolboxService },
        { provide: RemindersService, useValue: mockRemindersService }
      ]
    });
    service = TestBed.inject(ChatActionService);
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe("NAVIGATE", () => {

    it("can navigate to a page in the app", () => {
      const navigateAction: ChatAction = {
        type: ChatActionType.NAVIGATE,
        executed: false,
        params: {
          path: "/activities"
        }
      };
      service.executeChatAction(navigateAction);
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith("/activities");
    });

    it("can navigate to a page in the app with a query param", () => {
      const navigateAction: ChatAction = {
        type: ChatActionType.NAVIGATE,
        executed: false,
        params: {
          path: "/activities",
          query: "param1=hello"
        }
      };
      service.executeChatAction(navigateAction);
      expect(mockRouter.navigateByUrl).toHaveBeenCalledWith("/activities?param1=hello");
    });
  });

  describe("UNLOCK_TOOLBOX", () => {
    it("can unlock a toolbox topic that exists", () => {
      const unlockToolboxTopicAction: ChatAction = {
        type: ChatActionType.UNLOCK_TOOLBOX_TOPIC,
        executed: false,
        params: {
          topic: "ONE_ON_ONE_TIME"
        }
      };
      service.executeChatAction(unlockToolboxTopicAction);
      expect(mockToolboxService.unlockTopic).toHaveBeenCalledWith("ONE_ON_ONE_TIME");
    });

    it("will not unlock toolbox topic that does not exist", () => {
      const unlockToolboxTopicAction: ChatAction = {
        type: ChatActionType.UNLOCK_TOOLBOX_TOPIC,
        executed: false,
        params: {
          topic: "FAKE_TOPIC"
        }
      };
      service.executeChatAction(unlockToolboxTopicAction);
      expect(mockToolboxService.unlockTopic).not.toHaveBeenCalled();
    });
  });

  describe("CREATE_REMINDER", () => {

    it('can create a reminder', () => {
      const mockNow = new Date(2020, 11, 9);
      jasmine.clock().mockDate(new Date(mockNow));
      const createReminderAction: ChatAction = {
        type: ChatActionType.CREATE_REMINDER,
        executed: false,
        params: {
          type: "praise_child"
        }
      };
      service.executeChatAction(createReminderAction);
      const expectedReminder = {
        _created: "2020-12-09T00:00:00.000Z",
        _modified: "2020-12-09T00:00:00.000Z",
        due: "2020-12-10T00:00:00.000Z",
        type: "praise_child",
        complete: false,
        data: {},
        notify: false,
        repeats: null,
        notifications: [],
      };
      expect(mockRemindersService.setReminder).toHaveBeenCalledWith(expectedReminder);
    });

    it('can create a reminder using due date parameter', () => {
      const mockNow = new Date(2020, 11, 9);
      jasmine.clock().mockDate(new Date(mockNow));
      const createReminderAction: ChatAction = {
        type: ChatActionType.CREATE_REMINDER,
        executed: false,
        params: {
          type: "praise_child",
          due: "2020-12-10T13:30:00.000Z"
        }
      };
      service.executeChatAction(createReminderAction);
      const expectedReminder = {
        _created: "2020-12-09T00:00:00.000Z",
        _modified: "2020-12-09T00:00:00.000Z",
        due: "2020-12-10T13:30:00.000Z",
        type: "praise_child",
        complete: false,
        data: {},
        notify: false,
        repeats: null,
        notifications: [],
      };
      expect(mockRemindersService.setReminder).toHaveBeenCalledWith(expectedReminder);
    });

  });

});
