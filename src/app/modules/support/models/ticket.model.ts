import { BaseModel } from "src/app/core/models/base-model";
import { PagedAndSortedSearchInput } from "src/app/core/models/request-model";

export interface Ticket extends BaseModel {
  GuidId: string;
  Title: string;
  Description: string;
  Status: 'open' | 'in_progress' | 'resolved' | 'closed';
  Priority: 'low' | 'medium' | 'high' | 'urgent';
  Category: 'technical' | 'billing' | 'feature_request' | 'bug_report' | 'general';
  CreatedBy: string;
  CreatedByEmail: string;
  AssignedTo?: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  Messages: TicketMessage[];
}

export interface TicketDto {
  Id: number;
  GuidId: string;
  Title: string;
  Description: string;
  Status: 'open' | 'in_progress' | 'resolved' | 'closed';
  Priority: 'low' | 'medium' | 'high' | 'urgent';
  Category: 'technical' | 'billing' | 'feature_request' | 'bug_report' | 'general';
  CreatedBy: string;
  CreatedByEmail: string;
  AssignedTo?: string;
  CreatedAt: Date;
  UpdatedAt: Date;
  Messages: TicketMessage[];
}

export interface TicketMessage {
  id: string;
  ticketId: string;
  senderId: string;
  senderName: string;
  senderEmail: string;
  senderType: 'user' | 'admin';
  message: string;
  attachments?: string[];
  createdAt: Date;
  isInternal?: boolean; // Admin'ler arası notlar için
}

export interface CreateTicketMessageRequest {
  ticketId: number;
  senderId: number;
  senderName: string;
  senderEmail: string;
  senderType: 'user' | 'admin';
  message: string;
  attachments?: string; // Virgül ile ayrılmış dosya yolları
  isInternal: boolean; // Admin'ler arası notlar için
}

export interface CreateTicketRequest {
  title: string;
  // description: string;
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: 'technical' | 'billing' | 'feature_request' | 'bug_report' | 'general';
  email: string;
  message: string;
}

export interface TicketResponse {
  message: string;
  isInternal?: boolean;
} 

export interface TicketMessageDto  {
  ticketId: number;
  message: string;
  attachments?: string[];
}

export type TicketStatus = 'open' | 'in_progress' | 'resolved' | 'closed';


export class DefaultTicketListRequestModel extends PagedAndSortedSearchInput{

  constructor() {
      super();
      this.Page = 1;
      this.Limit = 10;
      // this.SortExpression =  "UserName"+":"+"desc";
      this.Search = "";
  }
}