import { Injectable } from "@angular/core";
import { FirebasePerformance } from "@capacitor-firebase/performance";
import { SyncServiceBase } from "../syncService.base";

@Injectable({
  providedIn: "root",
})
/**
 *
 */
export class PerformanceMonitorService extends SyncServiceBase {
  constructor() {
    super("PerformanceMonitor");
  }
  public startTrace = FirebasePerformance.startTrace({ traceName: "test_trace" });

  public stopTrace = FirebasePerformance.stopTrace({ traceName: "test_trace" });

  public incrementMetric = FirebasePerformance.incrementMetric;

  public setPerformanceCollectionEnabled = FirebasePerformance.setPerformanceCollectionEnabled;

  public isPerformanceCollectionEnabled = async () => {
    const result = await FirebasePerformance.isPerformanceCollectionEnabled();
    return result.enabled;
  };
}
