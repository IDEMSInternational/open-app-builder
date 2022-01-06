import { Options } from "sequelize";
import { environment } from "../../environment";

const defaultConfig: Options = {
  username: environment.DB_USER,
  password: environment.DB_PASSWORD,
  database: environment.DB_NAME,
  host: environment.DB_HOST,
  port: Number(environment.DB_PORT),
  dialect: "postgres",
  dialectOptions: {
    bigNumberStrings: true,
  },
};

if (process.env.NODE_ENV === "production") {
  // config.dialectOptions.ssl = {
  //   ca: fs.readFileSync(__dirname + "/mysql-ca-master.crt"),
  // },
}

export const config = defaultConfig;
