import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { ControllerService } from "./controller.service";

export const roleResolver: ResolveFn<any> =
() => {
  return inject(ControllerService).getRoles();
}