import { Injectable } from "@angular/core";
import { FirebasePerformance } from "@capacitor-firebase/performance";

@Injectable({
  providedIn: "root",
})
/**
 *
 */
export class PerformanceMonitorService {
  public startTrace = FirebasePerformance.startTrace({ traceName: "test_trace" });

  public stopTrace = FirebasePerformance.stopTrace({ traceName: "test_trace" });

  public incrementMetric = FirebasePerformance.incrementMetric;

  public setPerformanceCollectionEnabled = FirebasePerformance.setPerformanceCollectionEnabled;

  public isPerformanceCollectionEnabled = async () => {
    const result = await FirebasePerformance.isPerformanceCollectionEnabled();
    return result.enabled;
  };
}
