import { inject, Injectable } from "@angular/core";
import { Migration, MigrationHistory } from "./migration.types";
import { AlertController } from "@ionic/angular";
import { SystemVariableService } from "../system-variable/system-variable.service";

@Injectable({
  providedIn: "root",
})
export class MigrationService {
  private alertCtrl = inject(AlertController);
  private systemVariableService = inject(SystemVariableService);

  public async handleMigrations<T>(migrations: Migration<T>[], context: T, source: string) {
    if (!source) {
      throw new Error("Migration source must be provided");
    }

    const history = this.getMigrationHistory();
    let hasHistoryChanges = false;

    for (const migration of migrations) {
      // Create a namespaced ID to ensure uniqueness across different services
      const fullId = `${source}:${migration.id}`;

      // Check history
      const prevRun = history[fullId];
      if (prevRun && (prevRun.status === "RUN" || prevRun.status === "SKIPPED")) {
        // Already successfully handled, skip
        continue;
      }

      // If checks pass, run migration logic
      try {
        // 1. Check Preconditions (if any)
        if (migration.preconditions) {
          const shouldRun = await migration.preconditions(context);
          if (!shouldRun) {
            console.log(`[Migration] Skipped: ${fullId}`);
            history[fullId] = { status: "SKIPPED", timestamp: Date.now() };
            hasHistoryChanges = true;
            continue;
          }
        }

        // 2. Run Migration
        console.log(`[Migration] Running: ${fullId}`);
        await migration.run(context);

        // 3. Mark Complete
        history[fullId] = { status: "RUN", timestamp: Date.now() };
        hasHistoryChanges = true;
        console.log(`[Migration] Completed: ${fullId}`);
      } catch (e) {
        console.error(`[Migration] FATAL: ${fullId}`, e);
        history[fullId] = { status: "FAILED", timestamp: Date.now() };
        this.saveMigrationHistory(history);
        await this.showErrorAlert(fullId, e);
        throw e;
      }
    }

    if (hasHistoryChanges) {
      this.saveMigrationHistory(history);
    }
  }

  private getMigrationHistory(): MigrationHistory {
    const stored = this.systemVariableService.get("MIGRATION_HISTORY");
    if (!stored) return {};
    try {
      const parsed = JSON.parse(stored);
      return parsed;
    } catch (e) {
      console.error("[MigrationService] Failed to parse migration history", e);
      return {};
    }
  }

  private saveMigrationHistory(history: MigrationHistory) {
    this.systemVariableService.set("MIGRATION_HISTORY", JSON.stringify(history));
  }

  private async showErrorAlert(migrationId: string, error: any) {
    const alert = await this.alertCtrl.create({
      header: "App Update Failed",
      subHeader: "Critical Error",
      message: `A critical update (${migrationId}) failed to complete.\n\nError: ${
        error.message || error
      }\n\nPlease contact support.`,
      buttons: ["OK"],
      backdropDismiss: false,
    });
    await alert.present();
    await alert.onDidDismiss();
  }
}
