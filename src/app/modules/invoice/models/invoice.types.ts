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


export enum InvoiceTypes {
  Sales = 0,
  // Diğer türler...
}

export enum Scenario {
  Basic = 0,
  Commercial = 1,
  // Diğer senaryolar...
}

export enum InvoiceStatus {
  Draft = 0,
  Sent = 1,
  Paid = 2,
  Cancelled = 3,
  // vs...
}

