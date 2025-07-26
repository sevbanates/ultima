import { PagedAndSortedSearchInput } from "src/app/core/models/request-model";
import { SelectNumberModel } from "src/app/core/models/utility-model";


export class DefaultCustomerListRequestModel extends PagedAndSortedSearchInput{

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

export class CustomerSelectModel {
    Id: number;
    FullName: string;
    Name: string;
    Surname: string;
    Title?: string;
    VknTckn: string;
    IsCompany: boolean;
  }

