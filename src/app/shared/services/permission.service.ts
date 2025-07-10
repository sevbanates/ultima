import { Injectable, inject } from "@angular/core";
import { LocalStorageService } from "./local-storage.service";
import { LocalStorageType } from "src/app/core/enums/local-storage-type.enum";
import { User } from "src/app/modules/system-management/user/models/user-list-model";


@Injectable({ providedIn: 'root' })
export class PermissionService{

   protected readonly _localStorageService=inject(LocalStorageService);

    constructor() {

    }

    checkAuthorization(controllerName:string,actionNo:number):boolean{
        let user=this._localStorageService.getItem(LocalStorageType.userData) as User;
        if(user?.IsAdmin)
            return true;

        let controllerAction=user.SecurityTotalList.find(x=>x.Controller===controllerName);
        if(!controllerAction){
            return false;
        }

        let hasPermission= actionNo == (controllerAction.Total & actionNo)

        return hasPermission;
    }

}
