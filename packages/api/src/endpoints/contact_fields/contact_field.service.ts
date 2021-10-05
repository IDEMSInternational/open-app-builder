import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { arrayToHashmap, listTableColumns } from "src/utils";
import { ContactFieldEntry } from "./contact_field.model";

type ITableColumn = { column_name: string; data_type: string };

@Injectable()
export class ContactFieldService {
  columns: ITableColumn[];
  columnsHashmap: { [column_name: string]: ITableColumn };
  tableName: string;
  constructor(
    @InjectModel(ContactFieldEntry)
    private readonly model: typeof ContactFieldEntry
  ) {
    this.loadColumns();
  }

  async findAll(): Promise<ContactFieldEntry[]> {
    return this.model.findAll({ raw: true });
  }

  findOne(app_user_id: string): Promise<ContactFieldEntry> {
    return this.model.findOne({
      where: {
        app_user_id,
      },
    });
  }

  async setUserContactFields(app_user_id: string, data: any) {
    await this.loadColumns();
    let user = await this.model.findOne({ where: { app_user_id } });
    if (!user) {
      user = new ContactFieldEntry();
      user.app_user_id = app_user_id;
    }
    const mappedData = this.getMappedFieldsFromData(data);
    // apply a raw update to allow population of dynamic fields
    await user.update({ ...mappedData }, { raw: true });
    // provide a typed update for rest of data
    return user.update({ raw: data, app_user_id });
  }

  private async loadColumns() {
    this.tableName = this.model.tableName;
    this.columns = await listTableColumns(this.tableName);
    this.columnsHashmap = arrayToHashmap(this.columns, "column_name");
  }

  private getMappedFieldsFromData(data: any) {
    const mappedData = {};
    Object.entries(data).forEach(([key, value]) => {
      if (this.columnsHashmap.hasOwnProperty(key)) {
        // TODO - handle data conversion
        mappedData[key] = value;
      }
    });
    return mappedData;
  }
}
