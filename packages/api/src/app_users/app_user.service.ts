import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { AppUserDto } from "./dto/create-app_user.dto";
import { AppUser } from "./app_user.model";

@Injectable()
export class AppUsersService {
  constructor(
    @InjectModel(AppUser)
    private readonly model: typeof AppUser
  ) {}

  create(createUserDto: AppUserDto): Promise<AppUser> {
    const user = new AppUser();

    return user.save();
  }

  async findAll(): Promise<AppUser[]> {
    return this.model.findAll();
  }

  findOne(id: string): Promise<AppUser> {
    return this.model.findOne({
      where: {
        id,
      },
    });
  }

  getUserData(app_user_id: string): any {
    return { app_user_id, contact_fields: { example: "hellow" } };
  }
  setUserData(app_user_id: string, data: any) {
    return { app_user_id, contact_fields: data };
  }
}
