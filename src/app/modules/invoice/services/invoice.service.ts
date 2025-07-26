import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { Invoice, InvoiceDto, InvoiceCreateDto } from '../models/create-invoice-dto.model';
import { InvoiceListRequestModel } from '../models/invoice.types';
import { BaseService } from 'src/app/core/services/base-service';
import { ResponseModel } from 'src/app/core/models/response-model';
import { SelectNumberModel } from 'src/app/core/models/utility-model';
import { CustomerSelectModel } from '../../customer/models/customer.types';

@Injectable({
    providedIn: 'root'
})
export class InvoiceService extends BaseService<Invoice, InvoiceListRequestModel>
{
    public readonly _invoiceBasic: BehaviorSubject<InvoiceDto | null> = new BehaviorSubject(null);
    public readonly _myPage: BehaviorSubject<any | null> = new BehaviorSubject(null);


    controllerName: string = "invoices";
    // Private
    private readonly _router: Router = inject(Router);


    constructor() {
        super();
    }
    get invoiceBasic$(): Observable<InvoiceDto>
    {
        return this._invoiceBasic.asObservable();
    }
    get myPage$(): Observable<InvoiceDto>
    {
        return this._myPage.asObservable();
    }



    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

createEntity(input:InvoiceCreateDto): Observable<ResponseModel<boolean>>
        {
            return  this._httpClient.post<ResponseModel<boolean>>(`${this.apiUrl}${this.controllerName}/create-invoice`,input);
        }

        getCustomers(): Observable<ResponseModel<CustomerSelectModel[]>> {
            return this._httpClient.get<ResponseModel<CustomerSelectModel[]>>(
                `${this.apiUrl}${this.controllerName}/get-customers`);
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
