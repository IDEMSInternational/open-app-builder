import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { AppUser } from "./app_user.model";
import { SetUserDataDto } from "./dto/set-user-data.dto";

@Injectable()
export class AppUsersService {
  constructor(
    @InjectModel(AppUser)
    private readonly model: typeof AppUser
  ) {}

  // create(app_user_id: string, createUserDto: SetUserDataDto): Promise<AppUser> {
  //   const user = new AppUser();
  //   user.app_user_id = app_user_id;
  //   user.contact_fields = createUserDto.contact_fields;

  //   return user.save();
  // }

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
  async setUserData(app_user_id: string, data: SetUserDataDto) {
    let user = await this.model.findOne({ where: { app_user_id } });

    if (!user) {
      console.log("createing new user", app_user_id);
      user = new AppUser();
      user.app_user_id = app_user_id;
    }
    console.log("user", user);
    user.contact_fields = data.contact_fields;
    await user.save();

    return { app_user_id, contact_fields: data };
  }
}
