import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { DefaultCustomerListRequestModel } from "../models/customer.types";
import { CustomerService } from "./customer.service";

export const customerResolver: ResolveFn<any> =
    (route:ActivatedRouteSnapshot,state:RouterStateSnapshot) => {

        let reqModel=new DefaultCustomerListRequestModel();


       

      return inject(CustomerService).getEntityPage(reqModel);
    }

export const customerDetailResolver: ResolveFn<any> =
    (route:ActivatedRouteSnapshot,state:RouterStateSnapshot) => {

        let id=route.paramMap.get('id');
        let guidid=route.paramMap.get('guidid');

      return inject(CustomerService).getEntityById(id,guidid);
    }