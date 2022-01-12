import { Injectable } from "@angular/core";
import { EventService } from "src/app/shared/services/event/event.service";
import { FeedbackService } from "./feedback.service";

export namespace IFeedbackAction {
  export type namespace = "FEEDBACK";
  export interface handlers {
    disable: () => void;
    enable: () => void;
    open: ([templatename]) => void;
  }
  export type name = keyof handlers;
}

@Injectable({ providedIn: "root" })
/** Respond to events triggered from template actions */
export class FeedbackActionsService {
  constructor(private feedbackService: FeedbackService, private eventService: EventService) {
    this.registerActionHandlers();
  }
  private actionHandlers: IFeedbackAction.handlers = {
    disable: () => this.feedbackService.setReviewMode(false),
    enable: () => this.feedbackService.setReviewMode(true),
    open: ([templatename]) => {
      return this.feedbackService.runFeedbackTemplate(templatename);
    },
  };

  /** Trigger actions in response to published events */
  private registerActionHandlers() {
    this.eventService.all("FEEDBACK").subscribe((event) => {
      const name: IFeedbackAction.name = event.subtopic;
      const handler = this.actionHandlers[name];
      if (!handler) {
        console.error("No feedback event registered for subtopic", event.subtopic, event);
        return;
      }
      try {
        const result = handler(event.payload);
        return this.eventService.respond(event.eventId, result);
      } catch (error) {
        console.error("Event handling error", { error, event });
        return this.eventService.respond(event.eventId, undefined);
      }
    });
  }
}
