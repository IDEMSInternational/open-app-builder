import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AppNotificationInteraction } from "./app_notification_interaction.model";
import { AppNotificationInteractionService } from "./app_notification_interaction.service";
import { AppNotificationInteractionController } from "./app_notification_interaction.controller";

@Module({
  imports: [SequelizeModule.forFeature([AppNotificationInteraction])],
  providers: [AppNotificationInteractionService],
  controllers: [AppNotificationInteractionController],
})
export class AppNotificationInteractionModule {}
