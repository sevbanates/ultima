import { BaseModel } from "src/app/core/models/base-model";

export interface InvoiceItemCreateDto {
  invoiceId: number;          // Backend birebir uyum için
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;              // Opsiyonel olabilir, backend zaten hesaplayabilir
}

export interface InvoiceCreateDto {
  invoiceDate: string;        // ISO formatlı tarih (örn. "2025-07-09T00:00:00")
  InvoiceNumber: string;
  customerId: number;
  items: InvoiceItemCreateDto[];
  totalAmount: number;
  status: InvoiceStatus;
}

export enum InvoiceStatus {
  Draft = 0,
  Pending = 1,
  Sent = 2,
  Approved = 3,
  Rejected = 4,
  Cancelled = 5,
  Archived = 6
}


export interface Invoice extends BaseModel {
  invoiceDate: string;        // ISO formatlı tarih (örn. "2025-07-09T00:00:00")
  invoiceNumber: string;
  customerId: number;
  items: InvoiceItemCreateDto[];
  totalAmount: number;
  status: InvoiceStatus;
}

export interface InvoiceDto extends BaseModel {
  invoiceDate: string;        // ISO formatlı tarih (örn. "2025-07-09T00:00:00")
  invoiceNumber: string;
  customerId: number;
  items: InvoiceItemCreateDto[];
  totalAmount: number;
  status: InvoiceStatus;
}

