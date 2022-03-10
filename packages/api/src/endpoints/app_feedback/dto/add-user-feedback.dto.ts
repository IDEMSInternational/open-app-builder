import { ApiProperty } from "@nestjs/swagger";
import { UserCommonDto } from "src/endpoints/common";

export class UserFeedbackDto extends UserCommonDto {
  @ApiProperty({ description: "Feedback entry" })
  data: any;
}
