import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request } from "express";
import { environment } from "src/environment";

import { DeploymentService } from "src/modules/deployment.service";

/**
 *
 * @param req
 * @param res
 * @param next
 */

@Injectable()
export class DeploymentMiddleware implements NestMiddleware {
  constructor(private service: DeploymentService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    // ensure all requests include a db_name parameter
    if (!req.headers["x-deployment-db-name"]) {
      req.headers["x-deployment-db-name"] = environment.APP_DB_NAME;
    }
    const dbName = req.headers["x-deployment-db-name"] as string;

    // Assign the correct sequelize client based on target deployment db
    // Additionally update request itself to allow access to client
    // either via service or request handler
    const sequelize = await this.service.setDeploymentDB(dbName);
    req.body.sequelize = sequelize;
    next();
  }
}
