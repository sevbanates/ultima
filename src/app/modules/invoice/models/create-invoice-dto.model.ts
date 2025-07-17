import { BaseModel } from "src/app/core/models/base-model";
import { InvoiceStatus, InvoiceTypes, Scenario } from "./invoice.types";

export class InvoiceItemCreateDto {
  invoiceId: number;          // Backend birebir uyum için
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;              // Opsiyonel olabilir, backend zaten hesaplayabilir
}

export interface InvoiceCreateDto {
  // RecipientInfo
  Vkn: number;
  FirstName: string;
  LastName: string;
  Title?: string;
  TaxOffice: string;
  Country: string;
  City: string;
  District: string;
  Address: string;
  Telephone: string;

  // InvoiceHeader
  InvoiceDate: string;
  InvoiceNumber: string;
  InvoiceType: InvoiceTypes;
  Scenario: Scenario;
  Currency: number;
  Note: string;
  DeliveryDate?: string;

  DeliveryAddress: string;
  TotalAmount: number;
  Status: InvoiceStatus;

  // Items
  Items: InvoiceItemCreateDto[];
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

