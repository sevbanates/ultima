import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/core/services/base-service';
import { ResponseModel } from 'src/app/core/models/response-model';
import { SelectNumberModel } from 'src/app/core/models/utility-model';
import { CreateUserDto, UpdateUserDto, User, UserBasicDto, UserListRequestModel } from '../models/user-list-model';

@Injectable({
    providedIn: 'root'
})
export class UserService extends BaseService<User, UserListRequestModel>
{
    override controllerName: string = "users";
    public readonly _userBasic: BehaviorSubject<UserBasicDto | null> = new BehaviorSubject(null);
    public readonly _myPage: BehaviorSubject<any | null> = new BehaviorSubject(null);



    // Private
    private readonly _router: Router = inject(Router);


    constructor() {
        super();
    }
    get userBasic$(): Observable<UserBasicDto>
    {
        return this._userBasic.asObservable();
    }
    get myPage$(): Observable<UserBasicDto>
    {
        return this._myPage.asObservable();
    }



    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

createEntity(input:CreateUserDto): Observable<ResponseModel<UserBasicDto>>
        {
            return  this._httpClient.post<ResponseModel<UserBasicDto>>(`${this.apiUrl}${this.controllerName}`,input);
        }
updateEntity(input:UpdateUserDto): Observable<ResponseModel<UserBasicDto>>
        {
            return  this._httpClient.put<ResponseModel<UserBasicDto>>(`${this.apiUrl}${this.controllerName}/${input.Id}`,input);
        }

        // getCustomers(): Observable<ResponseModel<CustomerSelectModel[]>> {
        //     return this._httpClient.get<ResponseModel<CustomerSelectModel[]>>(
        //         `${this.apiUrl}${this.controllerName}/get-customers`);
        // }
    // create(ss: InvoiceCreateDto): Observable<ResponseModel<boolean>>{
    //      return this._httpClient.post<ResponseModel<boolean>>(`${this.apiUrl}${this.controllerName}/basic/${guidId}`).pipe(
    //         tap((response) => {
    //             this._invoiceBasic.next(response.Entity);
    //             return response;
    //         })
    //     );
    // }
    // getClientBasic(guidId:string): Observable<ResponseModel<Invoice>>
    // {
    //     return this._httpClient.get<ResponseModel<Invoice>>(`${this.apiUrl}${this.controllerName}/basic/${guidId}`).pipe(
    //         tap((response) => {
    //             this._invoiceBasic.next(response.Entity);
    //             return response;
    //         })
    //     );
    // }

//     myPage(id,guidId:string): Observable<ResponseModel<any>>
//     {
//         return this._httpClient.get<ResponseModel<any>>(`${this.apiUrl}${this.controllerName}/mypage/${Number(id)}/${guidId}`).pipe(
//             tap((response) => {
//                 this._myPage.next(response.Entity);
//                 return response;
//             })
//         );
//     }

//      updateEntity(id, input:UpdateWebSiteDto): Observable<ResponseModel<WebSiteDto>>
//         {
//             return  this._httpClient.put<ResponseModel<WebSiteDto>>(`${this.apiUrl}${this.controllerName}/${id}`,input)
//                 .pipe(
//                     tap((response) => {
//                         if(response.IsSuccess){
//                             this._entity.next(response.Entity);
//                         }
//                         return response;
//                     }),

//                 )
//         }


//      createEntity(input:CreateWebSiteDto): Observable<ResponseModel<boolean>>
//         {
//             return  this._httpClient.post<ResponseModel<boolean>>(`${this.apiUrl}${this.controllerName}/create-website`,input);
//         }
//   createParentOrTeacher(data:CreateParentOrTeacherDto,clientId:number):Observable<ResponseModel<UserBasicDto>>{
//         return this._httpClient.post<ResponseModel<UserBasicDto>>(`${this.apiUrl}${this.controllerName}/${clientId}/create-website-user`,data);
//     }
}
