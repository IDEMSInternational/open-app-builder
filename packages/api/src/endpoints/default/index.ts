import { Controller, Get, Module, Res } from "@nestjs/common";
import { ApiOperation } from "@nestjs/swagger";

@Controller()
class DefaultController {
  @Get("")
  @ApiOperation({ summary: "Redirect to docs" })
  redirect(@Res() res) {
    return res.redirect("/api");
  }
}

@Module({
  controllers: [DefaultController],
})
export class DefaultModule {}
