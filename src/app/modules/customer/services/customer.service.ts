import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { BaseService } from 'src/app/core/services/base-service';
import { ResponseModel } from 'src/app/core/models/response-model';
import { Customer, CustomerDto } from '../models/customer.models';
import { CustomerAndCityModel, DefaultCustomerListRequestModel } from '../models/customer.types';

@Injectable({
    providedIn: 'root'
})
export class CustomerService extends BaseService<Customer, DefaultCustomerListRequestModel>
{
    public readonly _customerBasic: BehaviorSubject<CustomerDto | null> = new BehaviorSubject(null);
    public readonly _myPage: BehaviorSubject<any | null> = new BehaviorSubject(null);


    controllerName: string = "customer";
    // Private
    private readonly _router: Router = inject(Router);


    constructor() {
        super();
    }
    get customerBasic$(): Observable<CustomerDto>
    {
        return this._customerBasic.asObservable();
    }
    get myPage$(): Observable<CustomerDto>
    {
        return this._myPage.asObservable();
    }



    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    createEntity(input: CustomerDto): Observable<ResponseModel<boolean>> {
        return this._httpClient.post<ResponseModel<boolean>>(
            `${this.apiUrl}${this.controllerName}/create`,
            input
        );
    }

getCountryAndCities(): Observable<ResponseModel<CustomerAndCityModel>>
        {
            return this._httpClient.get<ResponseModel<CustomerAndCityModel>>(`${this.apiUrl}common/countries-cities`)
        }
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

    updateEntity(id: number, input: CustomerDto): Observable<ResponseModel<boolean>> {
        return this._httpClient.put<ResponseModel<boolean>>(
            `${this.apiUrl}${this.controllerName}/update/${id}`,
            input
        );
    }


//      createEntity(input:CreateWebSiteDto): Observable<ResponseModel<boolean>>
//         {
//             return  this._httpClient.post<ResponseModel<boolean>>(`${this.apiUrl}${this.controllerName}/create-website`,input);
//         }
//   createParentOrTeacher(data:CreateParentOrTeacherDto,clientId:number):Observable<ResponseModel<UserBasicDto>>{
//         return this._httpClient.post<ResponseModel<UserBasicDto>>(`${this.apiUrl}${this.controllerName}/${clientId}/create-website-user`,data);
//     }

    override getEntityById(id: number, guidId?: string): Observable<ResponseModel<CustomerDto>> {
        let url = `${this.apiUrl}${this.controllerName}/${id}`;
        if (guidId) {
            url += `/${guidId}`;
        }
        return this._httpClient.get<ResponseModel<CustomerDto>>(url);
    }
}
