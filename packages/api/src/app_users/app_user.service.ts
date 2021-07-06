import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { CreateAppUserDto } from "./dto/create-app_user.dto";
import { AppUser } from "./app_user.model";

@Injectable()
export class AppUsersService {
  constructor(
    @InjectModel(AppUser)
    private readonly userModel: typeof AppUser
  ) {}

  create(createUserDto: CreateAppUserDto): Promise<AppUser> {
    const user = new AppUser();
    user.firstName = createUserDto.firstName;
    user.lastName = createUserDto.lastName;

    return user.save();
  }

  async findAll(): Promise<AppUser[]> {
    return this.userModel.findAll();
  }

  findOne(id: string): Promise<AppUser> {
    return this.userModel.findOne({
      where: {
        id,
      },
    });
  }

  async remove(id: string): Promise<void> {
    const user = await this.findOne(id);
    await user.destroy();
  }
}
