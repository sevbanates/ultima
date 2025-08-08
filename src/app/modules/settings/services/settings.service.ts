import { Injectable, inject } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';
import { ResponseModel } from 'src/app/core/models/response-model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/app/environments/environment';
import { AccounterRequestDto, ChangeAccounterRequestStatusDto, CreateAccounterRequestDto } from '../models/accounter.models';

@Injectable({
    providedIn: 'root'
})
export class SettingsService 
{
    protected readonly  apiUrl = environment.restApiUrl;
    protected readonly _httpClient:HttpClient=inject(HttpClient)
    // public readonly _customerBasic: BehaviorSubject<CustomerDto | null> = new BehaviorSubject(null);
    // public readonly _myPage: BehaviorSubject<any | null> = new BehaviorSubject(null);


    controllerName: string = "settings";
    // Private
    private readonly _router: Router = inject(Router);




    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    createAccounterRequest(dto : CreateAccounterRequestDto): Observable<ResponseModel<AccounterRequestDto>> {
        return this._httpClient.post<ResponseModel<AccounterRequestDto>>(
            `${this.apiUrl}${this.controllerName}/create-accounter-request`, dto
        );
    }

    getAccounterRequest(): Observable<ResponseModel<AccounterRequestDto>> {
        return this._httpClient.get<ResponseModel<AccounterRequestDto>>(
            `${this.apiUrl}${this.controllerName}/get-requests`
        );
    }

    changeStatus(dto : AccounterRequestDto): Observable<ResponseModel<AccounterRequestDto>> {
        return this._httpClient.put<ResponseModel<AccounterRequestDto>>(
            `${this.apiUrl}${this.controllerName}/get-requests`, dto
        );
    }
}
