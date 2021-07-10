import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { SetUserDataDto } from "./dto/set-user-data.dto";
import { AppUser } from "./app_user.model";
import { AppUsersService } from "./app_user.service";
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from "@nestjs/swagger";

@Controller("app_users")
export class AppUsersController {
  constructor(private readonly appUsersService: AppUsersService) {}

  // @Post()
  // create(@Body() createUserDto: CreateAppUserDto): Promise<AppUser> {
  //   return this.appUsersService.create(createUserDto);
  // }

  @Get()
  @ApiOperation({ summary: "List users" })
  findAll(): Promise<AppUser[]> {
    return this.appUsersService.findAll();
  }

  // @Get(":app_user_id")
  // findOne(@Param("app_user_id") app_user_id: string): Promise<AppUser> {
  //   return this.appUsersService.findOne(app_user_id);
  // }

  // @Delete(":id")
  // remove(@Param("id") id: string): Promise<void> {
  //   return this.appUsersService.remove(id);
  // }

  @Get(":app_user_id")
  @ApiParam({ name: "app_user_id", type: String })
  @ApiOperation({ summary: "Get user profile" })
  findOne(@Param("app_user_id") app_user_id: string): Promise<AppUser> {
    return this.appUsersService.findOne(app_user_id);
  }

  @Post(":app_user_id")
  @ApiParam({ name: "app_user_id", type: String })
  @ApiOperation({ summary: "Update user profile" })
  @ApiBody({ type: SetUserDataDto })
  @ApiResponse({
    status: 200,
    description: "User Updated",
    type: SetUserDataDto,
  })
  async setUserData(@Param() params: { app_user_id: string }, @Body() data: SetUserDataDto) {
    try {
      const res = await this.appUsersService.setUserData(params.app_user_id, data);
      return res;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
