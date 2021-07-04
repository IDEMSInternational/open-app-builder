import { Model } from "sequelize/types";
import { app_users } from "./app_users";

export const models = { app_users };

export type IModelType = { [key in keyof typeof models]: typeof Model };
