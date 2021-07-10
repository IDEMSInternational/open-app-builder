import { ClientConfig } from "pg";
import { SequelizeOptions } from "sequelize-typescript";
import { environment } from "src/environment";

export const USER_DB_CONFIG: SequelizeOptions = {
  dialect: "postgres",
  host: environment.DB_HOST,
  port: Number(environment.DB_PORT),
  username: environment.DB_USER,
  password: environment.DB_PASSWORD,
  database: environment.DB_NAME,
};

export const ADMIN_CLIENT_CONFIG: ClientConfig = {
  host: environment.DB_HOST,
  port: Number(environment.DB_PORT),
  database: environment.DB_ADMIN_NAME,
  user: environment.DB_ADMIN_USER,
  password: environment.DB_ADMIN_PASSWORD,
};
