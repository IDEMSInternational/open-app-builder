import { Injectable } from "@nestjs/common";
import { AppFeedback } from "./app_feedback.model";
import { UserFeedbackDto } from "./dto/add-user-feedback.dto";
import { DeploymentService } from "src/modules/deployment.service";

@Injectable()
export class AppFeedbackService {
  constructor(private deploymentService: DeploymentService) {}

  private get model() {
    return this.deploymentService.model(AppFeedback);
  }

  async findAll() {
    return this.model.findAll();
  }

  async createOrUpdate(body: UserFeedbackDto) {
    const { app_user_id, app_user_record_id, app_deployment_name, data } = body;
    const foundItem = await this.model.findOne({
      where: { app_user_id, app_user_record_id },
    });
    if (!foundItem) {
      // Item not found, create a new one
      return this.model.create({ data, app_user_id, app_user_record_id, app_deployment_name });
    }
    return foundItem.update({ data });
  }
}
