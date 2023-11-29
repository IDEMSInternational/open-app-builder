import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class RouterDisableGuard {
  canActivate() {
    return false;
  }
}

@Injectable({ providedIn: "root" })
export class RouterEnableGuard {
  canActivate() {
    return true;
  }
}
