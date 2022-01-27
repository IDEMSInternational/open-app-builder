import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from "@nestjs/common";
import { ContactFieldEntry } from "./contact_field.model";
import { ContactFieldService } from "./contact_field.service";
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { ContactFieldDto } from "../app_users/dto/set-user-data.dto";

@ApiTags("Contact Fields")
@Controller("contact_fields")
export class ContactFieldController {
  constructor(private readonly ContactFieldService: ContactFieldService) {}

  @Get()
  @ApiOperation({ summary: "List contact field entries" })
  findAll(): Promise<ContactFieldEntry[]> {
    return this.ContactFieldService.findAll();
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
  async setUserContactFields(@Param() params: { app_user_id: string }, @Body() data: any) {
    const { app_user_id } = params;
    try {
      const res = await this.ContactFieldService.setUserContactFields(app_user_id, data);
      return res;
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
