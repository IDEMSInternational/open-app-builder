import { Injectable, NestMiddleware, Scope } from "@nestjs/common";
import { NextFunction, Request } from "express";
import { environment } from "src/environment";

import { DeploymentService } from "./deployment.service";

/**
 * Intercept all requests and use request headers ensure target DB has been bootstrapped
 */

@Injectable({ scope: Scope.REQUEST })
export class DeploymentMiddleware implements NestMiddleware {
  constructor(private service: DeploymentService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const dbName = (req.headers["x-deployment-db-name"] as string) || environment.APP_DB_NAME;

    // Assign the correct sequelize client based on target deployment db
    await this.service.ensureDeploymentClient(dbName);

    next();
  }
}
