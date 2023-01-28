import { Injectable } from "@angular/core";
import { CanActivate } from "@angular/router";

@Injectable({ providedIn: "root" })
export class RouterDisableGuard implements CanActivate {
  canActivate() {
    return false;
  }
}

@Injectable({ providedIn: "root" })
export class RouterEnableGuard implements CanActivate {
  canActivate() {
    return true;
  }
}
