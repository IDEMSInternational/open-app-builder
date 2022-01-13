import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { AppFeedback } from "./app_feedback.model";
import { UserFeedbackDto } from "./dto/add-user-feedback.dto";

@Injectable()
export class AppFeedbackService {
  constructor(
    @InjectModel(AppFeedback)
    private readonly model: typeof AppFeedback
  ) {}

  async findAll(): Promise<AppFeedback[]> {
    return this.model.findAll();
  }

  async createOrUpdate(body: UserFeedbackDto) {
    const { app_user_id, app_user_record_id, data } = body;
    const foundItem = await this.model.findOne({ where: { app_user_id, app_user_record_id } });
    if (!foundItem) {
      // Item not found, create a new one
      const feedback = new AppFeedback();
      return feedback.update({ data, app_user_id, app_user_record_id });
    }
    return foundItem.update({ data });
  }
}
