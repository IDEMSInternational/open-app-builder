import { Injectable } from "@nestjs/common";
import { DeploymentService } from "src/modules/deployment.service";
import { AppUser } from "./app_user.model";
import { UserDataPostDTO } from "./dto/set-user-data.dto";

@Injectable()
export class AppUsersService {
  constructor(private deploymentService: DeploymentService) {}

  get model() {
    return this.deploymentService.model(AppUser);
  }

  // create(app_user_id: string, createUserDto: UserDataPostDTO): Promise<AppUser> {
  //   const user = new AppUser();
  //   user.app_user_id = app_user_id;
  //   user.contact_fields = createUserDto.contact_fields;

  //   return user.save();
  // }

  findOne(app_user_id: string): Promise<AppUser> {
    return this.model.findOne({
      where: {
        app_user_id,
      },
    });
  }

  async setUserData(app_user_id: string, data: UserDataPostDTO) {
    const user = await this.model.findOne({ where: { app_user_id } });
    if (!user) {
      return await this.model.create({ ...data, app_user_id });
      // HACK - instantiating as appUser object does not generate correct sequelize queryInterface
      // Alternatively could try to manually re bind

      // user = new AppUser();
      user.app_user_id = app_user_id;
    }
    // await this.model.upsert({ ...user, ...data, app_user_id });
    return user.update({ ...data, app_user_id });
  }
}
