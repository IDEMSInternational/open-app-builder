import { applyDecorators } from "@nestjs/common";
import { ApiHeader } from "@nestjs/swagger";

import { environment } from "src/environment";

/**
 * Add query parameter to support db_name property used for deployments with default value
 * NOTE - If excluded header will still be supported in queries, just not visible in API docs
 * 
 * Shorthand for
 * ```
 * @ApiHeader({
    name: "x-deployment-db-name", schema: { type: "string", default: environment.APP_DB_NAME }
  })
 * ```
 *
 * Can also include other decorators as required
 * */
export function DeploymentHeaders() {
  return applyDecorators(
    ApiHeader({
      name: "x-deployment-db-name",
      description: "Name of db for deployment to populate",
      schema: { type: "string", default: environment.APP_DB_NAME },
    })
  );
}

/**
 * DEPRECATED CC 2023-04-28 - prefer use of service, keep for future reference
 * Inject model for current deployment db in params
 *
 * @example
 * ```ts
 * '@'Get()
 * findAll(@InjectDeploymentModel(AppUser) model: typeof AppUser): Promise<AppUser[]> {
 *  return model.findAll();
 * }
 * ```
 */
// export const InjectDeploymentModel = createParamDecorator(
//   (entity: Function, ctx: ExecutionContext) => {
//     console.log({ entity, ctx });
//     const connection = ctx.switchToHttp().getRequest();
//     const sequelize: Sequelize = connection.body.sequelize;
//     console.log("inject deployment model", sequelize.config);
//     const model = sequelize.model(entity.name);
//     return model;
//   }
// );

// https://stackoverflow.com/questions/60578332/use-global-nest-module-in-decorator/60608856#60608856
// https://stackoverflow.com/questions/55560858/in-nest-js-is-it-possible-to-get-service-instance-inside-a-param-decorator

// https://www.typescriptlang.org/docs/handbook/decorators.html

// https://stackoverflow.com/questions/52106406/in-nest-js-how-to-get-a-service-instance-inside-a-decorator
