import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as fs from "fs";
import { AppModule } from "./app.module";
import { DBInstance } from "./db";
import { environment } from "./environment";
import { version } from "../package.json";

async function bootstrap() {
  // DB Bootstrap (could be managed outside repo)
  await new DBInstance().setup();
  // API Bootstrap (auto connects to DB)
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // Make available on reverse proxy path (e.g. /api)
  // app.setGlobalPrefix(environment.API_BASE_PATH || "");
  // OpenAPI/Swagger documentation bootstrap
  const config = new DocumentBuilder()
    .setTitle("IDEMS Apps API")
    .setDescription("App-Server Communication")
    .setVersion(version)
    .addTag("api")
    // Fix swagger redirection issue
    // https://github.com/nestjs/swagger/issues/448
    // https://stackoverflow.com/questions/63954037/nestjs-swagger-missing-base-path
    // Ensure api base path populated as /api (not /api/ or similar)
    .addServer(environment.API_BASE_PATH ? `/${environment.API_BASE_PATH.replace(/\//g, "")}` : "")
    .build();
  const document = SwaggerModule.createDocument(app, config, { ignoreGlobalPrefix: true });
  // add export for docs (https://github.com/nestjs/swagger/issues/158)
  fs.writeFileSync("./spec-export.json", JSON.stringify(document, null, 2));
  SwaggerModule.setup("", app, document);
  // Starts listening for shutdown hooks
  app.enableShutdownHooks();
  const port = process.env.API_PORT || 3000;
  await app.listen(port);
  console.log(`app v${version} running on port ${port}`);
}
bootstrap();

process.on("SIGTERM", () => {
  console.info("SIGTERM signal received.");
});
