import { NgModule } from "@angular/core";

import { AuthService } from "./auth.service";

@NgModule({
  imports: [],
  exports: [],
  providers: [],
})
export class AuthModule {
  constructor(private service: AuthService) {
    // include service to initialise and register handlers
  }
}
