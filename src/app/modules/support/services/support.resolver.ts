import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { SupportService } from "./support.service";
import { inject } from "@angular/core";
import { DefaultTicketListRequestModel } from "../models/ticket.model";

export const supportListResolver: ResolveFn<any> =
    () => {
        let reqModel=new DefaultTicketListRequestModel();
      return inject(SupportService).getEntityPage(reqModel);
    }

export const supportDetailResolver: ResolveFn<any> =
(route:ActivatedRouteSnapshot,state:RouterStateSnapshot) => {

    let id=route.paramMap.get('id');
    let guidid=route.paramMap.get('guidid');

  return inject(SupportService).getEntityById(Number(id),guidid);
}
