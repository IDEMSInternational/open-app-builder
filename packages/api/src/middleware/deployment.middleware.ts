import { Injectable, NestMiddleware } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { NextFunction, Request } from "express";
import { DBInstance } from "src/db";
import { environment } from "src/environment";

/**
 *
 * @param req
 * @param res
 * @param next
 */

@Injectable()
export class DeploymentDBSelector implements NestMiddleware {
  private dbConnections = {};

  constructor(private readonly moduleRef: ModuleRef) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // ensure all requests include a db_name parameter
    if (!req.query.db_name) {
      req.query.db_name = environment.APP_DB_NAME;
    }
    const dbName = req.query.db_name as string;
    // await new Promise((resolve) =>
    //   setTimeout(() => {
    //     resolve(true);
    //   }, 5000)
    // );
    if (!this.dbConnections[dbName]) {
      console.log("db init", dbName);
      this.dbConnections[dbName] = await new DBInstance(dbName).setup();
      console.log(dbName, "ready");
      // this.moduleRef.create()
    }

    next();
  }
}
