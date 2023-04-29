import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request } from "express";
import { environment } from "src/environment";

import { DeploymentService } from "./deployment.service";

/**
 * Intercept all requests and use request headers to set the active connection to use
 * as part of db operations
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
    await this.service.setDeploymentDB(dbName);

    /**
     * DEPRECATED CC 2023-29-04 - prefer use service instead of parsing from body
     * client returned from setDeploymentDB, also requires removing from any method
     * that tries to convert full body to json
     */
    // req.body.sequelize = client;

    next();
  }
}
