import { Global, MiddlewareConsumer, Module, NestModule, RequestMethod } from "@nestjs/common";
import { DeploymentMiddleware } from "./deployment.middleware";
import { DeploymentDBService, DeploymentModelService } from "./deployment.service";

@Global()
@Module({
  providers: [DeploymentDBService, DeploymentModelService, DeploymentMiddleware],
  exports: [DeploymentDBService, DeploymentModelService, DeploymentMiddleware],
})
/**
 * Create a global module so that deployment services can be accessed from any controller/service
 *
 * Bind middleware so that all requests have db_name query param checked and relevent db connection
 * attached to body of request
 *
 * Expose service and decorators to access model on relevant db
 *
 */
export class DeploymentModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(DeploymentMiddleware).forRoutes({ path: "/**", method: RequestMethod.ALL });
  }
}
