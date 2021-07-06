import { NestFactory } from "@nestjs/core";
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";
import { Client, ClientConfig } from "pg";
import { AppModule } from "./app.module";

const environment = process.env;

async function bootstrap() {
  await dbBootstrap();
  // API Boostrap (auto connects to DB)
  const app = await NestFactory.create(AppModule);
  // OpenAPI/Swagger documentation bootstrap
  const config = new DocumentBuilder()
    .setTitle("IDEMS Apps API")
    .setDescription("App-Server Communication")
    .setVersion("1.0")
    .addTag("api")
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup("api", app, document);
  await app.listen(process.env.API_PORT || 3000);
}
bootstrap();

/**
 * Bootstrap app database and initial user
 * NOTE - this could all be done outside the app
 */
async function dbBootstrap() {
  // DB Bootstrap
  const CLIENT_CONFIG: ClientConfig = {
    host: environment.DB_HOST,
    port: Number(environment.DB_PORT),
    database: environment.DB_ADMIN_NAME,
    user: environment.DB_ADMIN_USER,
    password: environment.DB_ADMIN_PASSWORD,
  };

  const client = new Client(CLIENT_CONFIG);
  try {
    await client.connect();
    // Create DB (if not exist)
    const dbNamesQuery = await client.query("SELECT datname FROM pg_database");
    const dbNames = dbNamesQuery.rows.map((r) => r.datname);
    const appDBName = environment.DB_NAME || "app";
    if (!dbNames.includes(appDBName)) {
      console.log("create app db", appDBName);
      const createDBQuery = `CREATE DATABASE ${appDBName};`;
      await client.query(createDBQuery);
    }
    // Create USER (if not exist)
    const usersQuery = await client.query("SELECT usename FROM pg_catalog.pg_user");
    const userNames = usersQuery.rows.map((r) => r.usename);
    const appDBUser = environment.DB_USER || "app";
    if (!userNames.includes(appDBUser)) {
      const appDBPassword = environment.DB_PASSWORD || "app";
      const createUserQuery = `CREATE USER ${appDBUser} WITH ENCRYPTED PASSWORD '${appDBPassword}';`;
      await client.query(createUserQuery);
      // Grant priviledges
      console.log("grant priviledges");
      const privilegesQuery = `GRANT ALL PRIVILEGES ON DATABASE ${appDBName} TO ${appDBUser};`;
      await client.query(privilegesQuery);
    }
    await client.end();
  } catch (error) {
    console.error(error);
    throw new Error("Could not bootstrap DB");
  }
}
