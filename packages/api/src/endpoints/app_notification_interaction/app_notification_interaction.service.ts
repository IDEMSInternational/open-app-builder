import { Injectable } from "@nestjs/common";
import { AppNotificationInteraction } from "./app_notification_interaction.model";
import { UserNotificationInteractionDto } from "./dto/add-user-notification-interaction.dto";
import { DeploymentService } from "src/modules/deployment.service";

@Injectable()
export class AppNotificationInteractionService {
  constructor(private deploymentService: DeploymentService) {}

  get model() {
    return this.deploymentService.model(AppNotificationInteraction);
  }

  async findAll(): Promise<AppNotificationInteraction[]> {
    return this.model.findAll();
  }

  async createOrUpdate(body: UserNotificationInteractionDto) {
    const { app_user_id, app_user_record_id, data } = body;
    // populate rest of data with exception of id field (do not want to override generated)
    const { id, ...rest } = data;
    const update = { ...body, ...rest };
    const foundItem = await this.model.findOne({
      where: { app_user_id, app_user_record_id },
    });
    if (!foundItem) {
      // Item not found, create a new one
      return this.model.create(update);
    }
    return foundItem.update(update);
  }
}
