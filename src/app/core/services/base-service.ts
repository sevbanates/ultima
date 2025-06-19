import { inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable, map, tap,  } from 'rxjs';
import { PagedAndSortedResponse, ResponseModel } from 'app/core/models/response-model';
import { environment } from 'app/environments/environment';
import { BaseModel } from '../models/base-model';
import { PagedAndSortedSearchInput } from '../models/request-model';
import { AppLayoutTitleService } from 'app/shared/services/app.layout-title.service';
 
export abstract class BaseService<T extends BaseModel,E extends PagedAndSortedSearchInput=null>
{
    protected readonly  apiUrl = environment.restApiUrl;
    protected readonly _pagination: BehaviorSubject<PagedAndSortedResponse<any> | null> = new BehaviorSubject(null);
    public readonly _entity: BehaviorSubject<any | null> = new BehaviorSubject(null);
    public readonly _entityList: BehaviorSubject<Array<any> | null> = new BehaviorSubject(null);
    abstract controllerName:string;
    protected readonly _httpClient:HttpClient=inject(HttpClient)
    protected readonly _layoutTitleService:AppLayoutTitleService=inject(AppLayoutTitleService)
    
    constructor()
    {
    }
    setLayoutTitle(title:string) {
        this._layoutTitleService.setLayoutTitle(title);
    }
    get pagination$(): Observable<PagedAndSortedResponse<T>>
    {
        return this._pagination.asObservable();
    }

    get entity$(): Observable<any>
    {
        return this._entity.asObservable();
    }

    get entityList$(): Observable<Array<any>>
    {
        return this._entityList.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    getEntityPage(reqModel: any): Observable<PagedAndSortedResponse<any>> {
        const httpParams = this.buildHttpParams(reqModel);
        
        return this._httpClient.get<PagedAndSortedResponse<any>>(`${this.apiUrl}${this.controllerName}`, { params: httpParams })
            .pipe(
                tap(response => {
                    this._pagination.next(response);
                    this._entityList.next(response.EntityList);
                })
            );
    }

    public buildHttpParams(reqModel: any): HttpParams {
        const paramsObject: {[key: string]: string} = {};

        for (const key in reqModel) {
            if (reqModel.hasOwnProperty(key) && reqModel[key] !== undefined && reqModel[key] !== null) {
                if (reqModel[key] instanceof Date) {
                    paramsObject[key] = reqModel[key].toISOString();
                } else {
                    paramsObject[key] = reqModel[key].toString();
                }
            }
        }

        return new HttpParams({ fromObject: paramsObject });
    }

    getEntityById(id,guidId:string): Observable<ResponseModel<any>>
    {
        return this._httpClient.get<ResponseModel<any>>(`${this.apiUrl}${this.controllerName}/${Number(id)}/${guidId}`).pipe(
            tap((response) => {
                this._entity.next(response.Entity);
                return response;
            })
        );
    }

    deleteEntity(id: number,guidId:string): Observable<boolean>
    {

        return this._httpClient.delete(`${this.apiUrl}${this.controllerName}/${id}/${guidId}`).pipe(
                map((response: ResponseModel<boolean>) => {
                    return response.IsSuccess;
                })
            )
    }


}
