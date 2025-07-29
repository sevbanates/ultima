import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot } from "@angular/router";
import { DefaultUserListRequestModel } from "../models/user-list-model";
import { UserService } from "./user.service";

export const userResolver: ResolveFn<any> =
    (route:ActivatedRouteSnapshot,state:RouterStateSnapshot) => {

        let reqModel=new DefaultUserListRequestModel();


       

      return inject(UserService).getEntityPage(reqModel);
    }

export const userDetailResolver: ResolveFn<any> =
    (route:ActivatedRouteSnapshot,state:RouterStateSnapshot) => {

        let id=route.paramMap.get('id');
        let guidid=route.paramMap.get('guidid');

      return inject(UserService).getEntityById(Number(id),guidid);
    }