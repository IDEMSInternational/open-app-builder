import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { CreateAppUserDto } from "./dto/create-app_user.dto";
import { AppUser } from "./app_user.model";
import { AppUsersService } from "./app_user.service";

@Controller("users")
export class AppUsersController {
  constructor(private readonly appUsersService: AppUsersService) {}

  @Post()
  create(@Body() createUserDto: CreateAppUserDto): Promise<AppUser> {
    return this.appUsersService.create(createUserDto);
  }

  @Get()
  findAll(): Promise<AppUser[]> {
    return this.appUsersService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string): Promise<AppUser> {
    return this.appUsersService.findOne(id);
  }

  @Delete(":id")
  remove(@Param("id") id: string): Promise<void> {
    return this.appUsersService.remove(id);
  }
}
