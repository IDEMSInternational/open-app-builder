import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { ContactFieldEntry } from "./contact_field.model";
import { ColumnMappingType, FieldDataType } from "./dto/column-mapping.dto";

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

  async updateContactFieldColumns(op: "add" | "drop", columns: ColumnMappingType[]) {
    await this.loadColumns();
    switch (op) {
      case "add":
        const newColumns = columns.filter((c) => !this.columnsHashmap.hasOwnProperty(c.field_name));
        for (const column of newColumns) {
          const field_type = FieldDataType[column.field_type || "text"] || FieldDataType.text;
          await this.addTableColumn(this.tableName, column.field_name, field_type);
        }
        break;
      case "drop":
        const deletedColumns = columns.filter((c) =>
          this.columnsHashmap.hasOwnProperty(c.field_name)
        );
        for (const column of deletedColumns) {
          await this.dropTableColumn(this.tableName, column.field_name);
        }
        break;
    }
    await this.loadColumns();
    await this.repopulateAllRows();
    return { columns: this.columns };
  }

  private async loadColumns() {
    this.tableName = this.model.tableName;
    this.columns = await this.listTableColumns(this.tableName);
    this.columnsHashmap = arrayToHashmap(this.columns, "column_name");
  }

  /**
   *
   */
  private async listTableColumns(table_name: string) {
    // https://sequelize.org/master/manual/raw-queries.html
    const query =
      "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = ?";
    const result = await this.executeSQL(query, [table_name]);
    const columns = result[0] as any[];
    return columns;
  }

  /**
   *
   */
  private async repopulateAllRows() {
    await this.loadColumns();
    const users = await this.model.findAll();
    // TODO - better handled with bulk method but not sure if they support raw
    for (const user of users) {
      const mappedData = this.getMappedFieldsFromData(user.raw);
      // apply a raw update to allow population of dynamic fields
      await user.update({ ...mappedData }, { raw: true });
    }

    // this.model.bulkCreate(update, {
    //   updateOnDuplicate: ["app_user_id"],
    //   fields: Object.keys(this.columnsHashmap) as any,
    // });
  }

  /**
   *
   */
  private async addTableColumn(table_name: string, column_name: string, datatype: FieldDataType) {
    const query = `ALTER TABLE ${table_name} ADD ${column_name} ${datatype}`;
    return this.executeSQL(query);
  }

  /**
   *
   */
  private async dropTableColumn(table_name: string, column_name: string) {
    const query = `ALTER TABLE ${table_name} DROP ${column_name}`;
    return this.executeSQL(query);
  }

  /**
   *
   */
  private executeSQL(query: string, values: string[] = []) {
    return this.model.sequelize.query({ query, values });
  }
}

/**
 * Convert an object array into a json object, with keys corresponding to array entries
 * @param keyfield any unique field which all array objects contain to use as hash keys (e.g. 'id')
 */
function arrayToHashmap<T>(arr: T[], keyfield: keyof T): { [key: string]: T } {
  const hashmap: { [key: string]: T } = {};
  for (const el of arr) {
    if (el.hasOwnProperty(keyfield)) {
      hashmap[el[keyfield as any]] = el;
    }
  }
  return hashmap;
}
