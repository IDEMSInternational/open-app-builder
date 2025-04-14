import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import * as fs from "fs";
import { AppModule } from "./app.module";
import { DBInstance } from "./db";
import { environment } from "./environment";
import { version } from "../package.json";
import { json, urlencoded } from "express";

async function bootstrap() {
  // DB Bootstrap (could be managed outside repo)
  await new DBInstance().setup();
  // API Bootstrap (auto connects to DB)
  const app = await NestFactory.create(AppModule);

  // Configure body parser with increased payload size limits
  app.use(json({ limit: "2mb" }));
  app.use(urlencoded({ extended: true, limit: "2mb" }));

  app.enableCors();

  // Make available on reverse proxy path (e.g. /api)
  let serverBasePath = "";
  if (environment.API_BASE_URL) {
    // https://github.com/nestjs/swagger/issues/448
    // https://stackoverflow.com/questions/63954037/nestjs-swagger-missing-base-path
    // Ensure api base path populated as /api (not /api/ or similar)
    const cleanedPath = environment.API_BASE_URL.replace(/\//g, "");
    serverBasePath = `/${cleanedPath}`;
  }
  // OpenAPI/Swagger documentation bootstrap
  const config = new DocumentBuilder()
    .setTitle("IDEMS Apps API")
    .setDescription("App-Server Communication")
    .setVersion(version)
    .addTag("api")
    .addServer(serverBasePath)
    .build();
  const document = SwaggerModule.createDocument(app, config, { ignoreGlobalPrefix: true });
  // add export for docs (https://github.com/nestjs/swagger/issues/158)
  fs.writeFileSync("./spec-export.json", JSON.stringify(document, null, 2));
  SwaggerModule.setup("", app, document);
  // Starts listening for shutdown hooks
  app.enableShutdownHooks();
  const port = process.env.API_PORT || 3000;
  await app.listen(port);
  console.log(`app v${version} running on ${port}`);
}
bootstrap();

process.on("SIGTERM", () => {
  console.info("SIGTERM signal received.");
});
