import { ApiProperty } from "@nestjs/swagger";
import { UserLocalRecordDto } from "src/endpoints/common";

export class UserFeedbackDto extends UserLocalRecordDto {
  @ApiProperty({ description: "Feedback entry" })
  data: any;
}
