import { ErrorHandler, NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";
import { provideAnimations } from "@angular/platform-browser/animations";
import { RouteReuseStrategy } from "@angular/router";
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptorsFromDi } from "@angular/common/http";
import { IonicModule, IonicRouteStrategy } from "@ionic/angular";

// Libs
import player from "lottie-web";

// Components
import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app-routing.module";
import { SharedModule } from "./shared/shared.module";
import { TemplateComponentsModule } from "./shared/components/template/template.module";
import { ContextMenuModule } from "./shared/modules/context-menu/context-menu.module";
import { TourModule } from "./feature/tour/tour.module";
import { ErrorHandlerService } from "./shared/services/error-handler/error-handler.service";
import { ServerAPIInterceptor } from "./shared/services/server/interceptors";
import { DeploymentFeaturesModule } from "./deployment-features.module";
import { provideLottieOptions } from "ngx-lottie";
import { setVariableRowProcessorProvider } from "./reactive-templates/services/row-processors";

// Note we need a separate function as it's required
// by the AOT compiler.
export function lottiePlayerFactory() {
  return player;
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    TemplateComponentsModule,
    DeploymentFeaturesModule,
    SharedModule,
    FormsModule,
    TourModule,
    ContextMenuModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    // Use custom api interceptor to handle interaction with server backend
    { provide: HTTP_INTERCEPTORS, useClass: ServerAPIInterceptor, multi: true },
    // Use custom error handler
    { provide: ErrorHandler, useClass: ErrorHandlerService },
    provideHttpClient(withInterceptorsFromDi()),
    provideAnimations(),
    provideLottieOptions({
      player: lottiePlayerFactory,
    }),
    setVariableRowProcessorProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
