import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { TableService } from "./tables.service";
import { TablesController } from "./tables.controller";
import { TablesModel } from "./tables.model";

@Module({
  imports: [SequelizeModule.forFeature([TablesModel])],
  providers: [TableService],
  controllers: [TablesController],
})
export class TablesModule {}
