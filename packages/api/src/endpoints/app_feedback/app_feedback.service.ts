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

  async createOrUpdate(raw: UserFeedbackDto) {
    const { app_user_id, user_feedback_id } = raw;
    const foundItem = await this.model.findOne({ where: { app_user_id, user_feedback_id } });
    if (!foundItem) {
      // Item not found, create a new one
      const feedback = new AppFeedback();
      return feedback.update({ raw, app_user_id, user_feedback_id });
    }
    foundItem.raw = raw;
    return foundItem.update({ raw });
  }
}
