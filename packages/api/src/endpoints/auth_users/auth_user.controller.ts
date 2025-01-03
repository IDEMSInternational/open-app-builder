import {  Controller, Get,  Param,  } from "@nestjs/common";
import {  ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { DeploymentHeaders } from "src/modules/deployment.decorators";
import { DeploymentService } from "src/modules/deployment.service";
import { AppUser } from "../app_users/app_user.model";

@ApiTags("Auth Users")
@Controller("auth_users")
/**
 * The auth_users endpoint are a thin wrapper around the app_users table to enable
 * user lookup by auth_user_id
 */
export class AuthUsersController {
  constructor(private readonly deploymentService: DeploymentService) {}

  @Get(":auth_user_id")
  @ApiParam({ name: "auth_user_id", type: String })
  @ApiOperation({ summary: "Get auth user profile" })
  @DeploymentHeaders()
  findOne(@Param("auth_user_id") auth_user_id: string): Promise<AppUser[]> {
    const model = this.deploymentService.model(AppUser);
    return model.findAll({where:{auth_user_id}})
  }
}
