import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as fs from "fs";
import { AppModule } from "./app.module";
import { setupDB } from "./db";
import { environment } from "./environment";

async function bootstrap() {
  // DB Bootstrap (could be managed outside repo)
  await setupDB();
  // API Boostrap (auto connects to DB)
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  // Make available on reverse proxy path (e.g. /api)
  // app.setGlobalPrefix(environment.API_BASE_PATH || "");
  // OpenAPI/Swagger documentation bootstrap
  const config = new DocumentBuilder()
    .setTitle("IDEMS Apps API")
    .setDescription("App-Server Communication")
    .setVersion("1.0")
    .addTag("api")
    // .setBasePath("/api")
    // Fix swagger redirection issue
    // https://github.com/nestjs/swagger/issues/448
    // https://stackoverflow.com/questions/63954037/nestjs-swagger-missing-base-path
    .addServer(environment.API_BASE_PATH ? `/${environment.API_BASE_PATH}` : "")
    .build();
  const document = SwaggerModule.createDocument(app, config, { ignoreGlobalPrefix: true });
  // add export for docs (https://github.com/nestjs/swagger/issues/158)
  fs.writeFileSync("./spec-export.json", JSON.stringify(document, null, 2));
  SwaggerModule.setup("", app, document);
  // Starts listening for shutdown hooks
  app.enableShutdownHooks();
  const port = process.env.API_PORT || 3000;
  await app.listen(port);
  console.log(`app v${environment.npm_package_version} running on port ${port}`);
}
bootstrap();

process.on("SIGTERM", () => {
  console.info("SIGTERM signal received.");
});
