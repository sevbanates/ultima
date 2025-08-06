import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { SupportService } from "./support.service";
import { inject } from "@angular/core";
import { DefaultTicketListRequestModel } from "../models/ticket.model";

export const ticketListResolver: ResolveFn<any> =
    () => {
        let reqModel=new DefaultTicketListRequestModel();
      return inject(SupportService).getEntityPage(reqModel);
    }

export const ticketDetailResolver: ResolveFn<any> =
(route:ActivatedRouteSnapshot,state:RouterStateSnapshot) => {

    let id=route.paramMap.get('id');
    let guidid=route.paramMap.get('guidId');
  return inject(SupportService).getTicket(Number(id),guidid);
}
