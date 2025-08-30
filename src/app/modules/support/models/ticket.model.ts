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
  Status: TicketStatusEnum;
  Priority: PriorityEnum;
  Category: CategoryEnum;
  CreatedBy: number;
  CreatedByEmail: string;
  AssignedTo?: number;
  CreatedAt: Date;
  UpdatedAt: Date;
  SenderName?: string;
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
  priority: PriorityEnum;
  category: CategoryEnum;
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


export class TicketListRequestModel extends PagedAndSortedSearchInput{
  StartDate?:Date;
  EndDate?:Date;
  TicketCategory?:CategoryEnum;
  TicketStatus?:TicketStatusEnum;
  TicketPriority?:PriorityEnum;

}

export class DefaultTicketListRequestModel extends TicketListRequestModel{

  constructor() {
      super();
      this.Page = 1;
      this.Limit = 10;
      // this.SortExpression =  "UserName"+":"+"desc";
      this.Search = "";
  }
}

export enum CategoryEnum {
  All = 0,
  Technical = 1,
  Billing = 2,
  FeatureRequest = 3,
  BugReport = 4,
  General = 5
}

export enum PriorityEnum {
  All = 0,
  Low = 1,
  Medium = 2,
  High = 3,
  Urgent = 4
}

export enum TicketStatusEnum {
  All = 0,
  Open = 1,
  InProgress = 2,
  Resolved = 3,
  Closed = 4
}