import { Injectable } from "@nestjs/common";
import { EventEmitter2 } from "@nestjs/event-emitter";
import { InjectConnection } from "@nestjs/sequelize";
import { Sequelize } from "sequelize";
import { ColumnMappingType, CUSTOM_EVENTS, FieldDataTypeMapping } from "src/types";
import { arrayToHashmap, dropTableColumn, listTableColumns } from "src/utils";

@Injectable()
export class TableService {
  constructor(
    @InjectConnection()
    private sequelize: Sequelize,
    private eventEmitter: EventEmitter2
  ) {}

  /** Dynamically create or drop table columns */
  async updateTableColumns(table_name: string, op: "add" | "drop", columns: ColumnMappingType[]) {
    const tableColumns = await listTableColumns(table_name);
    const tableColumnsHashmap = arrayToHashmap(tableColumns, "column_name");
    switch (op) {
      case "add":
        const newColumns = columns.filter((c) => !tableColumnsHashmap.hasOwnProperty(c.field_name));
        // TODO - handle remapping of existing column
        // TODO - could process together as transaction
        for (const column of newColumns) {
          const queryInterface = this.sequelize.getQueryInterface();
          const fieldTypeKey = column.field_type || "text";
          if (!FieldDataTypeMapping.hasOwnProperty(fieldTypeKey)) {
            console.error(`[${fieldTypeKey}] not supported`);
            throw new Error(
              `[${fieldTypeKey}] not supported, available types: [${Object.keys(
                FieldDataTypeMapping
              )}]`
            );
          }
          await queryInterface.addColumn(
            table_name,
            column.field_name,
            FieldDataTypeMapping[fieldTypeKey]
          );
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
    // notify listeners via event in case reprocessing required
    this.eventEmitter.emit(`${CUSTOM_EVENTS.COLUMNS_UPDATED}.${table_name}`, updatedColumns);
    return { columns: updatedColumns };
  }
}
