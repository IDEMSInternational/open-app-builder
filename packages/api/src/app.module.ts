import { Module } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { USER_DB_CONFIG } from "./db/config";
import * as Endpoints from "./endpoints";
import { DefaultModule } from "./endpoints/status";
import { DeploymentModule } from "./modules";

@Module({
  imports: [
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
    DeploymentModule,
    // TODO - this should be removed when all tables connect via middleware service
    SequelizeModule.forRoot({
      ...USER_DB_CONFIG,
      // name: environment.APP_DB_NAME,
      autoLoadModels: true,
      // tables will be initialised via sequelize
      synchronize: false,
      // TODO - expose env pooling options
      pool: {
        max: 50,
        min: 0,
        idle: 10000,
      },
      hooks: {
        // TODO - consider disabling connections after bootstrap
      },
    }),
    DefaultModule,
    Endpoints.AppUsersModule,
    Endpoints.ContactFieldsModule,
    Endpoints.AppFeedbackModule,
    Endpoints.AppNotificationInteractionModule,
    Endpoints.TablesModule,
  ],
  providers: [],
})
export class AppModule {}
