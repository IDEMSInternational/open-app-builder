import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { flattenJson } from "src/utils";
import { ContactFieldEntry } from "./contact_field.model";
import { CUSTOM_EVENTS } from "src/types";
import { DeploymentService } from "src/modules/deployment.service";

/** Legacy binding to make it easier to track expected columns for a table - could be re-introduced for efficiency */
type ITableColumn = { column_name: string; data_type: string };

@Injectable()
export class ContactFieldService {
  private initialised = false;
  // columns: ITableColumn[];
  // columnsHashmap: { [column_name: string]: ITableColumn };
  constructor(private eventEmitter: EventEmitter2, private deploymentService: DeploymentService) {}

  get model() {
    // only complete init on first request so that deployment service can configure db connections as required
    if (!this.initialised) {
      this.addFlattenJsonBindings(this.deploymentService.model(ContactFieldEntry));
      this.initialised = true;
    }
    return this.deploymentService.model(ContactFieldEntry);
  }
  get tableName() {
    return this.model.tableName;
  }
  /** Add hook so that after docs are saved raw json is flattened */

  private addFlattenJsonBindings(model: typeof ContactFieldEntry) {
    // Bind to db save to populate flattened json
    this.deploymentService.registerHook("afterSave", async (instance) => {
      const rawValuesChanged = instance.changed("raw" as any);
      if (rawValuesChanged) {
        await flattenJson({
          tableName: this.tableName,
          instance,
          jsonColumnName: "raw",
          idColumnName: "id",
        });
      }
    });
    // Bind to column change updates to repopulate rows
    this.eventEmitter.addListener(
      `${CUSTOM_EVENTS.COLUMNS_UPDATED}.${model.tableName}`,
      async (columns) => {
        const existing = await this.model.findAll();
        // force save hook to trigger by simpling updating the raw data field
        await this.deploymentService.client.transaction(async (t) => {
          const _updated = new Date().getTime();
          return Promise.all(
            existing.map((entry) => {
              const { raw } = entry.toJSON() as any;
              entry.update({ raw: { ...raw, _updated } });
            })
          );
        });
      }
    );
  }

  async findAll(): Promise<ContactFieldEntry[]> {
    return this.model.findAll({ raw: true });
  }

  findOne(app_user_id: string): Promise<ContactFieldEntry> {
    return this.model.findOne({
      where: {
        app_user_id,
      },
    });
  }

  async setUserContactFields(app_user_id: string, data: any) {
    let user = await this.model.findOne({ where: { app_user_id } });
    if (!user) {
      user = new ContactFieldEntry();
      user.app_user_id = app_user_id;
    }
    return user.update({ raw: data, app_user_id });
  }
}
