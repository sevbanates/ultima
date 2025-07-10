import { Injectable } from '@angular/core';
import { BaseService } from 'src/app/core/services/base-service';
import { User, UserListRequestModel } from '../../system-management/user/models/user-list-model';
import { BehaviorSubject, Observable } from 'rxjs';
import { SelectNumberModel } from 'src/app/core/models/utility-model';

@Injectable({
  providedIn: 'root'
})
export class UserService extends BaseService<User,UserListRequestModel> {
  override controllerName: "users";

  // private _roles: BehaviorSubject<Array<SelectNumberModel> | null> = new BehaviorSubject(null);
  private _roles: BehaviorSubject<SelectNumberModel[] | null> = new BehaviorSubject<SelectNumberModel[] | null>(null);

  constructor() {
    super();
  }

   get roles$():Observable<SelectNumberModel[] | null>
    {
        return this._roles.asObservable();
    }
}
