import { ActionPerformed, LocalNotificationSchema } from "@capacitor/local-notifications";
import { ReplaySubject } from "rxjs";

export class MockCapacitorEventService {
  public localNotificationActionPerformed = new ReplaySubject<ActionPerformed>();

  public localNotificationReceived = new ReplaySubject<LocalNotificationSchema>();
}
