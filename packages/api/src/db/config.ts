import { ClientConfig } from "pg";
import { SequelizeOptions } from "sequelize-typescript";
import { environment } from "src/environment";

export const USER_DB_CONFIG: SequelizeOptions = {
  dialect: "postgres",
  host: environment.DB_HOST,
  port: Number(environment.DB_PORT),
  username: environment.APP_DB_USER,
  password: environment.APP_DB_PASSWORD,
  database: environment.APP_DB_NAME,
};

export const ADMIN_CLIENT_CONFIG: ClientConfig = {
  host: environment.DB_HOST,
  port: Number(environment.DB_PORT),
  database: environment.POSTGRES_USER,
  user: environment.POSTGRES_USER,
  password: environment.POSTGRES_PASSWORD,
};
