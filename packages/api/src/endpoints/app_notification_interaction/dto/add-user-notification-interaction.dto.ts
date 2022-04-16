import { ApiProperty } from "@nestjs/swagger";
import { UserCommonDto } from "src/endpoints/common";

export class UserNotificationInteractionDto extends UserCommonDto {
  @ApiProperty({ description: "Notification interaction entry" })
  data: any; // TODO - map to expected columns
}
