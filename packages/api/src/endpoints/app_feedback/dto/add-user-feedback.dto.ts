import { ApiProperty } from "@nestjs/swagger";

export class UserFeedbackDto {
  @ApiProperty({ description: "App user ID" })
  app_user_id: string;

  @ApiProperty({ description: "Local feedback ID for user" })
  user_feedback_id: number;
}
