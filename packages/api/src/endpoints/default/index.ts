import { Controller, DefaultValuePipe, Get, Module, Query } from "@nestjs/common";
import { ApiOperation, ApiProperty, ApiQuery } from "@nestjs/swagger";
import { environment } from "../../environment";

export class QueryDTO {
  @ApiProperty({ default: environment.APP_DB_NAME, required: false })
  db_name: string;
}

@Controller()
class DefaultController {
  // @Get("")
  // @ApiOperation({ summary: "Redirect to docs" })
  // redirect(@Res() res) {
  //   return res.redirect("/api");
  // }

  @Get("status")
  @ApiOperation({ summary: "Check server status" })
  @ApiQuery({ name: "db_name", required: false, type: QueryDTO })
  checkStatus(@Query("db_name") db_name = environment.APP_DB_NAME) {
    return `[${db_name}] API Up`;
  }
}

@Module({
  controllers: [DefaultController],
})
export class DefaultModule {}
