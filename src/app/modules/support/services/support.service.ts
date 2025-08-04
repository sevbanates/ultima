import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Ticket, CreateTicketRequest, TicketMessage, DefaultTicketListRequestModel, TicketDto, TicketMessageDto, TicketStatus, CreateTicketMessageRequest } from '../models/ticket.model';
import { environment } from 'src/app/environments/environment.dev';
import { BaseService } from 'src/app/core/services/base-service';
import { ResponseModel } from 'src/app/core/models/response-model';

// Backend DTO'ları



@Injectable({
  providedIn: 'root'
})
export class SupportService extends BaseService<Ticket, DefaultTicketListRequestModel> {
  override controllerName: string = "tickets";
  public readonly _ticketBasic: BehaviorSubject<TicketDto | null> = new BehaviorSubject(null);


  constructor() {
    super();
  }

  // Ticket oluşturma
  createTicket(dto: CreateTicketRequest): Observable<ResponseModel<TicketDto>> {
    return this._httpClient.post<ResponseModel<TicketDto>>(`${this.apiUrl}${this.controllerName}/create`, dto);
  }

  // Mesaj ekleme
  addMessage(dto: CreateTicketMessageRequest): Observable<ResponseModel<boolean>> {
    return this._httpClient.post<ResponseModel<boolean>>(`${this.apiUrl}${this.controllerName}/message`, dto);
  }

  // Durum değiştirme
  changeStatus(ticketId: number, status: TicketStatus): Observable<ResponseModel<boolean>> {
    return this._httpClient.put<ResponseModel<boolean>>(`${this.apiUrl}${this.controllerName}/status/${ticketId}`, status);
  }

  // Ticket listeleme (paged)
  // getTickets(input: PagedAndSortedSearchInput): Observable<PagedAndSortedResponse<Ticket>> {
  //   return this._httpClient.get<PagedAndSortedResponse<Ticket>>(`${this.apiUrl}`, { params: input as any });
  // }

  // Tekil ticket
  getTicket(id: number, guidId: string): Observable<ResponseModel<TicketDto>> {
    return this._httpClient.get<ResponseModel<TicketDto>>(`${this.apiUrl}${this.controllerName}/${id}/${guidId}`).pipe(
      tap((response) => {
          this._entity.next(response.Entity);
          return response;
      })
  );
  }
} 