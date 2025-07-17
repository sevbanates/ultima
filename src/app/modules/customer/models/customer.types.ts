import { PagedAndSortedSearchInput } from "src/app/core/models/request-model";
import { SelectNumberModel } from "src/app/core/models/utility-model";

export class CustomerListRequestModel extends PagedAndSortedSearchInput{
    WebUrl?: string;
    Title? : string;
    UserId? : number;
}

export class DefaultCustomerListRequestModel extends CustomerListRequestModel{

    constructor() {
        super();
        this.Page = 1;
        this.Limit = 10;
        this.SortExpression =  "Id"+":"+"desc";
        this.Search = "";
    }
}


export class CustomerAndCityModel {
    Countries: SelectNumberModel[] = [];
    Cities: SelectNumberModel[] = [];
}

