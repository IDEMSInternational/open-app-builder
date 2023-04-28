import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request } from "express";
import { environment } from "src/environment";

import { DeploymentDBService } from "src/modules/deployment.service";

/**
 *
 * @param req
 * @param res
 * @param next
 */

@Injectable()
export class DeploymentMiddleware implements NestMiddleware {
  constructor(private service: DeploymentDBService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // ensure all requests include a db_name parameter
    if (!req.headers["x-deployment-db-name"]) {
      req.headers["x-deployment-db-name"] = environment.APP_DB_NAME;
    }
    const dbName = req.headers["x-deployment-db-name"] as string;

    const sequelize = await this.service.getSequelizeClient(dbName);
    req.body.sequelize = sequelize;
    console.log("update req", req.body.sequelize.config);
    next();
  }
}
