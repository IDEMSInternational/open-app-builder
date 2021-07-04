import { Options } from "sequelize";
import { environment } from "../../environment";

const defaultConfig: Options = {
  username: environment.POSTGRES_USER,
  password: environment.POSTGRES_PASSWORD,
  database: environment.POSTGRES_DB,
  host: environment.POSTGRES_HOST,
  port: Number(environment.POSTGRES_PORT),
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
