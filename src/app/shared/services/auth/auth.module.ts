import { NgModule } from "@angular/core";
import { TemplateActionRegistry } from "src/app/shared/components/template/services/instance/template-action.registry";
import { AuthActionFactory } from "./auth.actions";
import { AuthService } from "./auth.service";

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class AuthModule {
  constructor(templateActionRegistry: TemplateActionRegistry, authService: AuthService) {
    const { auth, google_auth } = new AuthActionFactory(authService);
    templateActionRegistry.register({ auth, google_auth });
    authService.ready();
  }
}
