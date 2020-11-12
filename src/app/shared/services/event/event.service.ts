import { Injectable } from "@angular/core";
import { Subject, of, concat, Observable, from } from "rxjs";
import { filter, first } from "rxjs/operators";
import { generateRandomId } from "src/app/shared/utils";

@Injectable({
  providedIn: "root",
})
/**
 * A shared messaging service to allow communciation between any other components
 * or services
 */
export class EventService {
  /**
   * Topic-level observables that can be subscribed to
   */
  private events: IEventStream = {
    DB: new Subject<IEvent>(),
    FLOW: new Subject<IEvent>(),
    LOCAL_NOTIFICATION: new Subject<IEvent>(),
  };
  private responses = new Subject<IEventResponse>();
  private history: IEventHistory = {
    DB: [],
    FLOW: [],
    LOCAL_NOTIFICATION: [],
  };
  /**
   * Return an observable to allow subscription to all future
   * events of a given topic
   */
  on(topic: IEvent["topic"], subtopic?: IEvent["subtopic"]) {
    return this.events[topic].pipe(
      filter((e) => e.topic === topic),
      filter((e) => (subtopic ? e.subtopic === subtopic : true))
    );
  }
  /**
   * Return an observable to allow subscription to the next
   * event of a given topic
   */
  once(topic: IEvent["topic"], subtopic?: IEvent["subtopic"]) {
    return this.events[topic].pipe(
      filter((e) => e.topic === topic),
      filter((e) => (subtopic ? e.subtopic === subtopic : true)),
      first()
    );
  }

  respond(eventId: string, payload: any) {
    this.responses.next({ eventId, payload });
  }

  /**
   * Subscribe to all historical updates, and once finished continue to receive new
   */
  all(
    topic: IEvent["topic"],
    subtopic?: IEvent["subtopic"]
  ): Observable<IEvent> {
    console.log("subscribe all", topic, subtopic);
    const history = from(this.history[topic]).pipe(
      filter((e) => e.topic === topic),
      filter((e) => (subtopic ? e.subtopic === subtopic : true))
    );
    const updates = this.on(topic);
    return concat(history, updates);
  }

  /**
   * Publish an event
   * @returns an observable for the first response to the event
   * TODO - allow passing variable to subscribe to all responses
   */
  publish(event: IEvent) {
    event.eventId = event.eventId || generateRandomId();
    console.debug("[event]", event);
    this.history[event.topic].push(event);
    const response = this.responses.pipe(
      filter((e) => e.eventId === event.eventId),
      first()
    );
    this.events[event.topic].next(event);
    return response;
  }
}

/**
 * All events consist of a topic which can be subscribed to
 * @param topic - this is usually the source of the event emitter
 * @param subtopic - source-specific name to allow for more fine-grained listeners
 * @param payload - will be passed to event handler
 * @param eventId - automatically populated for tracking responses to a specific event
 */
interface IEvent {
  // topic -> eventType
  // subtopic -> topic (optional)
  topic: ITopic;
  subtopic?: any;
  payload?: any;
  eventId?: string;
}
interface IEventResponse {
  eventId: string;
  payload: any;
}
type IEventStream = { [topic in ITopic]: Subject<IEvent> };
type IEventHistory = { [topic in ITopic]: IEvent[] };
type ITopic = "DB" | "FLOW" | "LOCAL_NOTIFICATION";
