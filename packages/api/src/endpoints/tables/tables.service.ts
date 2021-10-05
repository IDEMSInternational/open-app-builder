import { Injectable } from "@nestjs/common";
import { ColumnMappingType, FieldDataType } from "src/types";
import { addTableColumn, arrayToHashmap, dropTableColumn, listTableColumns } from "src/utils";

@Injectable()
export class TableService {
  // TODO - add auth requirement

  /**
   *
   */
  async updateTableColumns(table_name: string, op: "add" | "drop", columns: ColumnMappingType[]) {
    const tableColumns = await listTableColumns(table_name);
    const tableColumnsHashmap = arrayToHashmap(tableColumns, "column_name");
    switch (op) {
      case "add":
        const newColumns = columns.filter((c) => !tableColumnsHashmap.hasOwnProperty(c.field_name));
        for (const column of newColumns) {
          const field_type = FieldDataType[column.field_type || "text"] || FieldDataType.text;
          await addTableColumn(table_name, column.field_name, field_type);
        }
        break;
      case "drop":
        const deletedColumns = columns.filter((c) =>
          tableColumnsHashmap.hasOwnProperty(c.field_name)
        );
        for (const column of deletedColumns) {
          await dropTableColumn(table_name, column.field_name);
        }
        break;
    }
    const updatedColumns = await listTableColumns(table_name);
    // await this.repopulateRawRows();
    return { columns: updatedColumns };
  }

  /**
   * Take data that has been populated into a JSONB column and attempt to flatten into
   * individual columns from json keys (if columns exist)
   */
  async flattenTableJSONRows(table_name: string, json_column_name: string) {
    let tableColumns = await listTableColumns(table_name);
    // TODO
  }

  /**
   * TODO - could possibly move to other service (or map to above function)
   */
  private async repopulateRawRows() {
    // await loadColumns();
    // const users = await model.findAll();
    // // TODO - better handled with bulk method but not sure if they support raw
    // for (const user of users) {
    //   const mappedData = getMappedFieldsFromData(user.raw);
    //   // apply a raw update to allow population of dynamic fields
    //   await user.update({ ...mappedData }, { raw: true });
    // }
    // model.bulkCreate(update, {
    //   updateOnDuplicate: ["app_user_id"],
    //   fields: Object.keys(columnsHashmap) as any,
    // });
  }
}
