import { Controller, Get, Module } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";

@Controller()
class DefaultController {
  // @Get("")
  // @ApiOperation({ summary: "Redirect to docs" })
  // redirect(@Res() res) {
  //   return res.redirect("/api");
  // }
  @Get("status")
  @ApiOperation({ summary: "Check server status" })
  checkStatus() {
    return "API Up";
  }
}

@Module({
  controllers: [DefaultController],
})
export class DefaultModule {}
