import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { AppModule } from "./app.module";
import { setupDB } from "./db";
import { environment } from "./environment";

async function bootstrap() {
  // DB Bootstrap (could be managed outside repo)
  await setupDB();
  // API Boostrap (auto connects to DB)
  const app = await NestFactory.create(AppModule);
  // Make available on reverse proxy path (e.g. /api)
  app.setGlobalPrefix(environment.API_BASE_PATH || "");
  // OpenAPI/Swagger documentation bootstrap
  const config = new DocumentBuilder()
    .setTitle("IDEMS Apps API")
    .setDescription("App-Server Communication")
    .setVersion("1.0")
    .addTag("api")
    // Fix swagger redirection issue
    // https://github.com/nestjs/swagger/issues/448
    // https://stackoverflow.com/questions/63954037/nestjs-swagger-missing-base-path
    .addServer(environment.API_BASE_PATH || "")
    .build();
  const document = SwaggerModule.createDocument(app, config, { ignoreGlobalPrefix: true });
  SwaggerModule.setup("", app, document);
  // Starts listening for shutdown hooks
  app.enableShutdownHooks();
  await app.listen(process.env.API_PORT || 3000);
}
bootstrap();

process.on("SIGTERM", () => {
  console.info("SIGTERM signal received.");
});
