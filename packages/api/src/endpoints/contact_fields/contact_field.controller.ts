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
import { ContactFieldEntry } from "./contact_field.model";
import { ContactFieldService } from "./contact_field.service";
import { ApiBody, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { ContactFieldDto } from "../app_users/dto/set-user-data.dto";

@Controller("contact_fields")
export class ContactFieldController {
  constructor(private readonly ContactFieldService: ContactFieldService) {}

  @Get()
  @ApiOperation({ summary: "List contact field entries" })
  findAll(): Promise<ContactFieldEntry[]> {
    return this.ContactFieldService.findAll();
  }

  @Post("columns")
  @ApiOperation({ summary: "Add columns to map raw field data" })
  @ApiBody({ type: TableColumnMappingDto })
  @ApiResponse({
    status: 200,
    description: "User Updated",
    type: TableColumnMappingDto,
  })
  async addMappedTableColumns(@Body() data: TableColumnMappingDto) {
    const { columns } = data;
    try {
      const res = await this.ContactFieldService.updateContactFieldColumns("add", columns);
      return res;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Delete("columns")
  @ApiOperation({ summary: "Remove columns used to map raw field data" })
  @ApiBody({ type: TableColumnMappingDto })
  @ApiResponse({
    status: 200,
    description: "User Updated",
    type: TableColumnMappingDto,
  })
  async removeMappedTableColumns(@Body() data: TableColumnMappingDto) {
    const { columns } = data;
    try {
      const res = await this.ContactFieldService.updateContactFieldColumns("drop", columns);
      return res;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  // NOTE - assumes app_user_id will never be 'columns' -> Future refactor to own api endpoint

  @Post(":app_user_id")
  @ApiOperation({ summary: "Set User Contact Fields" })
  @ApiBody({ type: ContactFieldDto })
  @ApiResponse({
    status: 200,
    description: "User Updated",
    type: ContactFieldDto,
  })
  async setUserContactFields(
    @Param() params: { app_user_id: string },
    @Body() data: ContactFieldDto
  ) {
    const { contact_fields } = data;
    const { app_user_id } = params;
    try {
      const res = await this.ContactFieldService.setUserContactFields(app_user_id, contact_fields);
      return res;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
