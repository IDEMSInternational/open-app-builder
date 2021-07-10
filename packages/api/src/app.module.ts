import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { USER_DB_CONFIG } from "./db/config";
import { AppUsersModule } from "./endpoints";
import { DefaultModule } from "./endpoints/default";

@Module({
  imports: [
    ConfigModule.forRoot(),
    SequelizeModule.forRoot({
      ...USER_DB_CONFIG,
      autoLoadModels: true,
      // tables will be initialised via sequelizer
      synchronize: false,
      // TODO - expose env pooling options
      pool: {
        max: 50,
        min: 0,
        idle: 10000,
      },
    }),
    DefaultModule,
    AppUsersModule,
  ],
})
export class AppModule {}
