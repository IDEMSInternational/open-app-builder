import { Injectable } from "@angular/core";
import { initializeApp, FirebaseApp } from "firebase/app";
import { SyncServiceBase } from "../syncService.base";
import { DeploymentService } from "../deployment/deployment.service";

/** Service used to configure initialize firebase app core configuration */
@Injectable({ providedIn: "root" })
export class FirebaseService extends SyncServiceBase {
  /** Initialised firebase app. Will be undefined if firebase config unavailable */
  app: FirebaseApp | undefined;

  constructor(private deploymentService: DeploymentService) {
    super("Firebase");
    this.initialise();
  }

  /**
   * Configure app module imports dependent on what firebase features should be enabled
   */
  private initialise() {
    const { firebase } = this.deploymentService.config;

    // Skip init if top-level firebase config not provided
    if (!firebase) return;

    // Provide warning if firebase app config not available (e.g. encrypted import failed)
    const { config, ...services } = firebase;
    if (!config) {
      const configuredServices = Object.keys(services).join(", ");
      console.warn(`[Firebase] config missing, services disabled:\n`, configuredServices);
      return;
    }

    this.app = initializeApp(firebase.config);
  }
}
