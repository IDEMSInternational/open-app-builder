import { MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { EventEmitterModule } from "@nestjs/event-emitter";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { USER_DB_CONFIG } from "./db/config";
import * as Endpoints from "./endpoints";
import { DefaultModule } from "./endpoints/default";
import { DeploymentDBSelector } from "./middleware/deployment.middleware";

@Module({
  imports: [
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
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
    Endpoints.AppUsersModule,
    Endpoints.ContactFieldsModule,
    Endpoints.AppFeedbackModule,
    Endpoints.AppNotificationInteractionModule,
    Endpoints.TablesModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DeploymentDBSelector).forRoutes({ path: "/**", method: RequestMethod.ALL });
  }
}
