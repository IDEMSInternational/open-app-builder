import Sequelize from "sequelize";

// TODO - could be optimised for more specific types
// https://sequelize.org/v5/manual/data-types.html
export const FieldDataTypeMapping = {
  text: Sequelize.TEXT,
  integer: Sequelize.INTEGER,
  number: Sequelize.REAL, // postgres only
  date: Sequelize.DATE,
  boolean: Sequelize.BOOLEAN,
} as const;

type FieldDataMappingKey = keyof typeof FieldDataTypeMapping;

export type ColumnMappingType = { field_name: string; field_type?: FieldDataMappingKey };

export type ITableColumn = { column_name: string; data_type: string };

export const CUSTOM_EVENTS = {
  COLUMNS_UPDATED: "update_columns",
};
