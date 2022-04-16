import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AppFeedback } from "./app_feedback.model";
import { AppFeedbackService } from "./app_feedback.service";
import { AppFeedbackController } from "./app_feedback.controller";

@Module({
  imports: [SequelizeModule.forFeature([AppFeedback])],
  providers: [AppFeedbackService],
  controllers: [AppFeedbackController],
})
export class AppFeedbackModule {}
