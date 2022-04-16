import { Body, Controller, Get, HttpException, HttpStatus, Post } from "@nestjs/common";
import { UserNotificationInteractionDto } from "./dto/add-user-notification-interaction.dto";
import { AppNotificationInteraction } from "./app_notification_interaction.model";
import { AppNotificationInteractionService } from "./app_notification_interaction.service";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Notification Interaction")
@Controller("app_notification_interaction")
export class AppNotificationInteractionController {
  constructor(
    private readonly appNotificationInteractionService: AppNotificationInteractionService
  ) {}

  @Get()
  @ApiOperation({ summary: "List all notification interactions" })
  findAll(): Promise<AppNotificationInteraction[]> {
    return this.appNotificationInteractionService.findAll();
  }

  @Post()
  @ApiOperation({ summary: "Add notification interaction entry" })
  @ApiBody({ type: UserNotificationInteractionDto })
  @ApiResponse({
    status: 200,
    description: "Notification Interaction Added",
    type: UserNotificationInteractionDto,
  })
  async addUserNotificationInteraction(@Body() data: UserNotificationInteractionDto) {
    try {
      const res = await this.appNotificationInteractionService.createOrUpdate(data);
      return res;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
