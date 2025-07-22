import { PagedAndSortedSearchInput } from "src/app/core/models/request-model";

export class InvoiceListRequestModel extends PagedAndSortedSearchInput{
    WebUrl?: string;
    Title? : string;
    UserId? : number;
}

export class DefaultInvoiceListRequestModel extends InvoiceListRequestModel{

    constructor() {
        super();
        this.Page = 1;
        this.Limit = 10;
        this.SortExpression =  "Id"+":"+"desc";
        this.Search = "";
    }
}




export enum InvoiceTypesEnum {
  Satis = 0,
  Iade = 1,
  Tevkifat = 2,
  Istisna = 3,
  OzelMatrah = 4,
  Ihracat = 5
}
export const InvoiceTypes = [
  { label: 'Satış', value: InvoiceTypesEnum.Satis },
  { label: 'İade', value: InvoiceTypesEnum.Iade },
  { label: 'Tevkifat', value: InvoiceTypesEnum.Tevkifat },
  { label: 'İstisna', value: InvoiceTypesEnum.Istisna },
  { label: 'Özel Matrah', value: InvoiceTypesEnum.OzelMatrah },
  { label: 'İhracat', value: InvoiceTypesEnum.Ihracat }
];

export enum Scenario {
  EArsiv = 0,
  TemelFatura = 1,
  TicariFatura = 2,
  // Diğer senaryolar...
}

export const Scenarios = [
  { label: 'E-Arşiv Fatura', value: Scenario.EArsiv },
  { label: 'Temel Fatura', value: Scenario.TemelFatura },
  { label: 'Ticari Fatura', value: Scenario.TicariFatura }
];

export enum InvoiceStatus {
  Draft = 0,
  Sent = 1,
  Paid = 2,
  Cancelled = 3,
  // vs...
}

