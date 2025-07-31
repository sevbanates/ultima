import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ticket, CreateTicketRequest, TicketMessage } from '../models/ticket.model';
import { environment } from 'src/app/environments/environment.dev';

// Backend DTO'ları
export interface TicketMessageDto {
  ticketId: number;
  message: string;
  attachments?: string[];
}

export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';

export interface PagedAndSortedSearchInput {
  pageNumber: number;
  pageSize: number;
  sortField?: string;
  sortOrder?: 'asc' | 'desc';
  [key: string]: any;
}

export interface ActionResponse<T> {
  data: T;
  isSuccess: boolean;
  message?: string;
  token?: string;
}

export interface PagedAndSortedResponse<T> {
  items: T[];
  totalCount: number;
  token?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SupportService {
  private apiUrl = `${environment.restApiUrl}ticket`;

  constructor(private http: HttpClient) {}

  // Ticket oluşturma
  createTicket(dto: CreateTicketRequest): Observable<ActionResponse<number>> {
    return this.http.post<ActionResponse<number>>(`${this.apiUrl}/create`, dto);
  }

  // Mesaj ekleme
  addMessage(dto: TicketMessageDto): Observable<ActionResponse<boolean>> {
    return this.http.post<ActionResponse<boolean>>(`${this.apiUrl}/message`, dto);
  }

  // Durum değiştirme
  changeStatus(ticketId: number, status: TicketStatus): Observable<ActionResponse<boolean>> {
    return this.http.put<ActionResponse<boolean>>(`${this.apiUrl}/status/${ticketId}`, status);
  }

  // Ticket listeleme (paged)
  getTickets(input: PagedAndSortedSearchInput): Observable<PagedAndSortedResponse<Ticket>> {
    return this.http.get<PagedAndSortedResponse<Ticket>>(`${this.apiUrl}`, { params: input as any });
  }

  // Tekil ticket
  getTicket(id: number, guidId: string): Observable<ActionResponse<Ticket>> {
    return this.http.get<ActionResponse<Ticket>>(`${this.apiUrl}/${id}/${guidId}`);
  }
} 