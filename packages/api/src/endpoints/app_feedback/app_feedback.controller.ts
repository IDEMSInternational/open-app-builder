import { Body, Controller, Get, HttpException, HttpStatus, Post } from "@nestjs/common";
import { UserFeedbackDto } from "./dto/add-user-feedback.dto";
import { AppFeedback } from "./app_feedback.model";
import { AppFeedbackService } from "./app_feedback.service";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";

@ApiTags("Feedback")
@Controller("app_feedback")
export class AppFeedbackController {
  constructor(private readonly appFeedbackService: AppFeedbackService) {}

  @Get()
  @ApiOperation({ summary: "List all feedback" })
  findAll(): Promise<AppFeedback[]> {
    return this.appFeedbackService.findAll();
  }

  @Post()
  @ApiOperation({ summary: "Add feedback entry" })
  @ApiBody({ type: UserFeedbackDto })
  @ApiResponse({
    status: 200,
    description: "Feedback Added",
    type: UserFeedbackDto,
  })
  async addUserFeedback(@Body() data: UserFeedbackDto) {
    try {
      const res = await this.appFeedbackService.createOrUpdate(data);
      return res;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
