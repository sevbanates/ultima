import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/core/services/base-service';
import { ResponseModel } from 'src/app/core/models/response-model';
import { SelectNumberModel } from 'src/app/core/models/utility-model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment.dev';
import { ControllerModel } from '../models/controller.model';

@Injectable({
    providedIn: 'root'
})
export class ControllerService 
{
    controllerName: string = "SysControllerActionRole";
    protected readonly _httpClient: HttpClient = inject(HttpClient)
    apiUrl: string = environment.restApiUrl;
    protected readonly _controller: BehaviorSubject<ControllerModel | null> = new BehaviorSubject(null);
    protected readonly _controllers: BehaviorSubject<Array<ControllerModel> | null> = new BehaviorSubject(null);
    private _roles: BehaviorSubject<Array<SelectNumberModel> | null> = new BehaviorSubject(null);



    // Private
    private readonly _router: Router = inject(Router);


    constructor() { }


    set controller(controller: ControllerModel) {
        this._controller.next(controller)
    }

    get controller$(): Observable<ControllerModel> {
        return this._controller.asObservable();
    }

    get controllers$(): Observable<Array<ControllerModel>> {
        return this._controllers.asObservable();
    }

    get roles$(): Observable<Array<SelectNumberModel>> {
        return this._roles.asObservable();
    }



    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

 getControllersByRoleId(roleId: number): Observable<ResponseModel<ControllerModel>> {
        return this._httpClient.get<ResponseModel<ControllerModel>>(`${this.apiUrl}${this.controllerName}/role/${roleId}/controllers`).pipe(
            tap((response) => {
                this._controllers.next(response.EntityList);
                return response;
            })
        );
    }

    saveControllerActions(actionList: ControllerModel): Observable<ResponseModel<boolean>> {
        return this._httpClient.put<ResponseModel<boolean>>(`${this.apiUrl}${this.controllerName}/controller-actions`, actionList);
    }

    getRoles(): Observable<ResponseModel<SelectNumberModel>> {
        return this._httpClient.get<ResponseModel<SelectNumberModel>>(`${this.apiUrl}common/roles`).pipe(
            tap((response) => {
                this._roles.next(response.EntityList);
            })
        );
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
