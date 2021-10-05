import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from "@nestjs/common";
import { TableColumnMappingDto } from "./dto/column-mapping.dto";
import { TableService } from "./tables.service";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { listTableColumns, listTableNames } from "src/utils";
import { DataType } from "sequelize-typescript";

@Controller("tables")
export class TablesController {
  constructor(private readonly TableService: TableService) {}

  @Get()
  @ApiOperation({ summary: "List tables" })
  @ApiResponse({
    status: 200,
    description: "List of table_names",
    type: DataType.STRING,
    isArray: true,
  })
  async listTables() {
    return listTableNames();
  }

  @Get(":table_name")
  @Post(":table_name/columns")
  @ApiOperation({ summary: "Add columns to map raw field data" })
  @ApiBody({ type: TableColumnMappingDto })
  @ApiResponse({
    status: 200,
    description: "User Updated",
    type: TableColumnMappingDto,
  })
  async addMappedTableColumns(
    @Param() params: { table_name: string },
    @Body() data: TableColumnMappingDto
  ) {
    const { table_name } = params;
    const { columns } = data;
    try {
      const res = await this.TableService.updateTableColumns(table_name, "add", columns);
      // TODO re-map json (maybe param to pass?)
      return res;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete(":table_name/columns")
  @ApiOperation({ summary: "Remove columns used to map raw field data" })
  @ApiBody({ type: TableColumnMappingDto })
  @ApiResponse({
    status: 200,
    description: "User Updated",
    type: TableColumnMappingDto,
  })
  async removeMappedTableColumns(
    @Param() params: { table_name: string },
    @Body() data: TableColumnMappingDto
  ) {
    const { table_name } = params;
    const { columns } = data;
    try {
      const res = await this.TableService.updateTableColumns(table_name, "drop", columns);
      return res;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
