import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { AppUser } from "./app_user.model";
import { AppUsersService } from "./app_user.service";
import { AppUsersController } from "./app_user.controller";

@Module({
  imports: [SequelizeModule.forFeature([AppUser])],
  providers: [AppUsersService],
  controllers: [AppUsersController],
})
export class AppUsersModule {}
