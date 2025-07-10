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