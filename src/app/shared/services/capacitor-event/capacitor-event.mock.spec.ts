import { ActionPerformed, LocalNotificationSchema } from "@capacitor/local-notifications";
import { ReplaySubject, Subject } from "rxjs";

export class MockCapacitorEventService {
  public localNotificationActionPerformed = new ReplaySubject<ActionPerformed>();

  public localNotificationReceived = new ReplaySubject<LocalNotificationSchema>();

  public appResume = new Subject<void>();
}
