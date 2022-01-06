import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { ContactFieldEntry } from "./contact_field.model";
import { ContactFieldService } from "./contact_field.service";
import { ContactFieldController } from "./contact_field.controller";

@Module({
  imports: [SequelizeModule.forFeature([ContactFieldEntry])],
  providers: [ContactFieldService],
  controllers: [ContactFieldController],
})
export class ContactFieldsModule {}
