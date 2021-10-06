import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { TableService } from "./tables.service";
import { TablesController } from "./tables.controller";
import { TablesModel } from "./tables.model";
import { TablesMiddleware } from "./tables.middleware";

@Module({
  imports: [SequelizeModule.forFeature([TablesModel])],
  providers: [TableService],
  controllers: [TablesController],
})
export class TablesModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TablesMiddleware).forRoutes("/tables/*");
  }
}
