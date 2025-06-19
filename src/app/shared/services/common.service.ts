import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { PagedAndSortedResponse, ResponseModel } from 'app/core/models/response-model';
import { Inquiry } from 'app/modules/inquiry/models/inquiry.types';
import { environment } from 'app/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ClientBasicDto } from 'app/modules/client/models/client-basic-dto.model';
import { DefaultClientListRequestModel } from 'app/modules/client/models/client.types';
import { SelectNumberModel, SelectNumberModelWithGuid } from 'app/core/models/utility-model';
import { CreatePotentialClientDto, UpdateConcernedAreasDto, UpdateEarlyDevelopmentalDto, UpdateEducationalHistoryDto, UpdateInterpersonalRelationshipsAndCreateFamilyDto, UpdateMedicalAndMentalHealthInformationDto } from 'app/modules/client/models/potential-client.model';

@Injectable({providedIn:'root'})
export class CommonService 
{
    controllerName: string = "common";
    private readonly apiUrl = environment.restApiUrl;

    
    private _clients: BehaviorSubject<Array<SelectNumberModelWithGuid> | null> = new BehaviorSubject(null);
    get clients$(): Observable<Array<SelectNumberModelWithGuid>> {
        return this._clients.asObservable();
    }


    constructor(private readonly _httpClient: HttpClient) {
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
    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    saveInquiryForm(model: Inquiry): Observable<ResponseModel<boolean>>{

        return  this._httpClient.post<ResponseModel<boolean>>(`${this.apiUrl}${this.controllerName}/inquiry`, model).pipe(
                tap((response) => {
                   return response;
                })
            )
    }

    createPotentialClient(data: CreatePotentialClientDto): Observable<ResponseModel<ClientBasicDto>>
    {
        return  this._httpClient.post<ResponseModel<ClientBasicDto>>(`${this.apiUrl}${this.controllerName}/potential-client`, data);
    }
    updateInterpersonalRelationshipsAndCreateFamily(data: UpdateInterpersonalRelationshipsAndCreateFamilyDto,clientId:number): Observable<ResponseModel<ClientBasicDto>>
    {
        return this._httpClient.put<ResponseModel<ClientBasicDto>>(`${this.apiUrl}${this.controllerName}/potential-client/${clientId}/family`,data)
    }
    updateMedicalAndMentalHealthInformation(data: UpdateMedicalAndMentalHealthInformationDto,clientId:number): Observable<ResponseModel<ClientBasicDto>>
    {
        return this._httpClient.put<ResponseModel<ClientBasicDto>>(`${this.apiUrl}${this.controllerName}/potential-client/${clientId}/medical`,data)
    }
    updateEducationalHistory(data: UpdateEducationalHistoryDto,clientId:number): Observable<ResponseModel<ClientBasicDto>>
    {
        return this._httpClient.put<ResponseModel<ClientBasicDto>>(`${this.apiUrl}${this.controllerName}/potential-client/${clientId}/educational`,data)
    }
 
    updateEarly(data: UpdateEarlyDevelopmentalDto,clientId:number): Observable<ResponseModel<ClientBasicDto>>
    {
        return this._httpClient.put<ResponseModel<ClientBasicDto>>(`${this.apiUrl}${this.controllerName}/potential-client/${clientId}/early-developmental`,data)
    }
    updateConcernedAreas(data: UpdateConcernedAreasDto,clientId:number): Observable<ResponseModel<ClientBasicDto>>
    {
        return this._httpClient.put<ResponseModel<ClientBasicDto>>(`${this.apiUrl}${this.controllerName}/potential-client/${clientId}/concerned-areas`,data)

    }


    getClients(): Observable<PagedAndSortedResponse<ClientBasicDto>> {

        let reqModel = new DefaultClientListRequestModel();
        reqModel.Limit=2000;
        reqModel.Statuses=[1];
        reqModel.SortExpression=  "FirstName"+":"+"desc";;
        const httpParams = this.buildHttpParams(reqModel);

        return this._httpClient.get<PagedAndSortedResponse<ClientBasicDto>>(`${this.apiUrl}clients`,{params:httpParams}).pipe(
            tap((response) => {

                const list: SelectNumberModelWithGuid[] = response.EntityList.map((x) => ({
                    Value: x.Id,
                    GuidId: x.GuidId,
                    Text: x?.FirstName +' '+x?.LastName,
                }));
    
                this._clients.next(list);
            })
        );
    }



}