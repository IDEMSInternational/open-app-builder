import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { ApiBody, ApiOperation, ApiProperty, ApiResponse, ApiParam } from "@nestjs/swagger";
import { AppService } from "./app.service";

class SetUserType {
  @ApiProperty({ required: true })
  contact_fields: { [field_name: string]: string };
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(":user_id")
  @ApiParam({ name: "user_id", type: String })
  @ApiOperation({ summary: "Get user profile" })
  getUserData(@Param() params: { user_id: string }): string {
    return this.appService.getUserData(params.user_id);
  }

  @Post(":user_id")
  @ApiParam({ name: "user_id", type: String })
  @ApiOperation({ summary: "Update user profile" })
  @ApiBody({ type: SetUserType })
  @ApiResponse({
    status: 200,
    description: "User Updated",
    type: SetUserType,
  })
  setUserData(@Param() params: { user_id: string }, @Body() data: SetUserType) {
    console.log("posting user", params, data);
    return this.appService.setUserData(params.user_id, data);
  }
}
